from fastapi import FastAPI, HTTPException, Query, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, timedelta, date, time
import uvicorn

# Import authentication modules
from auth import (
    get_password_hash, verify_password, 
    create_access_token, create_refresh_token, verify_token,
    Token, TokenData
)
from models_auth import (
    LoginRequest, RegisterRequest, 
    Customer, BusinessUser, UserInDB
)
from models_booking import (
    Booking, BookingCreate, BookingUpdate, BookingStatus,
    TimeSlot, AvailabilityResponse
)
from models_payment import (
    Payment, PaymentIntentCreate, PaymentStatus, PaymentMethod,
    Invoice, ServicePricing
)
from models_analytics import (
    AnalyticsSummary, RevenueData, CustomerStats, ServicePerformance
)
from payments import (
    StripeService, generate_invoice_number, calculate_tax, calculate_total
)

app = FastAPI(title="SALIS AUTO API", version="1.0.0")

# CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ MODELS ============

class Specialty(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

class ServiceProvider(BaseModel):
    id: int
    name: str
    specialties: List[str]
    location: str
    rating: float
    reviews: int
    description: str
    phone: str
    email: EmailStr
    verified: bool = True
    created_at: datetime = datetime.now()

class ProviderCreate(BaseModel):
    name: str
    specialties: List[str]
    location: str
    description: str
    phone: str
    email: EmailStr

class Message(BaseModel):
    id: int
    provider_id: int
    customer_name: str
    customer_email: EmailStr
    subject: str
    message: str
    created_at: datetime

class MessageCreate(BaseModel):
    provider_id: int
    customer_name: str
    customer_email: EmailStr
    subject: str
    message: str

# ============ MOCK DATABASE ============

mock_providers = [
    ServiceProvider(
        id=1,
        name="Elite Auto Repair",
        specialties=["Transmission Repair", "Engine Diagnostics", "Brake Service"],
        location="Riyadh, KSA",
        rating=4.8,
        reviews=127,
        description="Premium automotive service with 15+ years of experience",
        phone="+966 50 123 4567",
        email="contact@eliteauto.sa"
    ),
    ServiceProvider(
        id=2,
        name="Quick Fix Garage",
        specialties=["Oil Change", "Tire Service", "AC Repair"],
        location="Jeddah, KSA",
        rating=4.6,
        reviews=89,
        description="Fast and reliable service for all your automotive needs",
        phone="+966 50 234 5678",
        email="info@quickfix.sa"
    ),
    ServiceProvider(
        id=3,
        name="Pro Transmission Center",
        specialties=["Transmission Repair", "Clutch Replacement", "Gearbox Service"],
        location="Dammam, KSA",
        rating=4.9,
        reviews=203,
        description="Specialized transmission experts with certified technicians",
        phone="+966 50 345 6789",
        email="service@protrans.sa"
    )
]

mock_specialties = [
    Specialty(id=1, name="Transmission Repair", description="Automatic and manual transmission services"),
    Specialty(id=2, name="Engine Diagnostics", description="Computer diagnostics and engine repair"),
    Specialty(id=3, name="Brake Service", description="Brake pads, rotors, and system maintenance"),
    Specialty(id=4, name="Oil Change", description="Regular oil change and fluid services"),
    Specialty(id=5, name="Tire Service", description="Tire rotation, balancing, and replacement"),
    Specialty(id=6, name="AC Repair", description="Air conditioning system repair and recharge"),
    Specialty(id=7, name="Electrical", description="Electrical system diagnostics and repair"),
    Specialty(id=8, name="Body Work", description="Collision repair and body work")
]

mock_messages = []

# Mock user databases
mock_customers = []
mock_business_users = []

# Mock bookings database
mock_bookings = []

# Mock payment databases
mock_payments = []
mock_invoices = []
mock_service_pricing = [
    ServicePricing(
        id=1,
        provider_id=1,
        service_type="Transmission Repair",
        base_price=1500.00,
        currency="SAR",
        description="Complete transmission diagnostic and repair"
    ),
    ServicePricing(
        id=2,
        provider_id=1,
        service_type="Engine Diagnostics",
        base_price=500.00,
        currency="SAR",
        description="Computer diagnostics and engine analysis"
    ),
    ServicePricing(
        id=3,
        provider_id=2,
        service_type="Oil Change",
        base_price=150.00,
        currency="SAR",
        description="Full synthetic oil change with filter"
    )
]

# Security
security = HTTPBearer()

# ============ ENDPOINTS ============

@app.get("/")
def read_root():
    return {
        "message": "SALIS AUTO API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/providers", response_model=List[ServiceProvider])
def get_providers(
    specialty: Optional[str] = Query(None, description="Filter by specialty"),
    location: Optional[str] = Query(None, description="Filter by location"),
    min_rating: Optional[float] = Query(None, description="Minimum rating")
):
    """Get list of service providers with optional filters"""
    filtered = mock_providers
    
    if specialty:
        filtered = [p for p in filtered if specialty in p.specialties]
    
    if location:
        filtered = [p for p in filtered if location.lower() in p.location.lower()]
    
    if min_rating:
        filtered = [p for p in filtered if p.rating >= min_rating]
    
    return filtered

@app.get("/api/providers/{provider_id}", response_model=ServiceProvider)
def get_provider(provider_id: int):
    """Get specific provider details"""
    provider = next((p for p in mock_providers if p.id == provider_id), None)
    if not provider:
        raise HTTPException(status_code=404, detail="Provider not found")
    return provider

@app.post("/api/providers", response_model=ServiceProvider)
def create_provider(provider: ProviderCreate):
    """Register a new service provider"""
    new_id = max([p.id for p in mock_providers]) + 1
    new_provider = ServiceProvider(
        id=new_id,
        **provider.model_dump(),
        rating=0.0,
        reviews=0,
        verified=False
    )
    mock_providers.append(new_provider)
    return new_provider

@app.get("/api/specialties", response_model=List[Specialty])
def get_specialties():
    """Get list of available service specialties"""
    return mock_specialties

@app.get("/api/search", response_model=List[ServiceProvider])
def search_providers(
    q: str = Query(..., description="Search query"),
    location: Optional[str] = Query(None, description="Location filter")
):
    """Search providers by name, description, or specialty"""
    results = []
    query_lower = q.lower()
    
    for provider in mock_providers:
        if (query_lower in provider.name.lower() or
            query_lower in provider.description.lower() or
            any(query_lower in s.lower() for s in provider.specialties)):
            
            if location is None or location.lower() in provider.location.lower():
                results.append(provider)
    
    return results

@app.post("/api/messages", response_model=Message)
def send_message(message: MessageCreate):
    """Send a message to a service provider"""
    # Verify provider exists
    provider = next((p for p in mock_providers if p.id == message.provider_id), None)
    if not provider:
        raise HTTPException(status_code=404, detail="Provider not found")
    
    new_message = Message(
        id=len(mock_messages) + 1,
        **message.model_dump(),
        created_at=datetime.now()
    )
    mock_messages.append(new_message)
    return new_message

@app.get("/api/messages/{provider_id}", response_model=List[Message])
def get_provider_messages(provider_id: int):
    """Get all messages for a specific provider"""
    return [m for m in mock_messages if m.provider_id == provider_id]

# ============ AUTHENTICATION ============

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> TokenData:
    """Dependency to get current authenticated user"""
    token = credentials.credentials
    token_data = verify_token(token)
    
    if token_data is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    return token_data

@app.post("/api/auth/register", response_model=dict)
def register(request: RegisterRequest):
    """Register a new user (customer or business)"""
    # Check if email already exists
    if request.user_type == "customer":
        if any(u.email == request.email for u in mock_customers):
            raise HTTPException(status_code=400, detail="Email already registered")
        
        new_user = UserInDB(
            id=len(mock_customers) + 1,
            email=request.email,
            full_name=request.full_name,
            hashed_password=get_password_hash(request.password),
            user_type="customer",
            created_at=datetime.now()
        )
        mock_customers.append(new_user)
    
    elif request.user_type == "business":
        if any(u.email == request.email for u in mock_business_users):
            raise HTTPException(status_code=400, detail="Email already registered")
        
        if not request.provider_id:
            raise HTTPException(status_code=400, detail="Provider ID required for business users")
        
        new_user = UserInDB(
            id=len(mock_business_users) + 1,
            email=request.email,
            full_name=request.full_name,
            hashed_password=get_password_hash(request.password),
            user_type="business",
            created_at=datetime.now()
        )
        mock_business_users.append(new_user)
    
    else:
        raise HTTPException(status_code=400, detail="Invalid user type")
    
    return {
        "message": "User registered successfully",
        "email": request.email,
        "user_type": request.user_type
    }

@app.post("/api/auth/login", response_model=Token)
def login(request: LoginRequest):
    """Login and get access token"""
    # Find user in both databases
    user = None
    user_type = None
    
    # Check customers
    for u in mock_customers:
        if u.email == request.email:
            user = u
            user_type = "customer"
            break
    
    # Check business users
    if not user:
        for u in mock_business_users:
            if u.email == request.email:
                user = u
                user_type = "business"
                break
    
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    # Create tokens
    token_data = {"sub": user.email, "user_type": user_type}
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer"
    )

