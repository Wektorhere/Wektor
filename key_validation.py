"""
Wektor — API Key Validation
======================================
Makes a lightweight, cost-free (or near-zero-cost) call to the provider
to confirm a key actually works, BEFORE saving it. Gives the user immediate,
specific feedback instead of discovering a typo mid-analysis later.
"""
import json
import urllib.error
import urllib.request

# Each provider's cheapest possible "is this key valid" check.
# OpenRouter has a dedicated key-info endpoint that costs nothing to call.
VALIDATION_ENDPOINTS = {
    "openrouter": {
        "url": "https://openrouter.ai/api/v1/key",
        "method": "GET",
    },
    "openai": {
        "url": "https://api.openai.com/v1/models",
        "method": "GET",
    },
    "anthropic": {
        # Anthropic has no free "whoami" endpoint; a minimal 1-token message
        # is the standard way to validate a key. This does cost a fraction
        # of a cent — unavoidable for this provider specifically.
        "url": "https://api.anthropic.com/v1/messages",
        "method": "POST",
    },
    "google": {
        # Google's model-list endpoint is free to call and doesn't consume
        # any generation quota — same "cheap whoami check" role as
        # OpenRouter's /key endpoint.
        "url": "https://generativelanguage.googleapis.com/v1beta/models",
        "method": "GET",
    },
}


def validate_api_key(provider: str, api_key: str) -> tuple[bool, str]:
    """
    Returns (is_valid, message).
    message is a short, user-facing explanation either way.
    """
    provider = provider.lower().strip()
    if provider not in VALIDATION_ENDPOINTS:
        return False, f"Unknown provider '{provider}'."

    if not api_key or not api_key.strip():
        return False, "API key is empty."

    config = VALIDATION_ENDPOINTS[provider]

    try:
        if provider == "openrouter":
            req = urllib.request.Request(
                config["url"],
                headers={"Authorization": f"Bearer {api_key}"},
                method="GET",
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                # Successful response includes key usage/limit info
                label = data.get("data", {}).get("label", "")
                return True, f"Key valid{f' ({label})' if label else ''}."

        elif provider == "openai":
            req = urllib.request.Request(
                config["url"],
                headers={"Authorization": f"Bearer {api_key}"},
                method="GET",
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                if resp.status == 200:
                    return True, "Key valid."
                return False, f"Unexpected status {resp.status}."

        elif provider == "anthropic":
            payload = json.dumps({
                "model": "claude-haiku-4-5-20251001",
                "max_tokens": 1,
                "messages": [{"role": "user", "content": "hi"}],
            }).encode("utf-8")
            req = urllib.request.Request(
                config["url"],
                data=payload,
                headers={
                    "x-api-key": api_key,
                    "anthropic-version": "2023-06-01",
                    "Content-Type": "application/json",
                },
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                if resp.status == 200:
                    return True, "Key valid."
                return False, f"Unexpected status {resp.status}."

        elif provider == "google":
            req = urllib.request.Request(
                config["url"],
                headers={"x-goog-api-key": api_key},
                method="GET",
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                if resp.status == 200:
                    return True, "Key valid."
                return False, f"Unexpected status {resp.status}."

    except urllib.error.HTTPError as e:
        body = ""
        try:
            body = e.read().decode("utf-8", errors="replace")[:200]
        except Exception:
            pass

        if e.code == 401:
            return False, "Invalid API key — check for typos or an expired/revoked key."
        elif e.code == 429:
            return False, "Key appears valid, but is currently rate-limited. Try again shortly."
        elif e.code == 402 or "credit" in body.lower() or "insufficient" in body.lower():
            return False, "Key is valid but has insufficient credits on the provider's account."
        else:
            return False, f"Validation failed (HTTP {e.code}): {body[:150]}"

    except urllib.error.URLError as e:
        return False, f"Could not reach {provider} — check your internet connection. ({e.reason})"

    except Exception as e:
        return False, f"Unexpected error validating key: {e}"

    return False, "Validation did not complete."