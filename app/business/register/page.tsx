'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Wrench, ArrowRight, Building2, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api';

export default function BusinessRegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        description: '',
        specialties: [] as string[]
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const availableSpecialties = [
        "Transmission Repair",
        "Engine Diagnostics",
        "Brake Service",
        "Oil Change",
        "Tire Service",
        "AC Repair",
        "Electrical",
        "Body Work"
    ];

    const toggleSpecialty = (specialty: string) => {
        setFormData(prev => ({
            ...prev,
            specialties: prev.specialties.includes(specialty)
                ? prev.specialties.filter(s => s !== specialty)
                : [...prev.specialties, specialty]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.specialties.length === 0) {
            setError('Please select at least one specialty');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            await apiClient.createProvider(formData);

            setSuccess(true);
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Navigation */}
            <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Wrench className="w-8 h-8 text-emerald-400" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            SALIS AUTO
                        </span>
                    </Link>
                    <Link href="/business/dashboard" className="text-slate-400 hover:text-emerald-400 transition-colors">
                        Already registered? Sign in
                    </Link>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-6 py-12">
                {success ? (
                    <div className="text-center py-24">
                        <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Building2 className="w-12 h-12 text-emerald-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Registration Successful!</h2>
                        <p className="text-slate-400 mb-8">
                            Your business has been registered. Our team will review your application and contact you within 24 hours.
                        </p>
                        <Link
                            href="/business/dashboard"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-slate-950 hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                        >
                            Go to Dashboard
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-white mb-4">Register Your Business</h1>
                            <p className="text-slate-400 text-lg">
                                Join SALIS AUTO and start managing your automotive service business
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                                {error}
                            </div>
                        )}

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
                            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Business Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Business Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                                            placeholder="Elite Auto Repair"
                                        />
                                    </div>

                                    {/* Contact Info */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                                                placeholder="contact@eliteauto.sa"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                                                placeholder="+966 50 123 4567"
                                            />
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Location *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                                            placeholder="Riyadh, KSA"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Business Description *
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors resize-none"
                                            placeholder="Premium automotive service with 15+ years of experience..."
                                        />
                                    </div>

                                    {/* Specialties */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-3">
                                            Select Your Specialties *
                                        </label>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {availableSpecialties.map((specialty) => (
                                                <button
                                                    key={specialty}
                                                    type="button"
                                                    onClick={() => toggleSpecialty(specialty)}
                                                    className={`px-4 py-3 rounded-xl font-medium text-left transition-all ${formData.specialties.includes(specialty)
                                                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950'
                                                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700'
                                                        }`}
                                                >
                                                    {specialty}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-slate-950 hover:shadow-lg hover:shadow-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Registering...
                                            </>
                                        ) : (
                                            <>
                                                Register Business
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
