"""
End-to-end Payment Flow Test for SALIS AUTO Platform
Tests payment intent creation, confirmation, and invoice generation
"""

import requests
import json
from datetime import datetime

# API Configuration
BASE_URL = "http://localhost:8000"
TEST_EMAIL = f"test_{datetime.now().timestamp()}@example.com"
TEST_PASSWORD = "testpass123"

class PaymentFlowTest:
    def __init__(self):
        self.access_token = None
        self.booking_id = None
        self.payment_id = None
        self.invoice_id = None
    
    def register_user(self):
        """Register a test user"""
        print("\n1. Registering test user...")
        response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json={
                "email": TEST_EMAIL,
                "password": TEST_PASSWORD,
                "full_name": "Test User",
                "user_type": "customer"
            }
        )
        
        if response.status_code == 200:
            print("✓ User registered successfully")
            return True
        else:
            print(f"✗ Registration failed: {response.json()}")
            return False
    
    def login(self):
        """Login and get access token"""
        print("\n2. Logging in...")
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={
                "email": TEST_EMAIL,
                "password": TEST_PASSWORD
            }
        )
        
        if response.status_code == 200:
            data = response.json()
            self.access_token = data['access_token']
            print("✓ Login successful")
            return True
        else:
            print(f"✗ Login failed: {response.json()}")
            return False
    
    def create_booking(self):
        """Create a test booking"""
        print("\n3. Creating booking...")
        headers = {"Authorization": f"Bearer {self.access_token}"}
        
        response = requests.post(
            f"{BASE_URL}/api/bookings",
            headers=headers,
            json={
                "provider_id": 1,
                "customer_id": 1,
                "customer_name": "Test User",
                "customer_email": TEST_EMAIL,
                "customer_phone": "+966501234567",
                "service_type": "Oil Change",
                "booking_date": "2026-02-10",
                "booking_time": "10:00",
                "notes": "Test booking for payment flow"
            }
        )
        
        if response.status_code == 200:
            data = response.json()
            self.booking_id = data['id']
            print(f"✓ Booking created: ID {self.booking_id}")
            return True
        else:
            print(f"✗ Booking creation failed: {response.json()}")
            return False
    
    def create_payment_intent(self):
        """Create payment intent"""
        print("\n4. Creating payment intent...")
        headers = {"Authorization": f"Bearer {self.access_token}"}
        
        response = requests.post(
            f"{BASE_URL}/api/payments/create-intent",
            headers=headers,
            json={
                "booking_id": self.booking_id,
                "amount": 150.00,
                "currency": "SAR",
                "payment_method": "card"
            }
        )
        
        if response.status_code == 200:
            data = response.json()
            self.payment_id = data['payment_id']
            print(f"✓ Payment intent created: ID {self.payment_id}")
            print(f"  Client Secret: {data['client_secret'][:20]}...")
            return True
        else:
            print(f"✗ Payment intent creation failed: {response.json()}")
            return False
    
    def confirm_payment(self):
        """Confirm payment"""
        print("\n5. Confirming payment...")
        headers = {"Authorization": f"Bearer {self.access_token}"}
        
        response = requests.post(
            f"{BASE_URL}/api/payments/{self.payment_id}/confirm",
            headers=headers
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Payment confirmed")
            print(f"  Status: {data['payment_status']}")
            print(f"  Invoice: {data['invoice_number']}")
            print(f"  Total: {data['total']} SAR")
            return True
        else:
            print(f"✗ Payment confirmation failed: {response.json()}")
            return False
    
    def get_invoice(self):
        """Retrieve invoice"""
        print("\n6. Retrieving invoice...")
        headers = {"Authorization": f"Bearer {self.access_token}"}
        
        response = requests.get(
            f"{BASE_URL}/api/invoices/booking/{self.booking_id}",
            headers=headers
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Invoice retrieved")
            print(f"  Invoice Number: {data['invoice_number']}")
            print(f"  Amount: {data['amount']} SAR")
            print(f"  Tax: {data['tax']} SAR")
            print(f"  Total: {data['total']} SAR")
            print(f"  Status: {data['status']}")
            return True
        else:
            print(f"✗ Invoice retrieval failed: {response.json()}")
            return False
    
    def run_full_test(self):
        """Run complete payment flow test"""
        print("=" * 60)
        print("SALIS AUTO - Payment Flow Test")
        print("=" * 60)
        
        steps = [
            self.register_user,
            self.login,
            self.create_booking,
            self.create_payment_intent,
            self.confirm_payment,
            self.get_invoice
        ]
        
        for step in steps:
            if not step():
                print("\n" + "=" * 60)
                print("TEST FAILED")
                print("=" * 60)
                return False
        
        print("\n" + "=" * 60)
        print("✓ ALL TESTS PASSED")
        print("=" * 60)
        return True

if __name__ == "__main__":
    test = PaymentFlowTest()
    success = test.run_full_test()
    exit(0 if success else 1)
