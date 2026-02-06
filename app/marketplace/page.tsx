'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, MapPin, Star, Phone, Mail, Wrench, ArrowLeft, Loader2 } from 'lucide-react';
import { apiClient, ServiceProvider } from '@/lib/api';

const specialties = [
    "All Services",
    "Transmission Repair",
    "Engine Diagnostics",
    "Brake Service",
    "Oil Change",
    "Tire Service",
    "AC Repair",
    "Electrical",
    "Body Work"
];

export default function MarketplacePage() {
    const [providers, setProviders] = useState<ServiceProvider[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('All Services');
    const [locationFilter, setLocationFilter] = useState('');

    // Fetch providers on mount
    useEffect(() => {
        loadProviders();
    }, []);

    const loadProviders = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await apiClient.getProviders();
            setProviders(data);
        } catch (err) {
            setError('Failed to load providers. Make sure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            loadProviders();
            return;
        }

        try {
            setLoading(true);
            const results = await apiClient.searchProviders(searchQuery, locationFilter || undefined);
            setProviders(results);
        } catch (err) {
            setError('Search failed');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredProviders = providers.filter(provider => {
        const matchesSpecialty = selectedSpecialty === 'All Services' ||
            provider.specialties.includes(selectedSpecialty);
        const matchesLocation = !locationFilter ||
            provider.location.toLowerCase().includes(locationFilter.toLowerCase());

        return matchesSpecialty && matchesLocation;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Navigation */}
            <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Wrench className="w-8 h-8 text-emerald-400" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            SALIS AUTO
                        </span>
                    </Link>
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </Link>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Search & Filters */}
                <div className="mb-12 space-y-6">
                    <h1 className="text-4xl font-bold text-white mb-2">Find Service Providers</h1>
                    <p className="text-slate-400 text-lg">Discover verified automotive experts near you</p>

                    {/* Search Bar */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition"></div>
                        <div className="relative bg-slate-900 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
                            <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-xl">
                                <Search className="w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search providers or services..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500"
                                />
                            </div>
                            <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-xl">
                                <MapPin className="w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    className="bg-transparent border-none outline-none text-white placeholder-slate-500"
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-slate-950 hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Specialty Filters */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                        <Filter className="w-5 h-5 text-slate-500 flex-shrink-0" />
                        {specialties.map((specialty) => (
                            <button
                                key={specialty}
                                onClick={() => setSelectedSpecialty(specialty)}
                                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${selectedSpecialty === specialty
                                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950'
                                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                {specialty}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-24">
                        <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />
                    </div>
                )}

                {/* Results */}
                {!loading && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">
                                {filteredProviders.length} Provider{filteredProviders.length !== 1 ? 's' : ''} Found
                            </h2>
                        </div>

                        <div className="grid gap-6">
                            {filteredProviders.map((provider) => (
                                <div key={provider.id} className="group relative">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition"></div>
                                    <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Provider Info */}
                                            <div className="flex-1 space-y-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white mb-2">{provider.name}</h3>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-white font-semibold">{provider.rating}</span>
                                                            <span className="text-slate-500">({provider.reviews} reviews)</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-slate-400">
                                                            <MapPin className="w-4 h-4" />
                                                            {provider.location}
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-slate-300">{provider.description}</p>

                                                <div className="flex flex-wrap gap-2">
                                                    {provider.specialties.map((specialty, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-medium"
                                                        >
                                                            {specialty}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Contact Actions */}
                                            <div className="flex flex-col gap-3 md:w-48">
                                                <a
                                                    href={`tel:${provider.phone}`}
                                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-slate-950 hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                                                >
                                                    <Phone className="w-5 h-5" />
                                                    Call Now
                                                </a>
                                                <a
                                                    href={`mailto:${provider.email}`}
                                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 rounded-xl font-semibold text-white hover:bg-slate-700 transition-all"
                                                >
                                                    <Mail className="w-5 h-5" />
                                                    Email
                                                </a>
                                                <button className="px-4 py-3 border border-slate-700 rounded-xl font-semibold text-white hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all">
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredProviders.length === 0 && !loading && (
                            <div className="text-center py-24">
                                <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-12 h-12 text-slate-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">No providers found</h3>
                                <p className="text-slate-400">Try adjusting your search or filters</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
