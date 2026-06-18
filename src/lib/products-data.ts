export interface Product {
  id: string;
  name: string;
  category: 'Portable Container Homes' | 'Office Cabin' | 'Sanitation & Toilet Containers' | 'Storage Containers' | 'Used Containers';
  price: string;
  priceNum: number;
  specs: {
    size: string;
    material: string;
    insulation?: string;
    features?: string[];
  };
  description: string;
  image: string;
  secondaryImage?: string;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'modulux-40',
    name: 'ModuLux 40 Turnkey Modular Home',
    category: 'Portable Container Homes',
    price: '$19,900',
    priceNum: 19900,
    specs: {
      size: '40ft × 8ft × 9.5ft (High Cube)',
      material: 'Reinforced Corten Steel',
      insulation: '100mm Spray Foam (R-28)',
      features: ['Turnkey finish', 'Double glazed windows', 'Fully fitted kitchen & bathroom', 'Laminated flooring', 'Pre-wired electricals']
    },
    description: 'Fully finished, ready-to-move-in container home. Built with premium materials for maximum comfort and durability, including a kitchen, bathroom, and bedroom.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'modular-home-40',
    name: '40-ft Modular Container Home',
    category: 'Portable Container Homes',
    price: '$18,200',
    priceNum: 18200,
    specs: {
      size: '40ft × 8ft × 8.5ft (Standard)',
      material: 'Structural Steel Frame',
      insulation: '80mm Rockwool Insulation',
      features: ['Open-plan studio layout', 'Full wiring and plumbing', 'Sliding glass patio door', 'LED lighting', 'Shower room']
    },
    description: 'Stunning 40-foot container studio home with glass sliding doors, optimal insulation, and pre-fitted utility hookups.',
    image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ready-home-35',
    name: 'Move-in-Ready Modular Home (35ft × 10ft)',
    category: 'Portable Container Homes',
    price: '$16,500',
    priceNum: 16500,
    specs: {
      size: '35ft × 10ft × 9.5ft',
      material: 'Corten Steel Panels',
      insulation: 'Polyurethane Sandwich Panels',
      features: ['Expanded width for comfort', 'Fitted bathroom & kitchenette', 'Bedroom partition', 'Dual HVAC system', 'Vapor barrier']
    },
    description: 'An expanded-width container home offering extra living space, comfortable partitions, and turnkey utility sets.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'modular-home-30',
    name: '30-ft Modular Container Home',
    category: 'Portable Container Homes',
    price: '$15,500',
    priceNum: 15500,
    specs: {
      size: '30ft × 8ft × 9.5ft',
      material: 'Corten Steel Body',
      insulation: 'EPS Sandwich Panels',
      features: ['Compact design', 'Ready-to-use bathroom', 'Laminated interior walls', 'Vinyl tile floors']
    },
    description: 'Highly efficient, compact modular living space. Delivers all essential amenities and standard structural compliance.',
    image: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'office-kiosk-compact',
    name: 'Compact Modular Container Office / Kiosk',
    category: 'Office Cabin',
    price: '$4,200',
    priceNum: 4200,
    specs: {
      size: '10ft × 8ft × 8.5ft',
      material: 'Galvanized Steel Frame',
      insulation: '50mm Rockwool Insulation',
      features: ['Serving counter window', 'Lockable steel door', 'External power inlet', 'Fitted desks']
    },
    description: 'Perfect for commercial ticket booths, coffee bars, security checkpoints, or mini field offices.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'toilet-block-16',
    name: '16ft × 9ft Anti-Vandal 3+1 Site Toilet Block',
    category: 'Sanitation & Toilet Containers',
    price: '$7,000',
    priceNum: 7000,
    specs: {
      size: '16ft × 9ft × 8.5ft',
      material: 'Heavy-Gauge Anti-Vandal Steel',
      features: ['3 Male Toilets + Urinals', '1 Female Toilet', 'Hot water hand heaters', 'Non-slip vinyl flooring', 'Anti-vandal steel mirrors']
    },
    description: 'Heavy duty, secure, and sanitary portable toilet cabin built for high-traffic construction sites or events.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'jackleg-cabin-10',
    name: '10ft × 10ft Jackleg Cabin with A/C',
    category: 'Office Cabin',
    price: '$3,985',
    priceNum: 3985,
    specs: {
      size: '10ft × 10ft × 8.5ft',
      material: 'Plastisol Coated Steel',
      insulation: 'Foil-backed mineral wool',
      features: ['Pre-installed A/C unit', 'Double sockets', 'Fluorescent lighting', 'Adjustable jacklegs for levelling']
    },
    description: 'Highly versatile, stackable cabin featuring adjustable height jacklegs and integrated air conditioning unit.',
    image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'shipping-container-40-open',
    name: '40ft High Cube Full Open Side Shipping Container',
    category: 'Storage Containers',
    price: '$1,700',
    priceNum: 1700,
    specs: {
      size: '40ft × 8ft × 9.5ft',
      material: 'Corten Steel panels',
      features: ['Full side opening doors', 'Heavy load timber floor', 'Wind and water tight', 'Lockbox for security']
    },
    description: 'Storage container featuring full side opening doors for loading long cargo, pipes, or machinery easily.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'mini-turnkey-unit',
    name: 'Mini Modular Turnkey Container Unit',
    category: 'Office Cabin',
    price: '$5,600',
    priceNum: 5600,
    specs: {
      size: '15ft × 8ft × 8.5ft',
      material: 'Steel Frame & PVC Panels',
      insulation: 'Glass wool insulation',
      features: ['Ready-to-use', 'Insulated walls & roof', 'Fitted workspace', 'Sliding window']
    },
    description: 'Compact turnkey unit for backyard workspaces, gatehouses, guard kiosks, or remote sales offices.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'storage-container-10',
    name: '10ft Heavy Duty Storage Container',
    category: 'Storage Containers',
    price: '$2,100',
    priceNum: 2100,
    specs: {
      size: '10ft × 8ft × 8.5ft',
      material: 'Corten Steel Panels',
      features: ['Wind and water tight', 'Double locking bars', 'Perfect for small sites']
    },
    description: 'Compact storage container, ideal for sites with limited space. Weatherproof and highly secure.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'used-container-40',
    name: 'Used 40ft High Cube Container (Cargo Worthy)',
    category: 'Used Containers',
    price: '$1,800',
    priceNum: 1800,
    specs: {
      size: '40ft × 8ft × 9.5ft',
      material: 'Corten Steel',
      features: ['Wind & water tight', 'Inspected structure', 'Forklift pockets', 'Plywood floor']
    },
    description: 'Cost-effective, structurally sound used high cube containers. Inspected and certified cargo-worthy.',
    image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'double-door-20',
    name: 'New 20ft Double Door Container',
    category: 'Storage Containers',
    price: '$1,999',
    priceNum: 1999,
    specs: {
      size: '20ft × 8ft × 8.5ft',
      material: 'Corten Steel',
      features: ['Doors on both ends', 'Easy access from two sides', 'Lockboxes pre-fitted']
    },
    description: 'Brand new 20-foot shipping container with full-opening double doors at both ends for convenient loading.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800'
  }
];
