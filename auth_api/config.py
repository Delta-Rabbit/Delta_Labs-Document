import os
from functools import lru_cache

from dotenv import load_dotenv

load_dotenv()


class Settings:
    mongodb_uri: str
    database_name: str
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_access_token_expires_minutes: int = 60 * 24  # 1 day
    cors_origins: list[str]

    def __init__(self) -> None:
        self.mongodb_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
        self.database_name = os.getenv("MONGODB_DB", "delta_auth")
        self.jwt_secret_key = os.getenv("JWT_SECRET", "change-me-in-production")
        cors_origins_env = os.getenv(
            "CORS_ORIGINS",
            "http://localhost:3000,http://127.0.0.1:3000",
        )
        self.cors_origins = [o.strip() for o in cors_origins_env.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()

