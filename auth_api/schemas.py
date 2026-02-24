from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=1, max_length=200)


class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=128)


class UserInDB(UserBase):
    id: str
    is_active: bool = True
    created_at: datetime


class UserPublic(UserBase):
    id: str
    is_active: bool = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[str] = None
    email: Optional[EmailStr] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str

