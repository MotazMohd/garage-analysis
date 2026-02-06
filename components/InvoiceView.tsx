'use client';

import { Download, FileText, Calendar, DollarSign } from 'lucide-react';

interface InvoiceViewProps {
    invoice: {
        id: number;
        invoice_number: string;
        amount: number;
        tax: number;
        total: number;
        issued_date: string;
        due_date: string;
        status: string;
    };
    booking?: {
        customer_name: string;
        customer_email: string;
        service_type: string;
    };
    provider?: {
        name: string;
        location: string;
        email: string;
        phone: string;
    };
}

export default function InvoiceView({ invoice, booking, provider }: InvoiceViewProps) {
    const handleDownload = () => {
        // In production, this would generate a PDF
        window.print();
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <FileText className="w-8 h-8 text-emerald-400" />
                                <h1 className="text-3xl font-bold text-white">INVOICE</h1>
                            </div>
                            <p className="text-slate-400">Invoice #{invoice.invoice_number}</p>
                        </div>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Download PDF
                        </button>
                    </div>

                    {/* Provider & Customer Info */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-700">
                        {/* From */}
                        {provider && (
                            <div>
                                <h3 className="text-sm font-semibold text-slate-400 mb-3">FROM</h3>
                                <div className="text-white">
                                    <p className="font-semibold text-lg mb-1">{provider.name}</p>
                                    <p className="text-slate-400 text-sm">{provider.location}</p>
                                    <p className="text-slate-400 text-sm">{provider.email}</p>
                                    <p className="text-slate-400 text-sm">{provider.phone}</p>
                                </div>
                            </div>
                        )}

                        {/* To */}
                        {booking && (
                            <div>
                                <h3 className="text-sm font-semibold text-slate-400 mb-3">TO</h3>
                                <div className="text-white">
                                    <p className="font-semibold text-lg mb-1">{booking.customer_name}</p>
                                    <p className="text-slate-400 text-sm">{booking.customer_email}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Invoice Details */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-slate-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">Issue Date</span>
                            </div>
                            <p className="text-white font-semibold">
                                {new Date(invoice.issued_date).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="bg-slate-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">Due Date</span>
                            </div>
                            <p className="text-white font-semibold">
                                {new Date(invoice.due_date).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="bg-slate-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                                <DollarSign className="w-4 h-4" />
                                <span className="text-sm">Status</span>
                            </div>
                            <p className={`font-semibold capitalize ${invoice.status === 'paid' ? 'text-emerald-400' : 'text-yellow-400'
                                }`}>
                                {invoice.status}
                            </p>
                        </div>
                    </div>

                    {/* Line Items */}
                    <div className="mb-8">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-700">
                                    <th className="text-left text-slate-400 font-semibold pb-3">Description</th>
                                    <th className="text-right text-slate-400 font-semibold pb-3">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-slate-700/50">
                                    <td className="py-4 text-white">
                                        {booking?.service_type || 'Service'}
                                    </td>
                                    <td className="py-4 text-right text-white">
                                        {invoice.amount.toFixed(2)} SAR
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-slate-300">
                            <span>Subtotal</span>
                            <span>{invoice.amount.toFixed(2)} SAR</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                            <span>VAT (15%)</span>
                            <span>{invoice.tax.toFixed(2)} SAR</span>
                        </div>
                        <div className="flex justify-between text-2xl font-bold text-white pt-3 border-t border-slate-700">
                            <span>Total</span>
                            <span className="text-emerald-400">{invoice.total.toFixed(2)} SAR</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-500 text-sm">
                        <p>Thank you for your business!</p>
                        <p className="mt-2">© 2026 SALIS AUTO. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
