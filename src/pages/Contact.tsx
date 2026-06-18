import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = (): boolean => {
    const tempErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message content is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API delivery
    setTimeout(() => {
      // Save to local storage
      const existing = localStorage.getItem('contact_inquiries');
      const inquiries = existing ? JSON.parse(existing) : [];
      inquiries.push({
        ...formData,
        date: new Date().toISOString(),
        id: Math.random().toString(36).substring(2, 9)
      });
      localStorage.setItem('contact_inquiries', JSON.stringify(inquiries));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Fire confetti celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#0b9f1a', '#076811', '#1e293b']
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full bg-[#f8f0f0]">
      
      {/* Banner */}
      <section className="bg-secondary text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contact Us</h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Reach out to our sales and customer support managers. We are ready to help.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div className="flex flex-col gap-3">
              <span className="text-primary font-bold text-xs uppercase tracking-wider">GET IN TOUCH</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary tracking-tight">
                We're Here to Help
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Connect with our modular architects and logistics managers to request pricing lists, customized CAD layouts, or transport estimates.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              
              {/* Phone Card */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="font-extrabold text-secondary text-base">Call / WhatsApp</h4>
                  <a href="https://wa.me/17156068445" className="text-slate-500 hover:text-primary transition-colors text-sm mt-1 block">
                    +1 (715) 606-8445
                  </a>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Mon - Sat: 8:00 AM - 6:00 PM PST</span>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="font-extrabold text-secondary text-base">Email Support</h4>
                  <a href="mailto:info@modulercontainerhub.com" className="text-slate-500 hover:text-primary transition-colors text-sm mt-1 block">
                    info@modulercontainerhub.com
                  </a>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Response within 24 business hours</span>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-extrabold text-secondary text-base">Corporate Headquarter</h4>
                  <p className="text-slate-500 text-sm mt-1">
                    1310 Esplanade, Redondo Beach, CA 90277
                  </p>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Visits by appointment only</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-150 p-8 sm:p-10 rounded-3xl shadow-sm text-left">
              <h3 className="font-extrabold text-xl text-secondary mb-6">Send Us a Message</h3>

              {submitSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-start gap-3 mb-6 animate-pulse-slow">
                  <CheckCircle2 className="text-emerald-600 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h5 className="font-bold text-sm">Message Sent Successfully!</h5>
                    <p className="text-xs text-emerald-700 mt-1">
                      Thank you for contacting ModulerContainerHub. A specialist will get back to you shortly.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`bg-slate-50 border ${errors.name ? 'border-red-300' : 'border-slate-200'} text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                      <AlertCircle size={12} /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Grid Email / Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`bg-slate-50 border ${errors.email ? 'border-red-300' : 'border-slate-200'} text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                        <AlertCircle size={12} /> {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>

                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Message Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`bg-slate-50 border ${errors.message ? 'border-red-300' : 'border-slate-200'} text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all resize-y`}
                    placeholder="Tell us about your project requirements or what container type you are looking for..."
                  />
                  {errors.message && (
                    <span className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                      <AlertCircle size={12} /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Google Maps Embed Section */}
      <section className="w-full h-[450px] bg-slate-200 relative overflow-hidden border-t border-slate-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.1593335552317!2d-118.39129598479068!3d33.83398918070267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b4bfaaa2cf51%3A0xc079cfcbbe0be697!2s1310%20Esplanade%2C%20Redondo%20Beach%2C%20CA%2090277!5e0!3m2!1sen!2sus!4v1655490000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="ModulerContainerHub CA Headquarter Location Map"
        ></iframe>
      </section>

    </div>
  );
};

export default Contact;
