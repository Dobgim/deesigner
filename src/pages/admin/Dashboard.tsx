import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, FileText, Package, MailOpen, ArrowRight, Clock } from 'lucide-react';
import {
  getInquiries,
  getQuotes,
  getProducts,
  type Inquiry,
  type QuoteRequest,
} from '../../lib/store';
import { getUsername } from '../../lib/auth';
import type { Product } from '../../lib/products-data';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const Dashboard: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const load = () => {
      setInquiries(getInquiries());
      setQuotes(getQuotes());
      setProducts(getProducts());
    };
    load();
    window.addEventListener('mch-store-change', load);
    window.addEventListener('storage', load);
    return () => {
      window.removeEventListener('mch-store-change', load);
      window.removeEventListener('storage', load);
    };
  }, []);

  const unread = inquiries.filter((i) => !i.read).length;
  const newQuotes = quotes.filter((q) => (q.status ?? 'new') === 'new').length;

  const stats = [
    {
      label: 'Total Inquiries',
      value: inquiries.length,
      sub: `${unread} unread`,
      icon: Inbox,
      to: '/admin/inquiries',
      color: 'bg-blue-500',
    },
    {
      label: 'Quote Requests',
      value: quotes.length,
      sub: `${newQuotes} new`,
      icon: FileText,
      to: '/admin/quotes',
      color: 'bg-primary',
    },
    {
      label: 'Products Listed',
      value: products.length,
      sub: 'in catalog',
      icon: Package,
      to: '/admin/products',
      color: 'bg-amber-500',
    },
    {
      label: 'Unread Messages',
      value: unread,
      sub: 'need attention',
      icon: MailOpen,
      to: '/admin/inquiries',
      color: 'bg-rose-500',
    },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary tracking-tight">
          Welcome back, {getUsername()} 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Here's what's happening with your container business today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-4 group"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-xl ${s.color} text-white flex items-center justify-center`}>
                <s.icon size={22} />
              </div>
              <ArrowRight size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
            </div>
            <div>
              <p className="text-3xl font-black text-secondary">{s.value}</p>
              <p className="text-sm font-semibold text-slate-600 mt-1">{s.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent inquiries */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-secondary flex items-center gap-2">
              <Inbox size={18} className="text-primary" /> Recent Inquiries
            </h3>
            <Link to="/admin/inquiries" className="text-xs font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {inquiries.slice(0, 5).map((i) => (
              <div key={i.id} className="px-6 py-3.5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-secondary truncate">
                    {i.name}
                    {!i.read && (
                      <span className="ml-2 inline-block w-2 h-2 rounded-full bg-primary align-middle" />
                    )}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{i.message}</p>
                </div>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 flex-shrink-0">
                  <Clock size={11} /> {formatDate(i.date)}
                </span>
              </div>
            ))}
            {inquiries.length === 0 && (
              <p className="px-6 py-8 text-center text-sm text-slate-400">No inquiries yet.</p>
            )}
          </div>
        </div>

        {/* Recent quotes */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-secondary flex items-center gap-2">
              <FileText size={18} className="text-primary" /> Recent Quote Requests
            </h3>
            <Link to="/admin/quotes" className="text-xs font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {quotes.slice(0, 5).map((q) => (
              <div key={q.id} className="px-6 py-3.5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-secondary truncate">{q.name}</p>
                  <p className="text-xs text-slate-500 truncate">
                    {q.productName} · Qty {q.quantity}
                  </p>
                </div>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 flex-shrink-0">
                  <Clock size={11} /> {formatDate(q.date)}
                </span>
              </div>
            ))}
            {quotes.length === 0 && (
              <p className="px-6 py-8 text-center text-sm text-slate-400">No quote requests yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
