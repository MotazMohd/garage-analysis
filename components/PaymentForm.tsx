'use client';

import { useState } from 'react';
import { CreditCard, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentFormProps {
    amount: number;
    currency?: string;
    bookingId: number;
    onSuccess?: (paymentId: number) => void;
    onError?: (error: string) => void;
}

export default function PaymentForm({
    amount,
    currency = 'SAR',
    bookingId,
    onSuccess,
    onError
}: PaymentFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [cardholderName, setCardholderName] = useState('');

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.slice(0, 2) + '/' + v.slice(2, 4);
        }
        return v;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Get auth token from localStorage
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('Please login to continue');
            }

            // Create payment intent
            const intentResponse = await fetch('http://localhost:8000/api/payments/create-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    booking_id: bookingId,
                    amount: amount,
                    currency: currency,
                    payment_method: 'card'
                })
            });

            if (!intentResponse.ok) {
                const errorData = await intentResponse.json();
                throw new Error(errorData.detail || 'Failed to create payment intent');
            }

            const intentData = await intentResponse.json();
            const paymentId = intentData.payment_id;

            // Simulate payment processing (in production, use Stripe Elements)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Confirm payment
            const confirmResponse = await fetch(`http://localhost:8000/api/payments/${paymentId}/confirm`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!confirmResponse.ok) {
                const errorData = await confirmResponse.json();
                throw new Error(errorData.detail || 'Payment failed');
            }

            const confirmData = await confirmResponse.json();

            setSuccess(true);
            if (onSuccess) {
                onSuccess(paymentId);
            }
        } catch (err: any) {
            const errorMessage = err.message || 'Payment failed. Please try again.';
            setError(errorMessage);
            if (onError) {
                onError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                <p className="text-slate-400">Your booking has been confirmed.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Display */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Amount</span>
                    <span className="text-3xl font-bold text-white">
                        {amount.toFixed(2)} {currency}
                    </span>
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400">{error}</p>
                </div>
            )}

            {/* Cardholder Name */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Cardholder Name
                </label>
                <input
                    type="text"
                    required
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                    placeholder="Ahmed Al-Saud"
                />
            </div>

            {/* Card Number */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Card Number
                </label>
                <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="text"
                        required
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                        placeholder="1234 5678 9012 3456"
                    />
                </div>
            </div>

            {/* Expiry and CVC */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Expiry Date
                    </label>
                    <input
                        type="text"
                        required
                        maxLength={5}
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                        placeholder="MM/YY"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        CVC
                    </label>
                    <input
                        type="text"
                        required
                        maxLength={3}
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                        placeholder="123"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-slate-950 hover:shadow-lg hover:shadow-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing Payment...
                    </>
                ) : (
                    <>
                        <CreditCard className="w-5 h-5" />
                        Pay {amount.toFixed(2)} {currency}
                    </>
                )}
            </button>

            {/* Security Notice */}
            <p className="text-xs text-slate-500 text-center">
                Your payment information is encrypted and secure
            </p>
        </form>
    );
}
