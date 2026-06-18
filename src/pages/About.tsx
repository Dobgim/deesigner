import React, { useEffect, useRef } from 'react';
import { Shield, Award, CheckCircle2, DollarSign, Clock, HelpCircle, Lock } from 'lucide-react';
import { animateFadeIn } from '../lib/gsap-config';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll('.animate-section');
      sections.forEach((sec, idx) => {
        animateFadeIn(sec as HTMLElement, 'up', idx * 0.1, 1);
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col w-full bg-[#f8f0f0]">
      
      {/* Header Banner */}
      <section className="bg-secondary text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">About ModulerContainerHub</h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Learn more about our mission, our standards of quality, and our commitment to security.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white animate-section">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left flex flex-col gap-6">
            <span className="text-primary font-bold text-xs uppercase tracking-wider">Who We Are</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary tracking-tight">
              A Global Leader in Modular Structures
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              At **ModulerContainerHub**, we believe that space shouldn't be a constraint to business growth or comfortable living. We specialize in designing, equipping, and delivering turn-key prefabricated container buildings, portable office cabins, storage blocks, and security kiosks.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              By controlling the layout configuration, electrical pre-installation, insulation, and regional structural compliance entirely in our workshops, we cut out construction delays and logistics jank. Our clients get structures delivered to their sites ready for immediate operation.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800"
              alt="Shipping container facility"
              className="rounded-3xl shadow-lg w-full h-[350px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section id="values" className="py-20 bg-slate-50 border-y border-slate-100 animate-section">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex flex-col gap-4 mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-wider">Our Core Values</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary tracking-tight">
              Built on Trust and Real-World Durability
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              We stand by our products. Every module is manufactured with rigorous quality-control checks to ensure optimal ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            
            {/* Value 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Award size={20} />
              </div>
              <h3 className="font-bold text-lg text-secondary">Premium Standard</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                All steel frames are galvanized and double-coated for resistance to rust, water logging, and heavy winds.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Clock size={20} />
              </div>
              <h3 className="font-bold text-lg text-secondary">Rapid Deployment</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                We deliver units on site in weeks, not months. Pre-fitted systems mean plug-and-play operation.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <DollarSign size={20} />
              </div>
              <h3 className="font-bold text-lg text-secondary">Rent Drainage Elimination</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Own your infrastructure. Eliminate recurring monthly lease bills that drain operational cash flow.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-bold text-lg text-secondary">Regional Compliance</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                We design and adapt internal electrical grids, load bearing specs, and safety systems to meet regional codes.
              </p>
            </div>

            {/* Value 5 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Shield size={20} />
              </div>
              <h3 className="font-bold text-lg text-secondary">Security & Protection</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Integrated heavy lockboxes, anti-vandal panels, and solid security locks ensure peace of mind.
              </p>
            </div>

            {/* Value 6 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <HelpCircle size={20} />
              </div>
              <h3 className="font-bold text-lg text-secondary">Flexible Solutions</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                From 10ft guard shacks to multi-bedroom modular homes, we customize configurations as needed.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Privacy Policy */}
      <section id="privacy" className="py-20 bg-white animate-section">
        <div className="max-w-4xl mx-auto px-4 text-left">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-primary" size={24} />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary tracking-tight">Privacy & Cookie Policy</h2>
          </div>
          <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed flex flex-col gap-4">
            <p>
              At **ModulerContainerHub**, we value and respect your privacy. This Privacy Policy details how we collect, store, use, and secure personal information provided when visiting our website or submitting quote inquiries.
            </p>
            <h4 className="font-bold text-slate-800 text-base mt-4">1. Information Collection</h4>
            <p>
              We collect personal contact details (such as your name, email, phone number, and organization name) only when explicitly provided by you through our Contact and Quote request forms. This information is used strictly to draft purchase proposals and arrange shipping.
            </p>
            <h4 className="font-bold text-slate-800 text-base mt-4">2. Cookies & Analytics</h4>
            <p>
              Our website uses basic cookies to optimize page loading, remember selected products, and gather non-identifiable analytics regarding visitor traffic to improve our layout and responsiveness. You can disable cookies in your browser settings if desired.
            </p>
            <h4 className="font-bold text-slate-800 text-base mt-4">3. Data Sharing & Security</h4>
            <p>
              We **never** sell, rent, or lease your contact information or details to third-party advertisers. All customer data is secured behind encrypted firewalls and accessed only by authorized managers coordinating product delivery.
            </p>
            <p className="mt-4 text-slate-400 text-xs">
              Last updated: June 18, 2026. For inquiries regarding data protection, please contact info@modulercontainerhub.com.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
