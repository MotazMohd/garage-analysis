from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# User Models
class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class CustomerCreate(UserBase):
    password: str
    phone: Optional[str] = None

class Customer(UserBase):
    id: int
    phone: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class BusinessUserCreate(UserBase):
    password: str
    provider_id: int

class BusinessUser(UserBase):
    id: int
    provider_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserInDB(UserBase):
    id: int
    hashed_password: str
    user_type: str  # "customer" or "business"
    created_at: datetime

# Login/Register Models
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    phone: Optional[str] = None
    user_type: str = "customer"  # "customer" or "business"
    provider_id: Optional[int] = None  # Required if user_type is "business"
