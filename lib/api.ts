// API Client for SALIS AUTO Platform
// Handles all communication with the FastAPI backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ServiceProvider {
    id: number;
    name: string;
    specialties: string[];
    location: string;
    rating: number;
    reviews: number;
    description: string;
    phone: string;
    email: string;
    verified: boolean;
    created_at: string;
}

export interface Specialty {
    id: number;
    name: string;
    description?: string;
}

export interface Message {
    id: number;
    provider_id: number;
    customer_name: string;
    customer_email: string;
    subject: string;
    message: string;
    created_at: string;
}

export interface ProviderFilters {
    specialty?: string;
    location?: string;
    min_rating?: number;
}

class APIClient {
    private baseURL: string;

    constructor(baseURL: string = API_BASE_URL) {
        this.baseURL = baseURL;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;

        const config: RequestInit = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // Provider endpoints
    async getProviders(filters?: ProviderFilters): Promise<ServiceProvider[]> {
        const params = new URLSearchParams();
        if (filters?.specialty) params.append('specialty', filters.specialty);
        if (filters?.location) params.append('location', filters.location);
        if (filters?.min_rating) params.append('min_rating', filters.min_rating.toString());

        const query = params.toString() ? `?${params.toString()}` : '';
        return this.request<ServiceProvider[]>(`/api/providers${query}`);
    }

    async getProvider(id: number): Promise<ServiceProvider> {
        return this.request<ServiceProvider>(`/api/providers/${id}`);
    }

    async createProvider(data: Partial<ServiceProvider>): Promise<ServiceProvider> {
        return this.request<ServiceProvider>('/api/providers', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Search endpoint
    async searchProviders(query: string, location?: string): Promise<ServiceProvider[]> {
        const params = new URLSearchParams({ q: query });
        if (location) params.append('location', location);

        return this.request<ServiceProvider[]>(`/api/search?${params.toString()}`);
    }

    // Specialty endpoints
    async getSpecialties(): Promise<Specialty[]> {
        return this.request<Specialty[]>('/api/specialties');
    }

    // Message endpoints
    async sendMessage(data: {
        provider_id: number;
        customer_name: string;
        customer_email: string;
        subject: string;
        message: string;
    }): Promise<Message> {
        return this.request<Message>('/api/messages', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getProviderMessages(providerId: number): Promise<Message[]> {
        return this.request<Message[]>(`/api/messages/${providerId}`);
    }

    // Health check
    async healthCheck(): Promise<{ status: string; timestamp: string }> {
        return this.request('/health');
    }
}

// Export singleton instance
export const apiClient = new APIClient();

// Export class for testing
export default APIClient;
