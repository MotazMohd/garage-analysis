-- SALIS AUTO Platform - Complete Database Schema
-- PostgreSQL Database - Run this file to create all tables
-- ============================================
-- CORE TABLES
-- ============================================
-- Service Specialties
CREATE TABLE IF NOT EXISTS specialties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Service Providers (Businesses)
CREATE TABLE IF NOT EXISTS service_providers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(200) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    rating DECIMAL(2, 1) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Provider Specialties (Many-to-Many)
CREATE TABLE IF NOT EXISTS provider_specialties (
    provider_id INTEGER REFERENCES service_providers(id) ON DELETE CASCADE,
    specialty_id INTEGER REFERENCES specialties(id) ON DELETE CASCADE,
    PRIMARY KEY (provider_id, specialty_id)
);
-- ============================================
-- AUTHENTICATION TABLES
-- ============================================
-- Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(200) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Business Users Table (for service provider staff)
CREATE TABLE IF NOT EXISTS business_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(200) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    provider_id INTEGER REFERENCES service_providers(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- BOOKING TABLES
-- ============================================
-- Bookings/Appointments
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER REFERENCES service_providers(id) ON DELETE CASCADE,
    customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
    service_type VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    notes TEXT,
    customer_name VARCHAR(200) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Provider Availability Table
CREATE TABLE IF NOT EXISTS provider_availability (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER REFERENCES service_providers(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL,
    -- 0=Sunday, 6=Saturday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- PAYMENT TABLES
-- ============================================
-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'SAR',
    status VARCHAR(20) DEFAULT 'pending',
    payment_method VARCHAR(20) DEFAULT 'card',
    stripe_payment_intent_id VARCHAR(255),
    stripe_charge_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    payment_id INTEGER REFERENCES payments(id),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    issued_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP,
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Service Pricing Table
CREATE TABLE IF NOT EXISTS service_pricing (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER REFERENCES service_providers(id) ON DELETE CASCADE,
    service_type VARCHAR(100) NOT NULL,
    base_price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'SAR',
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- COMMUNICATION TABLES
-- ============================================
-- Customer Messages
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER REFERENCES service_providers(id) ON DELETE CASCADE,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Customer Reviews
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER REFERENCES service_providers(id) ON DELETE CASCADE,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    rating INTEGER NOT NULL CHECK (
        rating >= 1
        AND rating <= 5
    ),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
-- Core indexes
CREATE INDEX IF NOT EXISTS idx_providers_location ON service_providers(location);
CREATE INDEX IF NOT EXISTS idx_providers_rating ON service_providers(rating DESC);
-- Auth indexes
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_business_users_email ON business_users(email);
CREATE INDEX IF NOT EXISTS idx_business_users_provider ON business_users(provider_id);
-- Booking indexes
CREATE INDEX IF NOT EXISTS idx_bookings_provider ON bookings(provider_id);
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_provider_availability_provider ON provider_availability(provider_id);
-- Payment indexes
CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_invoices_booking ON invoices(booking_id);
CREATE INDEX IF NOT EXISTS idx_invoices_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_service_pricing_provider ON service_pricing(provider_id);
-- Communication indexes
CREATE INDEX IF NOT EXISTS idx_messages_provider ON messages(provider_id);
CREATE INDEX IF NOT EXISTS idx_reviews_provider ON reviews(provider_id);
-- ============================================
-- DEFAULT DATA
-- ============================================
-- Insert Default Specialties
INSERT INTO specialties (name, description)
VALUES (
        'Transmission Repair',
        'Automatic and manual transmission services'
    ),
    (
        'Engine Diagnostics',
        'Computer diagnostics and engine repair'
    ),
    (
        'Brake Service',
        'Brake pads, rotors, and system maintenance'
    ),
    (
        'Oil Change',
        'Regular oil change and fluid services'
    ),
    (
        'Tire Service',
        'Tire rotation, balancing, and replacement'
    ),
    (
        'AC Repair',
        'Air conditioning system repair and recharge'
    ),
    (
        'Electrical',
        'Electrical system diagnostics and repair'
    ),
    ('Body Work', 'Collision repair and body work') ON CONFLICT (name) DO NOTHING;
-- Insert Sample Providers
INSERT INTO service_providers (
        name,
        description,
        location,
        phone,
        email,
        rating,
        review_count,
        verified
    )
VALUES (
        'Elite Auto Repair',
        'Premium automotive service with 15+ years of experience',
        'Riyadh, KSA',
        '+966 50 123 4567',
        'contact@eliteauto.sa',
        4.8,
        127,
        TRUE
    ),
    (
        'Quick Fix Garage',
        'Fast and reliable service for all your automotive needs',
        'Jeddah, KSA',
        '+966 50 234 5678',
        'info@quickfix.sa',
        4.6,
        89,
        TRUE
    ),
    (
        'Pro Transmission Center',
        'Specialized transmission experts with certified technicians',
        'Dammam, KSA',
        '+966 50 345 6789',
        'service@protrans.sa',
        4.9,
        203,
        TRUE
    ) ON CONFLICT (email) DO NOTHING;
-- Link providers to specialties
INSERT INTO provider_specialties (provider_id, specialty_id)
SELECT p.id,
    s.id
FROM service_providers p
    CROSS JOIN specialties s
WHERE (
        p.name = 'Elite Auto Repair'
        AND s.name IN (
            'Transmission Repair',
            'Engine Diagnostics',
            'Brake Service'
        )
    )
    OR (
        p.name = 'Quick Fix Garage'
        AND s.name IN ('Oil Change', 'Tire Service', 'AC Repair')
    )
    OR (
        p.name = 'Pro Transmission Center'
        AND s.name IN ('Transmission Repair', 'Clutch Replacement')
    ) ON CONFLICT DO NOTHING;
-- Insert default pricing
INSERT INTO service_pricing (
        provider_id,
        service_type,
        base_price,
        description
    )
SELECT p.id,
    'Transmission Repair',
    1500.00,
    'Complete transmission diagnostic and repair'
FROM service_providers p
WHERE p.name = 'Elite Auto Repair' ON CONFLICT DO NOTHING;
INSERT INTO service_pricing (
        provider_id,
        service_type,
        base_price,
        description
    )
SELECT p.id,
    'Engine Diagnostics',
    500.00,
    'Computer diagnostics and engine analysis'
FROM service_providers p
WHERE p.name = 'Elite Auto Repair' ON CONFLICT DO NOTHING;
INSERT INTO service_pricing (
        provider_id,
        service_type,
        base_price,
        description
    )
SELECT p.id,
    'Oil Change',
    150.00,
    'Full synthetic oil change with filter'
FROM service_providers p
WHERE p.name = 'Quick Fix Garage' ON CONFLICT DO NOTHING;
-- Default availability (9 AM - 6 PM, Monday-Saturday)
INSERT INTO provider_availability (provider_id, day_of_week, start_time, end_time)
SELECT id,
    day,
    '09:00:00',
    '18:00:00'
FROM service_providers
    CROSS JOIN generate_series(1, 6) AS day ON CONFLICT DO NOTHING;