// API Client - Booking Methods

import { apiClient as baseClient } from './api';

export interface Booking {
    id: number;
    provider_id: number;
    customer_id: number;
    service_type: string;
    booking_date: string;
    booking_time: string;
    status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
    notes?: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    created_at: string;
    updated_at: string;
}

export interface BookingCreate {
    provider_id: number;
    customer_id: number;
    service_type: string;
    booking_date: string;
    booking_time: string;
    notes?: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
}

export interface TimeSlot {
    time: string;
    available: boolean;
}

export interface AvailabilityResponse {
    date: string;
    slots: TimeSlot[];
}

class BookingAPI {
    private baseURL: string;

    constructor(baseURL: string = 'http://localhost:8000') {
        this.baseURL = baseURL;
    }

    private getAuthHeaders(): HeadersInit {
        const token = localStorage.getItem('access_token');
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
    }

    async createBooking(booking: BookingCreate): Promise<Booking> {
        const response = await fetch(`${this.baseURL}/api/bookings`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(booking)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to create booking');
        }

        return response.json();
    }

    async getBooking(id: number): Promise<Booking> {
        const response = await fetch(`${this.baseURL}/api/bookings/${id}`, {
            headers: this.getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch booking');
        }

        return response.json();
    }

    async getProviderBookings(providerId: number): Promise<Booking[]> {
        const response = await fetch(`${this.baseURL}/api/bookings/provider/${providerId}`, {
            headers: this.getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch provider bookings');
        }

        return response.json();
    }

    async getCustomerBookings(customerId: number): Promise<Booking[]> {
        const response = await fetch(`${this.baseURL}/api/bookings/customer/${customerId}`, {
            headers: this.getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch customer bookings');
        }

        return response.json();
    }

    async updateBooking(id: number, update: { status?: string; notes?: string }): Promise<Booking> {
        const response = await fetch(`${this.baseURL}/api/bookings/${id}`, {
            method: 'PATCH',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(update)
        });

        if (!response.ok) {
            throw new Error('Failed to update booking');
        }

        return response.json();
    }

    async getAvailability(providerId: number, date: string): Promise<AvailabilityResponse> {
        const response = await fetch(
            `${this.baseURL}/api/availability/${providerId}?booking_date=${date}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch availability');
        }

        return response.json();
    }
}

export const bookingAPI = new BookingAPI();
