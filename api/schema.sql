-- SALIS AUTO Platform Database Schema
-- PostgreSQL Database

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
    rating DECIMAL(2,1) DEFAULT 0.0,
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
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings/Appointments
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER REFERENCES service_providers(id) ON DELETE CASCADE,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Specialties
INSERT INTO specialties (name, description) VALUES
    ('Transmission Repair', 'Automatic and manual transmission services'),
    ('Engine Diagnostics', 'Computer diagnostics and engine repair'),
    ('Brake Service', 'Brake pads, rotors, and system maintenance'),
    ('Oil Change', 'Regular oil change and fluid services'),
    ('Tire Service', 'Tire rotation, balancing, and replacement'),
    ('AC Repair', 'Air conditioning system repair and recharge'),
    ('Electrical', 'Electrical system diagnostics and repair'),
    ('Body Work', 'Collision repair and body work')
ON CONFLICT (name) DO NOTHING;

-- Create Indexes for Performance
CREATE INDEX idx_providers_location ON service_providers(location);
CREATE INDEX idx_providers_rating ON service_providers(rating DESC);
CREATE INDEX idx_messages_provider ON messages(provider_id);
CREATE INDEX idx_reviews_provider ON reviews(provider_id);
CREATE INDEX idx_bookings_provider ON bookings(provider_id);
CREATE INDEX idx_bookings_date ON bookings(scheduled_date);
