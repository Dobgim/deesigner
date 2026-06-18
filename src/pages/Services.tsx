import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Truck, Wrench, ShieldAlert, FileCheck, Landmark, ArrowRight, Check } from 'lucide-react';
import { animateFadeIn, animateStaggeredFadeIn } from '../lib/gsap-config';

interface ServiceItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  advantages: string[];
  benefits: string[];
}

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const servicesData: ServiceItem[] = [
    {
      id: 1,
      title: 'Supply of New and Used Containers',
      icon: <Container className="w-8 h-8" />,
      description: 'We offer a wide range of new and pre-owned shipping and storage containers in various sizes and configurations.',
      features: ['Standard sizes (20ft, 40ft, 45ft)', 'Inspected pre-owned containers', 'Weather-resistant steel construction'],
      advantages: ['Reliable and secure storage', 'Cost-effective price points', 'High load-bearing capacity'],
      benefits: ['Protected cargo/inventory', 'Flexible scaling of assets']
    },
    {
      id: 2,
      title: 'Worldwide Shipping & Delivery',
      icon: <Truck className="w-8 h-8" />,
      description: 'No matter where your site is located, we ensure fast, safe, and efficient delivery of your container structures.',
      features: ['Global logistics network', 'Customs clearance handling', 'Site drop-off coordinating'],
      advantages: ['Timely project launch', 'Hassle-free shipping documentation', 'Experienced cargo handlers'],
      benefits: ['Reduced delay costs', 'Peace of mind on transit']
    },
    {
      id: 3,
      title: 'Customized Container Solutions',
      icon: <Wrench className="w-8 h-8" />,
      description: 'Need a container adapted for a specialized purpose? We customize containers to match your layout and specs.',
      features: ['Refrigerated (reefer) systems', 'Windows, double-doors, shelving', 'Fitted electrical and HVAC grids'],
      advantages: ['Customized for specific operations', 'Pre-inspected electrical panels', 'Tailored layout optimization'],
      benefits: ['Maximized functional work area', 'Seamless utility hookups']
    },
    {
      id: 4,
      title: 'Rental and Leasing Options',
      icon: <Landmark className="w-8 h-8" />,
      description: 'For temporary storage, seasonal peaks, or short-term site projects, our leasing options are perfect.',
      features: ['Flexible monthly agreements', 'Zero massive upfront investments', 'Quick return policies'],
      advantages: ['Optimized capital expenditure', 'Easy scaling of facilities', 'Fast replacement options'],
      benefits: ['Ideal for temporary sites', 'Minimal cash-flow disruption']
    },
    {
      id: 5,
      title: 'Container Buy-Back Program',
      icon: <RotateBackIcon />,
      description: 'When your site project wraps up, we offer a fair and hassle-free buy-back program to buy back your structures.',
      features: ['Guaranteed valuation offers', 'Work-site pickup services', 'Fast wire payments'],
      advantages: ['Cash recovery on completion', 'No long-term storage overhead', 'Professional removal coordination'],
      benefits: ['Streamlined project wrap-up', 'Minimized asset depreciation']
    },
    {
      id: 6,
      title: 'Conversion Containers',
      icon: <ShieldAlert className="w-8 h-8" />,
      description: 'When standard brick-and-mortar builds are too slow or expensive, container conversions provide the optimal layout.',
      features: ['Acoustic insulation options', 'Wall partitions and restrooms', 'Heavy duty anti-vandal lockings'],
      advantages: ['Rapid deployment (weeks, not months)', 'Highly portable structure', 'Configurable desk spaces'],
      benefits: ['Fast site opening', 'Highly adaptive layouts']
    },
    {
      id: 7,
      title: 'Turnkey Modular Units',
      icon: <FileCheck className="w-8 h-8" />,
      description: 'Our turnkey modular units are fully completed, pre-insulated, and ready to plug-and-play immediately upon delivery.',
      features: ['Pre-installed plumbing', 'Integrated heating & cooling', 'Plastisol or wood-finish lining'],
      advantages: ['Zero site fit-out time', 'Single contract handling', 'Certified electrical safety boards'],
      benefits: ['Instant occupancy', 'Eliminates contractor management']
    }
  ];

  useEffect(() => {
    if (containerRef.current) {
      const title = containerRef.current.querySelector('.animate-title');
      const cards = containerRef.current.querySelectorAll('.service-card');
      if (title) animateFadeIn(title as HTMLElement, 'up', 0.1);
      if (cards.length) animateStaggeredFadeIn(Array.from(cards) as HTMLElement[], 'up', 0.1);
    }
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col w-full bg-[#f8f0f0]">
      
      {/* Banner */}
      <section className="bg-secondary text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Services</h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Professional container sales, leasing, conversions, and turnkey modular builds delivered worldwide.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto flex flex-col gap-4 mb-16 animate-title">
            <span className="text-primary font-bold text-xs uppercase tracking-wider">MODULERCONTAINERHUB SERVICES</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary tracking-tight">
              A Complete Suite of Industrial Container Solutions
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We combine durability, compliance, and innovation to deliver container structures that help you save time, reduce costs, and increase operational efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="group bg-slate-50 border border-slate-100 rounded-3xl p-8 text-left hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-6 service-card"
              >
                {/* Header Info */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xl text-secondary group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Features, Advantages, Benefits Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200/50">
                  {/* Features */}
                  <div>
                    <span className="text-slate-700 font-bold text-xs uppercase tracking-wider block mb-2">
                      Key Features
                    </span>
                    <ul className="flex flex-col gap-1.5 text-xs text-slate-500">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check size={12} className="text-primary flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Advantages / Benefits */}
                  <div>
                    <span className="text-slate-700 font-bold text-xs uppercase tracking-wider block mb-2">
                      Advantages & ROI
                    </span>
                    <ul className="flex flex-col gap-1.5 text-xs text-slate-500">
                      {service.advantages.concat(service.benefits).slice(0, 3).map((adv, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check size={12} className="text-primary flex-shrink-0" />
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-auto pt-4 flex justify-between items-center">
                  <Link
                    to="/quote"
                    className="text-primary hover:text-primary-dark font-extrabold text-sm flex items-center gap-1 group/link transition-colors"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight size={16} className="transform group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                  <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase bg-slate-200/50 px-2 py-0.5 rounded">
                    Service {service.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote section */}
      <section className="bg-secondary py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 flex flex-col gap-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Need a Custom Fit-out Container?</h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm leading-relaxed">
            Our fabrication shop is equipped with CNC sheet cutting, sandblasting chambers, thermal paint booths, and crane lifters to build exactly to your drawings.
          </p>
          <div>
            <Link
              to="/quote"
              className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 inline-block"
            >
              Get Custom Quote
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

// Simple custom rotation icon for Buy Back
const RotateBackIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="32"
    height="32"
    stroke="currentColor"
    strokeWidth="2.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8"
  >
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>
);

export default Services;
