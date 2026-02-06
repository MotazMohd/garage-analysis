'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Wrench, MapPin, User } from 'lucide-react';
import PaymentForm from '@/components/PaymentForm';

export default function CheckoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookingId = searchParams.get('booking');

    const [booking, setBooking] = useState<any>(null);
    const [provider, setProvider] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!bookingId) {
            setError('No booking ID provided');
            setLoading(false);
            return;
        }

        fetchBookingDetails();
    }, [bookingId]);

    const fetchBookingDetails = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                router.push('/login');
                return;
            }

            // Fetch booking details
            const bookingResponse = await fetch(`http://localhost:8000/api/bookings/${bookingId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!bookingResponse.ok) {
                throw new Error('Failed to fetch booking details');
            }

            const bookingData = await bookingResponse.json();
            setBooking(bookingData);

            // Fetch provider details
            const providerResponse = await fetch(`http://localhost:8000/api/providers/${bookingData.provider_id}`);
            if (providerResponse.ok) {
                const providerData = await providerResponse.json();
                setProvider(providerData);
            }

        } catch (err: any) {
            setError(err.message || 'Failed to load booking details');
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = (paymentId: number) => {
        // Redirect to success page or booking details
        router.push(`/bookings/${bookingId}?payment=success`);
    };

    const handlePaymentError = (error: string) => {
        console.error('Payment error:', error);
    };

    // Calculate pricing
    const calculatePricing = () => {
        const baseAmount = 500.00; // Default amount, should come from service pricing
        const tax = baseAmount * 0.15; // 15% VAT
        const total = baseAmount + tax;

        return { baseAmount, tax, total };
    };

    const { baseAmount, tax, total } = calculatePricing();

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
                <div className="max-w-md w-full text-center">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
                        <p className="text-red-400 mb-6">{error || 'Booking not found'}</p>
                        <Link
                            href="/marketplace"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 rounded-xl text-white hover:bg-slate-700 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Marketplace
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/marketplace"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Marketplace
                    </Link>
                    <h1 className="text-4xl font-bold text-white">Checkout</h1>
                    <p className="text-slate-400 mt-2">Complete your booking payment</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Booking Summary */}
                    <div className="space-y-6">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
                            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Booking Summary</h2>

                                {/* Provider Info */}
                                {provider && (
                                    <div className="mb-6 pb-6 border-b border-slate-700">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                                <Wrench className="w-6 h-6 text-slate-950" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">{provider.name}</h3>
                                                <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {provider.location}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Booking Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <User className="w-5 h-5 text-emerald-400" />
                                        <div>
                                            <div className="text-sm text-slate-500">Customer</div>
                                            <div className="font-medium">{booking.customer_name}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-slate-300">
                                        <Wrench className="w-5 h-5 text-emerald-400" />
                                        <div>
                                            <div className="text-sm text-slate-500">Service</div>
                                            <div className="font-medium">{booking.service_type}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-slate-300">
                                        <Calendar className="w-5 h-5 text-emerald-400" />
                                        <div>
                                            <div className="text-sm text-slate-500">Date</div>
                                            <div className="font-medium">{booking.booking_date}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-slate-300">
                                        <Clock className="w-5 h-5 text-emerald-400" />
                                        <div>
                                            <div className="text-sm text-slate-500">Time</div>
                                            <div className="font-medium">{booking.booking_time}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="mt-6 pt-6 border-t border-slate-700 space-y-3">
                                    <div className="flex justify-between text-slate-300">
                                        <span>Service Fee</span>
                                        <span>{baseAmount.toFixed(2)} SAR</span>
                                    </div>
                                    <div className="flex justify-between text-slate-300">
                                        <span>VAT (15%)</span>
                                        <span>{tax.toFixed(2)} SAR</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-slate-700">
                                        <span>Total</span>
                                        <span className="text-emerald-400">{total.toFixed(2)} SAR</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
                        <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                            <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>
                            <PaymentForm
                                amount={total}
                                currency="SAR"
                                bookingId={parseInt(bookingId!)}
                                onSuccess={handlePaymentSuccess}
                                onError={handlePaymentError}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
