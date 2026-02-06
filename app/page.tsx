'use client';

import Link from 'next/link';
import { Search, Wrench, Shield, Star, ArrowRight, MapPin, User, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function Home() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              SALIS AUTO
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/marketplace" className="text-slate-300 hover:text-emerald-400 transition-colors">
              Find Services
            </Link>
            <Link href="/business" className="text-slate-300 hover:text-emerald-400 transition-colors">
              For Business
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg">
                  <User className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">{user?.full_name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg font-semibold text-slate-950 hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
            <Shield className="w-4 h-4" />
            Trusted by 1,000+ Auto Service Providers
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Find the Perfect
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Auto Service Provider
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Connect with specialized automotive service providers. From repairs to maintenance,
            find verified experts near you.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mt-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition"></div>
              <div className="relative bg-slate-900 rounded-2xl p-2 flex items-center gap-3">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search className="w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search for services (e.g., Transmission Repair, Oil Change...)"
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 text-lg"
                  />
                </div>
                <div className="flex items-center gap-2 px-4 border-l border-slate-700">
                  <MapPin className="w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-32 bg-transparent border-none outline-none text-white placeholder-slate-500"
                  />
                </div>
                <Link
                  href="/marketplace"
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-slate-950 hover:shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center gap-2"
                >
                  Search
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Search className="w-8 h-8" />,
              title: "Smart Search",
              description: "Find exactly what you need with our intelligent search and filtering system"
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Verified Providers",
              description: "All service providers are verified and rated by real customers"
            },
            {
              icon: <Star className="w-8 h-8" />,
              title: "Quality Guaranteed",
              description: "Read reviews and ratings to make informed decisions"
            }
          ].map((feature, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA for Businesses */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 border border-slate-700">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Are you a Service Provider?
                </h2>
                <p className="text-xl text-slate-300">
                  Join our platform and manage your business with our comprehensive SaaS tools.
                  Get discovered by thousands of customers.
                </p>
              </div>
              <Link
                href="/business/register"
                className="px-8 py-4 bg-white text-slate-950 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                Start Free Trial
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 backdrop-blur-xl mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="w-6 h-6 text-emerald-400" />
              <span className="text-lg font-bold text-white">SALIS AUTO</span>
            </div>
            <p className="text-slate-500">© 2026 SALIS AUTO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
