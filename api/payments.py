import stripe
from typing import Optional
from datetime import datetime, timedelta
import os

# Stripe configuration
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "sk_test_your_key_here")
STRIPE_PUBLISHABLE_KEY = os.getenv("STRIPE_PUBLISHABLE_KEY", "pk_test_your_key_here")

class StripeService:
    """Service for handling Stripe payment operations"""
    
    @staticmethod
    def create_payment_intent(amount: float, currency: str = "SAR", metadata: dict = None):
        """Create a Stripe payment intent"""
        try:
            # Convert amount to smallest currency unit (halalas for SAR)
            amount_in_cents = int(amount * 100)
            
            intent = stripe.PaymentIntent.create(
                amount=amount_in_cents,
                currency=currency.lower(),
                metadata=metadata or {},
                automatic_payment_methods={"enabled": True}
            )
            
            return {
                "client_secret": intent.client_secret,
                "payment_intent_id": intent.id,
                "amount": amount,
                "currency": currency
            }
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")
    
    @staticmethod
    def confirm_payment(payment_intent_id: str):
        """Confirm a payment intent"""
        try:
            intent = stripe.PaymentIntent.retrieve(payment_intent_id)
            return {
                "status": intent.status,
                "amount": intent.amount / 100,
                "currency": intent.currency.upper()
            }
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")
    
    @staticmethod
    def create_refund(payment_intent_id: str, amount: Optional[float] = None):
        """Create a refund for a payment"""
        try:
            refund_data = {"payment_intent": payment_intent_id}
            if amount:
                refund_data["amount"] = int(amount * 100)
            
            refund = stripe.Refund.create(**refund_data)
            return {
                "refund_id": refund.id,
                "status": refund.status,
                "amount": refund.amount / 100
            }
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")

def generate_invoice_number() -> str:
    """Generate unique invoice number"""
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    return f"INV-{timestamp}"

def calculate_tax(amount: float, tax_rate: float = 0.15) -> float:
    """Calculate tax (15% VAT for Saudi Arabia)"""
    return round(amount * tax_rate, 2)

def calculate_total(amount: float, tax: float) -> float:
    """Calculate total with tax"""
    return round(amount + tax, 2)
