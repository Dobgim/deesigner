import React, { useEffect, useMemo, useState } from 'react';
import {
  FileText,
  Search,
  Trash2,
  Mail,
  Phone,
  Clock,
  X,
  Package,
} from 'lucide-react';
import {
  getQuotes,
  setQuoteStatus,
  deleteQuote,
  type QuoteRequest,
  type QuoteStatus,
} from '../../lib/store';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const statusStyles: Record<QuoteStatus, string> = {
  new: 'bg-blue-50 text-blue-600 border-blue-200',
  'in-progress': 'bg-amber-50 text-amber-600 border-amber-200',
  completed: 'bg-emerald-50 text-emerald-600 border-emerald-200',
};

const statusLabels: Record<QuoteStatus, string> = {
  new: 'New',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

const Quotes: React.FC = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | QuoteStatus>('all');
  const [selected, setSelected] = useState<QuoteRequest | null>(null);

  const reload = () => setQuotes(getQuotes());

  useEffect(() => {
    reload();
    window.addEventListener('mch-store-change', reload);
    return () => window.removeEventListener('mch-store-change', reload);
  }, []);

  // Keep the open modal in sync after a status change
  useEffect(() => {
    if (selected) {
      const fresh = quotes.find((q) => q.id === selected.id);
      if (fresh && fresh.status !== selected.status) setSelected(fresh);
    }
  }, [quotes, selected]);

  const filtered = useMemo(() => {
    return quotes.filter((q) => {
      const matchesQuery =
        q.name.toLowerCase().includes(query.toLowerCase()) ||
        q.email.toLowerCase().includes(query.toLowerCase()) ||
        q.productName.toLowerCase().includes(query.toLowerCase());
      const status = q.status ?? 'new';
      const matchesFilter = filter === 'all' || status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [quotes, query, filter]);

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this quote request permanently?')) {
      deleteQuote(id);
      if (selected?.id === id) setSelected(null);
    }
  };

  const changeStatus = (id: string, status: QuoteStatus) => setQuoteStatus(id, status);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-secondary tracking-tight flex items-center gap-2">
            <FileText className="text-primary" /> Quote Requests
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Pricing requests submitted through the quote form.
          </p>
        </div>
        <span className="text-sm font-semibold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-xl self-start">
          {quotes.length} total
        </span>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, product..."
            className="w-full bg-slate-50 border border-slate-200 text-sm pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'new', 'in-progress', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition-all ${
                filter === f ? 'bg-primary text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {f === 'all' ? 'All' : statusLabels[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Table / list */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 flex flex-col items-center gap-3">
            <FileText size={40} className="text-slate-300" />
            <p className="text-sm">No quote requests match your filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((q) => {
              const status = q.status ?? 'new';
              return (
                <div
                  key={q.id}
                  className="flex items-center gap-4 px-4 sm:px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => setSelected(q)}
                >
                  <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold uppercase flex-shrink-0">
                    {q.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-secondary truncate">{q.name}</p>
                    <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                      <Package size={11} /> {q.productName} · Qty {q.quantity}
                    </p>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${statusStyles[status]} flex-shrink-0`}
                  >
                    {statusLabels[status]}
                  </span>
                  <span className="text-[11px] text-slate-400 hidden md:flex items-center gap-1 flex-shrink-0">
                    <Clock size={11} /> {formatDate(q.date)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(q.id);
                    }}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-secondary px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-bold uppercase">
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-bold">{selected.name}</h3>
                  <p className="text-slate-400 text-xs">{formatDate(selected.date)}</p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-6 flex flex-col gap-4">
              {/* Contact */}
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${selected.email}`}
                  className="flex items-center gap-3 text-sm text-slate-700 hover:text-primary transition-colors"
                >
                  <Mail size={16} className="text-primary" /> {selected.email}
                </a>
                {selected.phone && (
                  <a
                    href={`tel:${selected.phone}`}
                    className="flex items-center gap-3 text-sm text-slate-700 hover:text-primary transition-colors"
                  >
                    <Phone size={16} className="text-primary" /> {selected.phone}
                  </a>
                )}
              </div>

              {/* Product */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Product</p>
                  <p className="text-sm text-secondary font-semibold mt-0.5">{selected.productName}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quantity</p>
                  <p className="text-sm text-secondary font-semibold mt-0.5">{selected.quantity}</p>
                </div>
              </div>

              {/* Message */}
              {selected.message && (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Specifications
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>
              )}

              {/* Status control */}
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Update Status
                </p>
                <div className="flex gap-2">
                  {(['new', 'in-progress', 'completed'] as const).map((s) => {
                    const active = (selected.status ?? 'new') === s;
                    return (
                      <button
                        key={s}
                        onClick={() => changeStatus(selected.id, s)}
                        className={`flex-1 text-xs font-bold py-2.5 rounded-xl border transition-all ${
                          active ? statusStyles[s] : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {statusLabels[s]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={`mailto:${selected.email}?subject=Your quote request for ${encodeURIComponent(
                    selected.productName
                  )}`}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white text-center text-sm font-bold py-3 rounded-xl transition-colors"
                >
                  Send Quote by Email
                </a>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quotes;
