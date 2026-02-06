from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, date, time
from enum import Enum

class BookingStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class ServiceType(str, Enum):
    TRANSMISSION = "Transmission Repair"
    ENGINE = "Engine Diagnostics"
    BRAKE = "Brake Service"
    OIL_CHANGE = "Oil Change"
    TIRE = "Tire Service"
    AC = "AC Repair"
    ELECTRICAL = "Electrical"
    BODY_WORK = "Body Work"

class BookingCreate(BaseModel):
    provider_id: int
    customer_id: int
    service_type: ServiceType
    booking_date: date
    booking_time: time
    notes: Optional[str] = None
    customer_name: str
    customer_email: EmailStr
    customer_phone: str

class BookingUpdate(BaseModel):
    status: Optional[BookingStatus] = None
    notes: Optional[str] = None

class Booking(BaseModel):
    id: int
    provider_id: int
    customer_id: int
    service_type: str
    booking_date: date
    booking_time: time
    status: BookingStatus
    notes: Optional[str] = None
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class TimeSlot(BaseModel):
    time: str
    available: bool

class AvailabilityResponse(BaseModel):
    date: date
    slots: list[TimeSlot]
