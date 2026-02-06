'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Star, Phone, Mail, Wrench, Loader2 } from 'lucide-react';
import BookingForm from '@/components/BookingForm';

export default function ProviderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const providerId = parseInt(params.id as string);

    const [provider, setProvider] = useState<any>(null);
    const [pricing, setPricing] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<string>('');

    useEffect(() => {
        fetchProviderDetails();
    }, [providerId]);

    const fetchProviderDetails = async () => {
        try {
            // Fetch provider
            const providerResponse = await fetch(`http://localhost:8000/api/providers/${providerId}`);
            if (!providerResponse.ok) {
                throw new Error('Provider not found');
            }
            const providerData = await providerResponse.json();
            setProvider(providerData);
            setSelectedService(providerData.specialties[0] || '');

            // Fetch pricing
            const pricingResponse = await fetch(`http://localhost:8000/api/pricing/${providerId}`);
            if (pricingResponse.ok) {
                const pricingData = await pricingResponse.json();
                setPricing(pricingData);
            }

        } catch (err: any) {
            setError(err.message || 'Failed to load provider details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>
        );
    }

    if (error || !provider) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
                <div className="max-w-md w-full text-center">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
                        <p className="text-red-400 mb-6">{error || 'Provider not found'}</p>
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
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Provider Info */}
                    <div className="space-y-6">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
                            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
                                {/* Header */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Wrench className="w-8 h-8 text-slate-950" />
                                    </div>
                                    <div className="flex-1">
                                        <h1 className="text-3xl font-bold text-white mb-2">{provider.name}</h1>
                                        <div className="flex items-center gap-4 text-slate-400">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                <span className="font-semibold text-white">{provider.rating}</span>
                                                <span className="text-sm">({provider.reviews} reviews)</span>
                                            </div>
                                            {provider.verified && (
                                                <span className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-semibold">
                                                    VERIFIED
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-slate-300 mb-6">{provider.description}</p>

                                {/* Location */}
                                <div className="flex items-center gap-3 text-slate-300 mb-4">
                                    <MapPin className="w-5 h-5 text-emerald-400" />
                                    <span>{provider.location}</span>
                                </div>

                                {/* Contact */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <Phone className="w-5 h-5 text-emerald-400" />
                                        <a href={`tel:${provider.phone}`} className="hover:text-emerald-400 transition-colors">
                                            {provider.phone}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <Mail className="w-5 h-5 text-emerald-400" />
                                        <a href={`mailto:${provider.email}`} className="hover:text-emerald-400 transition-colors">
                                            {provider.email}
                                        </a>
                                    </div>
                                </div>

                                {/* Specialties */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-3">Specialties</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {provider.specialties.map((specialty: string) => (
                                            <span
                                                key={specialty}
                                                className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm"
                                            >
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Pricing */}
                                {pricing.length > 0 && (
                                    <div className="mt-6 pt-6 border-t border-slate-700">
                                        <h3 className="text-lg font-semibold text-white mb-3">Pricing</h3>
                                        <div className="space-y-2">
                                            {pricing.map((item) => (
                                                <div key={item.id} className="flex justify-between items-center text-slate-300">
                                                    <span>{item.service_type}</span>
                                                    <span className="font-semibold text-emerald-400">
                                                        {item.base_price.toFixed(2)} {item.currency}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
                        <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Book Appointment</h2>
                            <BookingForm
                                providerId={providerId}
                                providerName={provider.name}
                                serviceType={selectedService}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
