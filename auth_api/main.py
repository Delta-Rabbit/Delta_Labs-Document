from datetime import datetime, timezone
from typing import Any

from bson import ObjectId
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pymongo.collection import Collection

from .auth import create_access_token, get_current_user, get_password_hash, verify_password
from .config import get_settings
from .db import get_users_collection
from .schemas import LoginRequest, Token, UserCreate, UserPublic

app = FastAPI(title="Delta Labs Auth API", version="1.0.0")

settings = get_settings()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/auth/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
async def register_user(payload: UserCreate) -> Any:
    users_collection: Collection = await get_users_collection()

    existing = await users_collection.find_one({"email": payload.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )

    now = datetime.now(timezone.utc)
    doc = {
        "email": payload.email,
        "name": payload.name,
        "password_hash": get_password_hash(payload.password),
        "is_active": True,
        "created_at": now,
    }
    result = await users_collection.insert_one(doc)
    return UserPublic(
        id=str(result.inserted_id),
        email=payload.email,
        name=payload.name,
        is_active=True,
    )


@app.post("/auth/login", response_model=Token)
async def login(payload: LoginRequest) -> Token:
    users_collection: Collection = await get_users_collection()

    doc = await users_collection.find_one({"email": payload.email})
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    if not verify_password(payload.password, doc["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    if not doc.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is inactive",
        )

    token = create_access_token(
        {
            "sub": str(doc["_id"]),
            "email": doc["email"],
        }
    )
    return Token(access_token=token)


@app.get("/auth/me", response_model=UserPublic)
async def read_current_user(current_user: UserPublic = Depends(get_current_user)) -> UserPublic:
    return current_user


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("auth_api.main:app", host="0.0.0.0", port=8000, reload=True)

