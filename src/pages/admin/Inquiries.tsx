import React, { useEffect, useMemo, useState } from 'react';
import {
  Inbox,
  Search,
  Trash2,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  Circle,
  X,
} from 'lucide-react';
import {
  getInquiries,
  setInquiryRead,
  deleteInquiry,
  type Inquiry,
} from '../../lib/store';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const Inquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const reload = () => setInquiries(getInquiries());

  useEffect(() => {
    reload();
    window.addEventListener('mch-store-change', reload);
    return () => window.removeEventListener('mch-store-change', reload);
  }, []);

  const filtered = useMemo(() => {
    return inquiries.filter((i) => {
      const matchesQuery =
        i.name.toLowerCase().includes(query.toLowerCase()) ||
        i.email.toLowerCase().includes(query.toLowerCase()) ||
        i.message.toLowerCase().includes(query.toLowerCase());
      const matchesFilter =
        filter === 'all' || (filter === 'unread' ? !i.read : !!i.read);
      return matchesQuery && matchesFilter;
    });
  }, [inquiries, query, filter]);

  const openInquiry = (i: Inquiry) => {
    setSelected(i);
    if (!i.read) setInquiryRead(i.id, true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this inquiry permanently?')) {
      deleteInquiry(id);
      if (selected?.id === id) setSelected(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-secondary tracking-tight flex items-center gap-2">
            <Inbox className="text-primary" /> Contact Inquiries
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Messages submitted through the website contact form.
          </p>
        </div>
        <span className="text-sm font-semibold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-xl self-start">
          {inquiries.length} total
        </span>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, message..."
            className="w-full bg-slate-50 border border-slate-200 text-sm pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-4 py-2.5 rounded-xl capitalize transition-all ${
                filter === f ? 'bg-primary text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 flex flex-col items-center gap-3">
            <Inbox size={40} className="text-slate-300" />
            <p className="text-sm">No inquiries match your filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((i) => (
              <div
                key={i.id}
                className={`flex items-center gap-4 px-4 sm:px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                  !i.read ? 'bg-primary/5' : ''
                }`}
                onClick={() => openInquiry(i)}
              >
                <div className="flex-shrink-0">
                  {i.read ? (
                    <CheckCircle2 size={18} className="text-slate-300" />
                  ) : (
                    <Circle size={18} className="text-primary fill-primary/20" />
                  )}
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold uppercase flex-shrink-0">
                  {i.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm truncate ${!i.read ? 'font-extrabold text-secondary' : 'font-semibold text-slate-700'}`}>
                      {i.name}
                    </p>
                    <span className="text-xs text-slate-400 truncate hidden sm:inline">· {i.email}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{i.message}</p>
                </div>
                <span className="text-[11px] text-slate-400 hidden md:flex items-center gap-1 flex-shrink-0">
                  <Clock size={11} /> {formatDate(i.date)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(i.id);
                  }}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
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
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message</p>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href={`mailto:${selected.email}`}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white text-center text-sm font-bold py-3 rounded-xl transition-colors"
                >
                  Reply by Email
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

export default Inquiries;
