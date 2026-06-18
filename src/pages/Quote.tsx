import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FileText, User, Mail, Phone, ShoppingBag, Plus, Minus, Send, CheckCircle2, X } from 'lucide-react';
import { PRODUCTS_DATA } from '../lib/products-data';
import confetti from 'canvas-confetti';

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  productName: string;
  quantity: number;
  message: string;
}

const Quote: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedProduct = searchParams.get('product') || '';

  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    productName: 'General Inquiry',
    quantity: 1,
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (preselectedProduct) {
      // Check if product exists in catalog
      const found = PRODUCTS_DATA.some(p => p.name === preselectedProduct);
      setFormData(prev => ({
        ...prev,
        productName: found ? preselectedProduct : 'General Inquiry'
      }));
    }
  }, [preselectedProduct]);

  const validate = (): boolean => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
    }
    if (formData.quantity < 1) tempErrors.quantity = 'Quantity must be at least 1';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof QuoteFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    setFormData(prev => {
      const val = type === 'inc' ? prev.quantity + 1 : Math.max(1, prev.quantity - 1);
      return { ...prev, quantity: val };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      const existing = localStorage.getItem('quote_requests');
      const requests = existing ? JSON.parse(existing) : [];
      requests.push({
        ...formData,
        date: new Date().toISOString(),
        id: Math.random().toString(36).substring(2, 9)
      });
      localStorage.setItem('quote_requests', JSON.stringify(requests));

      setIsSubmitting(false);
      setShowModal(true);

      // Trigger Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0b9f1a', '#076811', '#1e293b']
      });

      // Reset Form (except product name prefill)
      setFormData({
        name: '',
        email: '',
        phone: '',
        productName: 'General Inquiry',
        quantity: 1,
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full bg-[#f8f0f0]">
      
      {/* Banner */}
      <section className="bg-secondary text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Request a Quote</h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Specify container build details, customized add-ons, and quantities to receive an estimate.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 max-w-3xl mx-auto px-4 w-full">
        <div className="bg-white border border-slate-150 p-8 sm:p-12 rounded-3xl shadow-sm text-left">
          
          <div className="flex items-center gap-3 border-b border-slate-100 pb-6 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-secondary">Quote Specification Form</h3>
              <p className="text-slate-500 text-xs mt-0.5">Fill in your specifications below to receive a formal quotation.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Grid Name / Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <User size={14} className="text-slate-400" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Joshua Dobgima"
                  className={`bg-slate-50 border ${errors.name ? 'border-red-300' : 'border-slate-200'} text-slate-800 text-sm px-4 py-3.5 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all`}
                />
                {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail size={14} className="text-slate-400" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. josh@example.com"
                  className={`bg-slate-50 border ${errors.email ? 'border-red-300' : 'border-slate-200'} text-slate-800 text-sm px-4 py-3.5 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all`}
                />
                {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
              </div>

            </div>

            {/* Grid Phone / Product Select */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone size={14} className="text-slate-400" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +1 (123) 456-7890"
                  className="bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3.5 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
              </div>

              {/* Product Name Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <ShoppingBag size={14} className="text-slate-400" />
                  <span>Selected Container Build</span>
                </label>
                <select
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3.5 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry / Custom Layout</option>
                  {PRODUCTS_DATA.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Quantity Counter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Order Quantity Required
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleQuantityChange('dec')}
                  className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold transition-all border border-slate-200"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  readOnly
                  className="w-16 h-12 bg-slate-50 border border-slate-200 text-slate-800 text-center font-bold text-base rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => handleQuantityChange('inc')}
                  className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold transition-all border border-slate-200"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Message / Specifications */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Specify Dimensions, Site Conditions & Custom Fit-outs
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Mention any custom specifications such as door locations, double glass siding, interior walls, electrical board codes, paint finish, or shipping timelines..."
                className="bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3.5 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all resize-y"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Submit Quote Request</span>
                  <Send size={16} />
                </>
              )}
            </button>

          </form>

        </div>
      </section>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-secondary-dark/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-slate-100 text-center flex flex-col gap-6 animate-pulse-slow">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-100">
              <CheckCircle2 size={36} />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-extrabold text-xl text-secondary">Quote Request Submitted</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Thank you for your request. Our estimating managers will draft a customized proposal and contact you shortly.
              </p>
            </div>
            <div>
              <Link
                to="/products"
                onClick={() => setShowModal(false)}
                className="bg-secondary hover:bg-secondary-light text-white font-semibold py-2.5 px-6 rounded-xl transition-all inline-block text-sm"
              >
                Browse Other Products
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Quote;