@app.post("/api/auth/refresh", response_model=Token)
def refresh_token(refresh_token: str = Header(..., alias="X-Refresh-Token")):
    """Refresh access token using refresh token"""
    token_data = verify_token(refresh_token, token_type="refresh")
    
    if token_data is None:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    
    # Create new tokens
    new_token_data = {"sub": token_data.email, "user_type": token_data.user_type}
    new_access_token = create_access_token(new_token_data)
    new_refresh_token = create_refresh_token(new_token_data)
    
    return Token(
        access_token=new_access_token,
        refresh_token=new_refresh_token,
        token_type="bearer"
    )

@app.get("/api/auth/me")
def get_current_user_info(current_user: TokenData = Depends(get_current_user)):
    """Get current authenticated user information"""
    # Find user details
    user = None
    
    if current_user.user_type == "customer":
        user = next((u for u in mock_customers if u.email == current_user.email), None)
    elif current_user.user_type == "business":
        user = next((u for u in mock_business_users if u.email == current_user.email), None)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "user_type": current_user.user_type,
        "created_at": user.created_at
    }

# ============ BOOKINGS ============

@app.post("/api/bookings", response_model=Booking)
def create_booking(booking: BookingCreate, current_user: TokenData = Depends(get_current_user)):
    """Create a new booking"""
    # Verify provider exists
    provider = next((p for p in mock_providers if p.id == booking.provider_id), None)
    if not provider:
        raise HTTPException(status_code=404, detail="Provider not found")
    
    # Check if slot is available
    existing_bookings = [
        b for b in mock_bookings 
        if b.provider_id == booking.provider_id 
        and b.booking_date == booking.booking_date 
        and b.booking_time == booking.booking_time
        and b.status != BookingStatus.CANCELLED
    ]
    
    if existing_bookings:
        raise HTTPException(status_code=400, detail="Time slot not available")
    
    new_booking = Booking(
        id=len(mock_bookings) + 1,
        **booking.model_dump(),
        status=BookingStatus.PENDING,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    mock_bookings.append(new_booking)
    return new_booking

@app.get("/api/bookings/{booking_id}", response_model=Booking)
def get_booking(booking_id: int, current_user: TokenData = Depends(get_current_user)):
    """Get booking details"""
    booking = next((b for b in mock_bookings if b.id == booking_id), None)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@app.get("/api/bookings/provider/{provider_id}", response_model=List[Booking])
def get_provider_bookings(provider_id: int, current_user: TokenData = Depends(get_current_user)):
    """Get all bookings for a provider"""
    return [b for b in mock_bookings if b.provider_id == provider_id]

@app.get("/api/bookings/customer/{customer_id}", response_model=List[Booking])
def get_customer_bookings(customer_id: int, current_user: TokenData = Depends(get_current_user)):
    """Get all bookings for a customer"""
    return [b for b in mock_bookings if b.customer_id == customer_id]

@app.patch("/api/bookings/{booking_id}", response_model=Booking)
def update_booking(
    booking_id: int, 
    update: BookingUpdate,
    current_user: TokenData = Depends(get_current_user)
):
    """Update booking status or notes"""
    booking = next((b for b in mock_bookings if b.id == booking_id), None)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    if update.status:
        booking.status = update.status
    if update.notes:
        booking.notes = update.notes
    
    booking.updated_at = datetime.now()
    return booking

@app.get("/api/availability/{provider_id}", response_model=AvailabilityResponse)
def get_availability(
    provider_id: int,
    booking_date: date = Query(..., description="Date to check availability")
):
    """Get available time slots for a provider on a specific date"""
    # Verify provider exists
    provider = next((p for p in mock_providers if p.id == provider_id), None)
    if not provider:
        raise HTTPException(status_code=404, detail="Provider not found")
    
    # Generate time slots (9 AM - 6 PM, hourly)
    all_slots = []
    for hour in range(9, 18):
        slot_time = time(hour, 0)
        
        # Check if slot is booked
        is_booked = any(
            b.provider_id == provider_id 
            and b.booking_date == booking_date 
            and b.booking_time == slot_time
            and b.status != BookingStatus.CANCELLED
            for b in mock_bookings
        )
        
        all_slots.append(TimeSlot(
            time=slot_time.strftime("%H:%M"),
            available=not is_booked
        ))
    
    return AvailabilityResponse(date=booking_date, slots=all_slots)

# ============ PAYMENTS ============

@app.get("/api/pricing/{provider_id}", response_model=List[ServicePricing])
def get_provider_pricing(provider_id: int):
    """Get pricing for a provider's services"""
    return [p for p in mock_service_pricing if p.provider_id == provider_id]

@app.post("/api/payments/create-intent", response_model=dict)
def create_payment_intent(
    payment_request: PaymentIntentCreate,
    current_user: TokenData = Depends(get_current_user)
):
    """Create a Stripe payment intent"""
    # Verify booking exists
    booking = next((b for b in mock_bookings if b.id == payment_request.booking_id), None)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    # Check if payment already exists
    existing_payment = next((p for p in mock_payments if p.booking_id == payment_request.booking_id), None)
    if existing_payment:
        raise HTTPException(status_code=400, detail="Payment already exists for this booking")
    
    try:
        # Create Stripe payment intent
        stripe_response = StripeService.create_payment_intent(
            amount=payment_request.amount,
            currency=payment_request.currency,
            metadata={
                "booking_id": payment_request.booking_id,
                "customer_id": booking.customer_id,
                "provider_id": booking.provider_id
            }
        )
        
        # Create payment record
        new_payment = Payment(
            id=len(mock_payments) + 1,
            booking_id=payment_request.booking_id,
            amount=payment_request.amount,
            currency=payment_request.currency,
            status=PaymentStatus.PENDING,
            payment_method=payment_request.payment_method,
            stripe_payment_intent_id=stripe_response["payment_intent_id"],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        mock_payments.append(new_payment)
        
        return {
            "payment_id": new_payment.id,
            "client_secret": stripe_response["client_secret"],
            "amount": payment_request.amount,
            "currency": payment_request.currency
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/payments/{payment_id}/confirm")
def confirm_payment(
    payment_id: int,
    current_user: TokenData = Depends(get_current_user)
):
    """Confirm payment and generate invoice"""
    payment = next((p for p in mock_payments if p.id == payment_id), None)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    try:
        # Confirm with Stripe
        stripe_status = StripeService.confirm_payment(payment.stripe_payment_intent_id)
        
        # Update payment status
        if stripe_status["status"] == "succeeded":
            payment.status = PaymentStatus.SUCCEEDED
            payment.updated_at = datetime.now()
            
            # Generate invoice
            tax = calculate_tax(payment.amount)
            total = calculate_total(payment.amount, tax)
            
            new_invoice = Invoice(
                id=len(mock_invoices) + 1,
                booking_id=payment.booking_id,
                payment_id=payment.id,
                invoice_number=generate_invoice_number(),
                amount=payment.amount,
                tax=tax,
                total=total,
                issued_date=datetime.now(),
                due_date=datetime.now() + timedelta(days=30),
                status="paid"
            )
            mock_invoices.append(new_invoice)
            
            # Update booking status
            booking = next((b for b in mock_bookings if b.id == payment.booking_id), None)
            if booking:
                booking.status = BookingStatus.CONFIRMED
                booking.updated_at = datetime.now()
            
            return {
                "payment_status": "succeeded",
                "invoice_number": new_invoice.invoice_number,
                "total": total
            }
        else:
            payment.status = PaymentStatus.FAILED
            payment.updated_at = datetime.now()
            raise HTTPException(status_code=400, detail="Payment failed")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/payments/{payment_id}", response_model=Payment)
def get_payment(payment_id: int, current_user: TokenData = Depends(get_current_user)):
    """Get payment details"""
    payment = next((p for p in mock_payments if p.id == payment_id), None)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment

@app.get("/api/invoices/{invoice_id}", response_model=Invoice)
def get_invoice(invoice_id: int, current_user: TokenData = Depends(get_current_user)):
    """Get invoice details"""
    invoice = next((i for i in mock_invoices if i.id == invoice_id), None)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice

@app.get("/api/invoices/booking/{booking_id}", response_model=Invoice)
def get_booking_invoice(booking_id: int, current_user: TokenData = Depends(get_current_user)):
    """Get invoice for a booking"""
    invoice = next((i for i in mock_invoices if i.booking_id == booking_id), None)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found for this booking")
    return invoice

# ============ ANALYTICS ============

@app.get("/api/analytics/summary/{provider_id}", response_model=AnalyticsSummary)
def get_analytics_summary(provider_id: int, current_user: TokenData = Depends(get_current_user)):
    """Get analytics summary for a provider"""
    provider_bookings = [b for b in mock_bookings if b.provider_id == provider_id]
    provider_payments = [p for p in mock_payments if any(b.id == p.booking_id and b.provider_id == provider_id for b in mock_bookings)]
    
    total_revenue = sum(p.amount for p in provider_payments if p.status == PaymentStatus.SUCCEEDED)
    
    # Calculate this month's data
    from datetime import datetime
    current_month = datetime.now().month
    current_year = datetime.now().year
    
    bookings_this_month = len([
        b for b in provider_bookings 
        if b.created_at.month == current_month and b.created_at.year == current_year
    ])
    
    revenue_this_month = sum(
        p.amount for p in provider_payments 
        if p.status == PaymentStatus.SUCCEEDED 
        and p.created_at.month == current_month 
        and p.created_at.year == current_year
    )
    
    # Get unique customers
    unique_customers = len(set(b.customer_id for b in provider_bookings))
    
    return AnalyticsSummary(
        total_bookings=len(provider_bookings),
        total_revenue=total_revenue,
        active_customers=unique_customers,
        avg_rating=4.8,  # Mock rating
        bookings_this_month=bookings_this_month,
        revenue_this_month=revenue_this_month,
        growth_rate=12.5  # Mock growth rate
    )

@app.get("/api/analytics/revenue/{provider_id}", response_model=List[RevenueData])
def get_revenue_data(
    provider_id: int,
    days: int = Query(30, description="Number of days to retrieve"),
    current_user: TokenData = Depends(get_current_user)
):
    """Get revenue data over time"""
    from datetime import datetime, timedelta
    from collections import defaultdict
    
    provider_payments = [
        p for p in mock_payments 
        if any(b.id == p.booking_id and b.provider_id == provider_id for b in mock_bookings)
        and p.status == PaymentStatus.SUCCEEDED
    ]
    
    # Group by date
    revenue_by_date = defaultdict(float)
    for payment in provider_payments:
        date_str = payment.created_at.strftime("%Y-%m-%d")
        revenue_by_date[date_str] += payment.amount
    
    # Fill in missing dates
    result = []
    for i in range(days):
        date = datetime.now() - timedelta(days=days - i - 1)
        date_str = date.strftime("%Y-%m-%d")
        result.append(RevenueData(
            date=date_str,
            amount=revenue_by_date.get(date_str, 0.0)
        ))
    
    return result

@app.get("/api/analytics/customers/{provider_id}", response_model=List[CustomerStats])
def get_customer_stats(provider_id: int, current_user: TokenData = Depends(get_current_user)):
    """Get customer statistics for a provider"""
    from collections import defaultdict
    
    provider_bookings = [b for b in mock_bookings if b.provider_id == provider_id]
    
    # Group by customer
    customer_data = defaultdict(lambda: {"bookings": 0, "spent": 0.0, "last_date": None})
    
    for booking in provider_bookings:
        customer_data[booking.customer_id]["bookings"] += 1
        customer_data[booking.customer_id]["name"] = booking.customer_name
        
        # Get payment for this booking
        payment = next((p for p in mock_payments if p.booking_id == booking.id and p.status == PaymentStatus.SUCCEEDED), None)
        if payment:
            customer_data[booking.customer_id]["spent"] += payment.amount
        
        # Track last booking date
        if customer_data[booking.customer_id]["last_date"] is None or booking.booking_date > customer_data[booking.customer_id]["last_date"]:
            customer_data[booking.customer_id]["last_date"] = booking.booking_date
    
    result = [
        CustomerStats(
            customer_id=customer_id,
            customer_name=data["name"],
            total_bookings=data["bookings"],
            total_spent=data["spent"],
            last_booking_date=data["last_date"]
        )
        for customer_id, data in customer_data.items()
    ]
    
    return sorted(result, key=lambda x: x.total_spent, reverse=True)

@app.get("/api/analytics/services/{provider_id}", response_model=List[ServicePerformance])
def get_service_performance(provider_id: int, current_user: TokenData = Depends(get_current_user)):
    """Get service performance metrics"""
    from collections import defaultdict
    
    provider_bookings = [b for b in mock_bookings if b.provider_id == provider_id]
    
    service_data = defaultdict(lambda: {"bookings": 0, "revenue": 0.0})
    
    for booking in provider_bookings:
        service_data[booking.service_type]["bookings"] += 1
        
        # Get payment for this booking
        payment = next((p for p in mock_payments if p.booking_id == booking.id and p.status == PaymentStatus.SUCCEEDED), None)
        if payment:
            service_data[booking.service_type]["revenue"] += payment.amount
    
    result = [
        ServicePerformance(
            service_type=service_type,
            total_bookings=data["bookings"],
            total_revenue=data["revenue"],
            avg_price=data["revenue"] / data["bookings"] if data["bookings"] > 0 else 0.0
        )
        for service_type, data in service_data.items()
    ]
    
    return sorted(result, key=lambda x: x.total_revenue, reverse=True)

# ============ HEALTH CHECK ============

@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
