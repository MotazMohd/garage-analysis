from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class RevenueData(BaseModel):
    date: str
    amount: float

class AnalyticsSummary(BaseModel):
    total_bookings: int
    total_revenue: float
    active_customers: int
    avg_rating: float
    bookings_this_month: int
    revenue_this_month: float
    growth_rate: float

class CustomerStats(BaseModel):
    customer_id: int
    customer_name: str
    total_bookings: int
    total_spent: float
    last_booking_date: Optional[date] = None

class ServicePerformance(BaseModel):
    service_type: str
    total_bookings: int
    total_revenue: float
    avg_price: float
