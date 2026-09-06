"""
Wektor - License Manager (Lemon Squeezy)
==================================================
Owns entitlement checking for Wektor's two genuinely Pro-gated backend
features: MySQL/PostgreSQL connections and Daily Watch. This is the real
enforcement point.

Why this lives in Python, not Electron: the renderer process already holds
the same LOCAL_AUTH_TOKEN as the Electron main process (see preload.js /
getLocalAuthToken), so anything Electron "tells" this engine about
entitlement, the renderer could spoof by calling the same endpoint
directly with a crafted request. This module makes its own independent
call to Lemon Squeezy rather than trusting any client-supplied claim.

Storage reuses key_store.py's existing encrypted key-value store (OS
keychain, or AES-256-GCM file fallback) under a reserved pseudo-provider
name -- no separate crypto/keyring implementation needed.

Honest limitation, worth stating plainly since this source is public:
a technically-inclined user can read exactly how this check works and
patch it out in their own build. That's true of every open-source app
with a paid tier and isn't something a local desktop app can prevent --
the goal here is closing the *cheap* bypass (hitting the API directly
with curl or a crafted request, no compiling required), not achieving
DRM against someone willing to modify and rebuild the source.
"""
import json
import os
import time
import urllib.request
import urllib.error
import uuid

import key_store

_LICENSE_STATE_KEY = "_license_state"  # reserved pseudo-provider name in key_store's store

LS_API_BASE = "https://api.lemonsqueezy.com/v1/licenses"

REVALIDATE_INTERVAL_SECONDS = 7 * 24 * 60 * 60   # 7 days between required live checks
OFFLINE_GRACE_SECONDS = 14 * 24 * 60 * 60        # honor last-known-good this long if offline


def _instance_id_file() -> str:
    return os.path.join(key_store._fallback_dir(), ".license_instance_id")


def _get_or_create_instance_id() -> str:
    path = _instance_id_file()
    if os.path.exists(path):
        try:
            with open(path, "r") as f:
                val = f.read().strip()
            if val:
                return val
        except Exception:
            pass
    new_id = str(uuid.uuid4())
    try:
        with open(path, "w") as f:
            f.write(new_id)
    except Exception:
        pass
    return new_id


def _load_state():
    raw = key_store.get_api_key(_LICENSE_STATE_KEY)
    if not raw:
        return None
    try:
        return json.loads(raw)
    except Exception:
        return None


def _save_state(state: dict) -> None:
    key_store.save_api_key(_LICENSE_STATE_KEY, json.dumps(state))


def _ls_request(endpoint: str, payload: dict, timeout: int = 10):
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{LS_API_BASE}/{endpoint}",
        data=data,
        headers={"Accept": "application/json", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return True, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        try:
            return False, json.loads(e.read().decode("utf-8"))
        except Exception:
            return False, {}
    except Exception:
        return False, {}


def activate_license(license_key: str) -> dict:
    """Call when the user enters a key in Settings."""
    license_key = (license_key or "").strip()
    if not license_key:
        return {"success": False, "error": "License key is empty."}

    instance_name = f"wektor-{_get_or_create_instance_id()[:8]}"
    ok, body = _ls_request("activate", {
        "license_key": license_key,
        "instance_name": instance_name,
    })

    if not ok or not body.get("activated"):
        return {
            "success": False,
            "error": body.get("error") or "This license key is invalid or has no activations remaining.",
        }

    meta = body.get("meta", {})
    lic = body.get("license_key", {})

    state = {
        "license_key": license_key,
        "instance_id": (body.get("instance") or {}).get("id"),
        "status": lic.get("status", "active"),
        "plan": meta.get("variant_name"),
        "customer_email": meta.get("customer_email"),
        "expires_at": lic.get("expires_at"),
        "last_validated_at": time.time(),
    }
    _save_state(state)
    return {"success": True, "status": state["status"], "plan": state["plan"]}


def deactivate_license() -> dict:
    state = _load_state()
    if state:
        try:
            _ls_request("deactivate", {
                "license_key": state["license_key"],
                "instance_id": state.get("instance_id"),
            })
        except Exception:
            pass  # best-effort -- still clear locally even if unreachable
    key_store.delete_api_key(_LICENSE_STATE_KEY)
    return {"success": True}


def check_entitlement() -> dict:
    """The real check -- call this from gated routes, not get_cached_status().
    Re-verifies with Lemon Squeezy on a 7-day cycle; honors the last
    known-good result for up to 14 days if offline, since this app is
    local-first and a hard network requirement on every request would
    contradict that."""
    state = _load_state()
    if not state:
        return {"entitled": False, "reason": "NO_LICENSE"}

    due = (time.time() - state.get("last_validated_at", 0)) > REVALIDATE_INTERVAL_SECONDS
    if not due:
        return {
            "entitled": state.get("status") == "active",
            "reason": "CACHED_VALID" if state.get("status") == "active" else "CACHED_INACTIVE",
            "plan": state.get("plan"),
        }

    ok, body = _ls_request("validate", {
        "license_key": state["license_key"],
        "instance_id": state.get("instance_id"),
    })

    if not ok:
        within_grace = (time.time() - state.get("last_validated_at", 0)) < OFFLINE_GRACE_SECONDS
        return {
            "entitled": within_grace and state.get("status") == "active",
            "reason": "OFFLINE_GRACE" if within_grace else "OFFLINE_GRACE_EXPIRED",
            "plan": state.get("plan"),
        }

    if not body.get("valid"):
        # Reachable and explicit: key is no longer good (cancelled,
        # refunded, disabled). Lock immediately, no grace period for this.
        state["status"] = "inactive"
        state["last_validated_at"] = time.time()
        _save_state(state)
        return {"entitled": False, "reason": "REVOKED", "plan": state.get("plan")}

    lic = body.get("license_key", {})
    state["status"] = lic.get("status", "active")
    state["expires_at"] = lic.get("expires_at")
    state["last_validated_at"] = time.time()
    _save_state(state)

    return {
        "entitled": state["status"] == "active",
        "reason": "REVALIDATED" if state["status"] == "active" else "REVALIDATED_INACTIVE",
        "plan": state.get("plan"),
    }


def get_cached_status() -> dict:
    """Fast, no-network read for UI display (e.g. Settings page badge).
    NOT for gating a route -- routes must call check_entitlement()."""
    state = _load_state()
    if not state:
        return {"entitled": False, "plan": None}
    return {
        "entitled": state.get("status") == "active",
        "plan": state.get("plan"),
        "customer_email": state.get("customer_email"),
        "expires_at": state.get("expires_at"),
    }