"""
Wektor - Secure API Key Storage (BYOK)
==================================================
Stores the user's own AI provider API key securely on their local machine.

Primary storage: OS-native credential store via `keyring`
  - Windows -> Windows Credential Manager
  - macOS   -> Keychain
  - Linux   -> Secret Service (GNOME Keyring / KWallet)

Fallback storage (only used if no OS backend is available, e.g. some
minimal Linux setups): a locally AES-256-GCM encrypted file, with the raw
256-bit key stored in a separate file with restricted permissions. Not as
strong as a real OS keychain (the key file's protection is just filesystem
permissions, not tied to OS login), but never plaintext, and never leaves
the machine either way.

Nothing in this module ever transmits the key anywhere except directly to
the AI provider's own API when making a request.
"""
import json
import os
import stat

try:
    import keyring
    import keyring.errors
    _KEYRING_AVAILABLE = True
except ImportError:
    _KEYRING_AVAILABLE = False

from cryptography.hazmat.primitives.ciphers.aead import AESGCM

SERVICE_NAME = "Wektor"
_FALLBACK_DIR_ENV = "WEKTOR_CONFIG_DIR"  # tests can override storage location

_AES_KEY_BYTES = 32  # 256-bit key -> AES-256
_NONCE_BYTES = 12    # standard/recommended nonce size for AES-GCM


def _fallback_dir() -> str:
    """OS-appropriate app-data directory, override-able for tests."""
    override = os.environ.get(_FALLBACK_DIR_ENV)
    if override:
        os.makedirs(override, exist_ok=True)
        return override

    if os.name == "nt":
        base = os.environ.get("APPDATA", os.path.expanduser("~"))
    elif os.uname().sysname == "Darwin":
        base = os.path.expanduser("~/Library/Application Support")
    else:
        base = os.environ.get("XDG_CONFIG_HOME", os.path.expanduser("~/.config"))

    path = os.path.join(base, "Wektor")
    os.makedirs(path, exist_ok=True)
    return path


def _fallback_key_file() -> str:
    # "_v2" distinguishes this from the earlier Fernet (AES-128) fallback
    # store's filename -- bumping it means we never try to decrypt an
    # old-format file with the new scheme (which would just fail
    # confusingly); any pre-upgrade fallback file is simply orphaned.
    return os.path.join(_fallback_dir(), ".vault_key_v2")


def _fallback_data_file() -> str:
    return os.path.join(_fallback_dir(), "credentials_v2.enc")


def _get_or_create_aes_key() -> bytes:
    key_file = _fallback_key_file()
    if os.path.exists(key_file):
        with open(key_file, "rb") as f:
            key = f.read()
        if len(key) == _AES_KEY_BYTES:
            return key
    key = os.urandom(_AES_KEY_BYTES)
    with open(key_file, "wb") as f:
        f.write(key)
    # Restrict permissions to the current user only (best-effort; full
    # enforcement on Windows needs ACL calls, not just chmod -- chmod is
    # still meaningful on macOS/Linux and harmless elsewhere).
    try:
        os.chmod(key_file, stat.S_IRUSR | stat.S_IWUSR)
    except Exception:
        pass
    return key


def _aes_encrypt(plaintext: bytes) -> bytes:
    """Returns nonce || ciphertext_with_tag, ready to write straight to disk."""
    key = _get_or_create_aes_key()
    aesgcm = AESGCM(key)
    nonce = os.urandom(_NONCE_BYTES)
    ciphertext = aesgcm.encrypt(nonce, plaintext, None)
    return nonce + ciphertext


def _aes_decrypt(blob: bytes) -> bytes:
    """Raises cryptography.exceptions.InvalidTag if the key is wrong or the
    file was tampered with -- callers already wrap this in a broad
    except Exception, so that surfaces as "no key found" rather than a crash."""
    key = _get_or_create_aes_key()
    aesgcm = AESGCM(key)
    nonce, ciphertext = blob[:_NONCE_BYTES], blob[_NONCE_BYTES:]
    return aesgcm.decrypt(nonce, ciphertext, None)


def _fallback_save(provider: str, api_key: str) -> None:
    data_file = _fallback_data_file()

    existing = {}
    if os.path.exists(data_file):
        try:
            with open(data_file, "rb") as f:
                existing = json.loads(_aes_decrypt(f.read()).decode("utf-8"))
        except Exception:
            existing = {}

    existing[provider] = api_key
    encrypted = _aes_encrypt(json.dumps(existing).encode("utf-8"))
    with open(data_file, "wb") as f:
        f.write(encrypted)
    try:
        os.chmod(data_file, stat.S_IRUSR | stat.S_IWUSR)
    except Exception:
        pass


def _fallback_get(provider: str) -> str | None:
    data_file = _fallback_data_file()
    if not os.path.exists(data_file):
        return None
    try:
        with open(data_file, "rb") as f:
            existing = json.loads(_aes_decrypt(f.read()).decode("utf-8"))
        return existing.get(provider)
    except Exception:
        return None


def _fallback_delete(provider: str) -> None:
    data_file = _fallback_data_file()
    if not os.path.exists(data_file):
        return
    try:
        with open(data_file, "rb") as f:
            existing = json.loads(_aes_decrypt(f.read()).decode("utf-8"))
        existing.pop(provider, None)
        encrypted = _aes_encrypt(json.dumps(existing).encode("utf-8"))
        with open(data_file, "wb") as f:
            f.write(encrypted)
    except Exception:
        pass


def _keyring_usable() -> bool:
    if not _KEYRING_AVAILABLE:
        return False
    try:
        backend = keyring.get_keyring()
        # keyring.backends.fail.Keyring is the sentinel backend returned
        # when no real OS backend is available (e.g. headless Linux with no
        # Secret Service/D-Bus running) — every call on it raises
        # NoKeyringError. Check module + class name directly rather than a
        # concatenated substring match (the old check compared against
        # "fail.Keyring" but module+classname concatenates to "...failKeyring"
        # with no separating dot, so it never actually matched).
        return not (
            type(backend).__module__ == "keyring.backends.fail"
            and type(backend).__name__ == "Keyring"
        )
    except Exception:
        return False


def save_api_key(provider: str, api_key: str) -> None:
    """Persist an API key for a given provider (e.g. 'openrouter', 'openai')."""
    if _keyring_usable():
        try:
            keyring.set_password(SERVICE_NAME, provider, api_key)
            return
        except Exception:
            pass  # fall through to encrypted-file fallback
    _fallback_save(provider, api_key)


def get_api_key(provider: str) -> str | None:
    """Retrieve a stored API key. Returns None if not set."""
    if _keyring_usable():
        try:
            value = keyring.get_password(SERVICE_NAME, provider)
            if value:
                return value
        except Exception:
            pass
    return _fallback_get(provider)


def delete_api_key(provider: str) -> None:
    if _keyring_usable():
        try:
            keyring.delete_password(SERVICE_NAME, provider)
        except Exception:
            pass
    _fallback_delete(provider)


def has_api_key(provider: str) -> bool:
    key = get_api_key(provider)
    return bool(key)


def mask_key(api_key: str) -> str:
    """For displaying in UI -- never show the full key."""
    if not api_key or len(api_key) < 8:
        return "\u2022" * 8
    return f"{api_key[:4]}" + ("\u2022" * 8) + f"{api_key[-4:]}"