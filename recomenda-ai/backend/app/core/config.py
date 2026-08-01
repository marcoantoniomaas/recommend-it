from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Central application configuration (12-factor, env driven)."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Recomenda Aí API"
    api_v1_prefix: str = "/api/v1"
    debug: bool = True

    database_url: str = "postgresql+psycopg://recomenda:recomenda@postgres:5432/recomenda"

    cors_origins: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    # MinIO / S3 compatible storage
    minio_endpoint: str = "http://minio:9000"
    minio_public_endpoint: str = "http://localhost:9000"
    minio_access_key: str = "minioadmin"
    minio_secret_key: str = "minioadmin"
    minio_bucket: str = "recomenda"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
