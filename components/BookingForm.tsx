'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, User, Mail, Phone, Wrench, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';

interface BookingFormProps {
    providerId: number;
    providerName: string;
    serviceType: string;
}

export default function BookingForm({ providerId, providerName, serviceType }: BookingFormProps) {
    const router = useRouter();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        customer_name: user?.full_name || '',
        customer_email: user?.email || '',
        customer_phone: '',
        service_type: serviceType,
        booking_date: '',
        booking_time: '',
        notes: ''
    });

    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (formData.booking_date) {
            fetchAvailableSlots();
        }
    }, [formData.booking_date]);

    const fetchAvailableSlots = async () => {
        setLoadingSlots(true);
        try {
            const response = await fetch(
                `http://localhost:8000/api/availability/${providerId}?booking_date=${formData.booking_date}`
            );

            if (response.ok) {
                const data = await response.json();
                const available = data.slots
                    .filter((slot: any) => slot.available)
                    .map((slot: any) => slot.time);
                setAvailableSlots(available);
            }
        } catch (err) {
            console.error('Error fetching slots:', err);
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch('http://localhost:8000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    provider_id: providerId,
                    customer_id: user?.id || 1,
                    ...formData
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Booking failed');
            }

            const booking = await response.json();
            setSuccess(true);

            // Redirect to checkout after 2 seconds
            setTimeout(() => {
                router.push(`/checkout?booking=${booking.id}`);
            }, 2000);

        } catch (err: any) {
            setError(err.message || 'Failed to create booking');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Booking Created!</h3>
                <p className="text-slate-400">Redirecting to checkout...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
                    {error}
                </div>
            )}

            {/* Provider Info */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <Wrench className="w-5 h-5 text-emerald-400" />
                    <div>
                        <div className="text-sm text-slate-400">Booking with</div>
                        <div className="font-semibold text-white">{providerName}</div>
                    </div>
                </div>
            </div>

            {/* Customer Name */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                </label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="text"
                        required
                        value={formData.customer_name}
                        onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                        placeholder="Ahmed Al-Saud"
                    />
                </div>
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                </label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="email"
                        required
                        value={formData.customer_email}
                        onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                        placeholder="you@example.com"
                    />
                </div>
            </div>

            {/* Phone */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Phone Number
                </label>
                <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="tel"
                        required
                        value={formData.customer_phone}
                        onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                        placeholder="+966 50 123 4567"
                    />
                </div>
            </div>

            {/* Service Type */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Service Type
                </label>
                <input
                    type="text"
                    required
                    value={formData.service_type}
                    onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                />
            </div>

            {/* Date */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Preferred Date
                </label>
                <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.booking_date}
                        onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                    />
                </div>
            </div>

            {/* Time Slots */}
            {formData.booking_date && (
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Available Time Slots
                    </label>
                    {loadingSlots ? (
                        <div className="text-slate-400 text-center py-4">Loading slots...</div>
                    ) : availableSlots.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                            {availableSlots.map((slot) => (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, booking_time: slot })}
                                    aria-label={`Select time slot ${slot}`}
                                    className={`px-4 py-2 rounded-xl border transition-colors ${formData.booking_time === slot
                                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                        : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600'
                                        }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-slate-400 text-center py-4">No slots available</div>
                    )}
                </div>
            )}

            {/* Notes */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Additional Notes (Optional)
                </label>
                <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors resize-none"
                    placeholder="Any specific requirements or details..."
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading || !formData.booking_time}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-slate-950 hover:shadow-lg hover:shadow-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Booking...
                    </>
                ) : (
                    <>
                        <Calendar className="w-5 h-5" />
                        Book Appointment
                    </>
                )}
            </button>
        </form>
    );
}
