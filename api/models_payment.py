from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

class PaymentStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    SUCCEEDED = "succeeded"
    FAILED = "failed"
    REFUNDED = "refunded"

class PaymentMethod(str, Enum):
    CARD = "card"
    CASH = "cash"
    BANK_TRANSFER = "bank_transfer"

class PaymentIntentCreate(BaseModel):
    booking_id: int
    amount: float
    currency: str = "SAR"
    payment_method: PaymentMethod = PaymentMethod.CARD

class Payment(BaseModel):
    id: int
    booking_id: int
    amount: float
    currency: str
    status: PaymentStatus
    payment_method: PaymentMethod
    stripe_payment_intent_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class Invoice(BaseModel):
    id: int
    booking_id: int
    payment_id: int
    invoice_number: str
    amount: float
    tax: float
    total: float
    issued_date: datetime
    due_date: datetime
    status: str  # "draft", "sent", "paid", "overdue"

class ServicePricing(BaseModel):
    id: int
    provider_id: int
    service_type: str
    base_price: float
    currency: str = "SAR"
    description: Optional[str] = None
