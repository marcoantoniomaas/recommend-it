import re
import unicodedata


def slugify(value: str) -> str:
    """Return an URL friendly slug for a given text."""
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii").lower()
    ascii_value = re.sub(r"[^a-z0-9]+", "-", ascii_value)
    return ascii_value.strip("-") or "item"
