'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Wrench,
    BarChart3,
    Users,
    Calendar,
    DollarSign,
    Settings,
    Bell,
    TrendingUp,
    Package,
    MessageSquare
} from 'lucide-react';

export default function BusinessDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data
    const stats = {
        totalBookings: 127,
        revenue: 45600,
        activeCustomers: 89,
        avgRating: 4.8
    };

    const recentBookings = [
        { id: 1, customer: "Ahmed Al-Saud", service: "Transmission Repair", date: "2026-02-03", status: "Pending" },
        { id: 2, customer: "Fatima Hassan", service: "Oil Change", date: "2026-02-02", status: "Completed" },
        { id: 3, customer: "Mohammed Ali", service: "Brake Service", date: "2026-02-01", status: "In Progress" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Top Navigation */}
            <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Wrench className="w-8 h-8 text-emerald-400" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            SALIS AUTO
                        </span>
                        <span className="ml-4 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-medium">
                            Business Portal
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors">
                            <Bell className="w-6 h-6 text-slate-400" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-lg">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full"></div>
                            <span className="text-white font-medium">Elite Auto Repair</span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex gap-6">
                    {/* Sidebar */}
                    <aside className="w-64 flex-shrink-0">
                        <nav className="space-y-2">
                            {[
                                { id: 'overview', icon: <BarChart3 className="w-5 h-5" />, label: 'Overview' },
                                { id: 'bookings', icon: <Calendar className="w-5 h-5" />, label: 'Bookings' },
                                { id: 'customers', icon: <Users className="w-5 h-5" />, label: 'Customers' },
                                { id: 'services', icon: <Package className="w-5 h-5" />, label: 'Services' },
                                { id: 'messages', icon: <MessageSquare className="w-5 h-5" />, label: 'Messages' },
                                { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === item.id
                                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950'
                                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                                        }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                                    <p className="text-slate-400">Welcome back! Here's what's happening with your business.</p>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid md:grid-cols-4 gap-6">
                                    {[
                                        { label: 'Total Bookings', value: stats.totalBookings, icon: <Calendar className="w-6 h-6" />, trend: '+12%' },
                                        { label: 'Revenue', value: `SAR ${stats.revenue.toLocaleString()}`, icon: <DollarSign className="w-6 h-6" />, trend: '+8%' },
                                        { label: 'Active Customers', value: stats.activeCustomers, icon: <Users className="w-6 h-6" />, trend: '+5%' },
                                        { label: 'Avg Rating', value: stats.avgRating, icon: <TrendingUp className="w-6 h-6" />, trend: '+0.2' }
                                    ].map((stat, idx) => (
                                        <div key={idx} className="group relative">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition"></div>
                                            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
                                                        {stat.icon}
                                                    </div>
                                                    <span className="text-emerald-400 text-sm font-semibold">{stat.trend}</span>
                                                </div>
                                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                                <div className="text-slate-400 text-sm">{stat.label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Recent Bookings */}
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-10 blur transition"></div>
                                    <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                                        <h2 className="text-xl font-bold text-white mb-6">Recent Bookings</h2>
                                        <div className="space-y-4">
                                            {recentBookings.map((booking) => (
                                                <div key={booking.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors">
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-white">{booking.customer}</div>
                                                        <div className="text-sm text-slate-400">{booking.service}</div>
                                                    </div>
                                                    <div className="text-sm text-slate-400">{booking.date}</div>
                                                    <div className={`px-3 py-1 rounded-lg text-sm font-medium ${booking.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                                                            booking.status === 'In Progress' ? 'bg-cyan-500/10 text-cyan-400' :
                                                                'bg-yellow-500/10 text-yellow-400'
                                                        }`}>
                                                        {booking.status}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab !== 'overview' && (
                            <div className="text-center py-24">
                                <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Package className="w-12 h-12 text-slate-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section</h3>
                                <p className="text-slate-400">This section is under development</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
