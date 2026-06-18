import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowUpDown } from 'lucide-react';
import { PRODUCTS_DATA } from '../lib/products-data';
import type { Product } from '../lib/products-data';
import { animateStaggeredFadeIn } from '../lib/gsap-config';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    'All',
    'Portable Container Homes',
    'Office Cabin',
    'Sanitation & Toilet Containers',
    'Storage Containers',
    'Used Containers'
  ];

  // Sync category state with query params
  useEffect(() => {
    const categoryFromQuery = searchParams.get('category');
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);
    } else {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = PRODUCTS_DATA.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.priceNum - b.priceNum);
    } else if (sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.priceNum - a.priceNum);
    }

    setProducts(filtered);
  }, [searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.product-card');
      if (cards.length) {
        animateStaggeredFadeIn(Array.from(cards) as HTMLElement[], 'up', 0.08);
      }
    }
  }, [products]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div ref={containerRef} className="flex flex-col w-full bg-[#f8f0f0]">
      
      {/* Banner */}
      <section className="bg-secondary text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Products Catalog</h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Browse our wide selection of new, modified, and used containers. Find detailed specs and pricing.
          </p>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 w-full">
        
        {/* Filters Top Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-6 mb-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by container type, specs, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 text-sm pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
              <ArrowUpDown size={16} className="text-slate-400" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-slate-50 text-slate-700 text-sm px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary transition-all cursor-pointer"
              >
                <option value="default">Default Sorting</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 product-card"
              >
                {/* Image Wrap */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      product.secondaryImage ? 'group-hover:opacity-0 absolute inset-0' : ''
                    }`}
                  />
                  {product.secondaryImage && (
                    <img
                      src={product.secondaryImage}
                      alt={`${product.name} alternate`}
                      className="w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-105 opacity-0 group-hover:opacity-100 absolute inset-0"
                    />
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                    {product.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow text-left gap-4">
                  <h3 className="font-extrabold text-lg text-secondary leading-snug group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-black text-2xl">
                      {product.price}
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded border border-emerald-100">
                      In Stock
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  {/* Specifications Card */}
                  <div className="bg-slate-50 p-4 rounded-2xl flex flex-col gap-2 text-[11px] text-slate-600 border border-slate-200/50 mt-2">
                    <span className="font-bold text-secondary uppercase tracking-wider text-[10px] border-b border-slate-200 pb-1.5 mb-1 block">
                      Specifications
                    </span>
                    <div className="flex justify-between border-b border-slate-200/40 pb-1">
                      <span className="font-medium text-slate-500">Dimensions:</span>
                      <span className="text-slate-700 font-semibold">{product.specs.size}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/40 pb-1">
                      <span className="font-medium text-slate-500">Shell Material:</span>
                      <span className="text-slate-700 font-semibold">{product.specs.material}</span>
                    </div>
                    {product.specs.insulation && (
                      <div className="flex justify-between border-b border-slate-200/40 pb-1">
                        <span className="font-medium text-slate-500">Thermal Insulation:</span>
                        <span className="text-slate-700 font-semibold">{product.specs.insulation}</span>
                      </div>
                    )}
                    {product.specs.features && (
                      <div className="flex flex-col gap-1 pt-1.5">
                        <span className="font-medium text-slate-500">Key Additions:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.specs.features.slice(0, 3).map((feat, idx) => (
                            <span key={idx} className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[10px] text-slate-500 font-medium">
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action button */}
                  <div className="mt-auto pt-4 flex gap-2">
                    <Link
                      to={`/quote?product=${encodeURIComponent(product.name)}`}
                      className="w-full bg-primary hover:bg-primary-dark text-white text-center text-sm font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 block"
                    >
                      Request Quote Proposal
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl py-20 border border-slate-100 text-center max-w-lg mx-auto shadow-sm flex flex-col gap-4">
            <div className="text-slate-300 w-16 h-16 mx-auto flex items-center justify-center border-4 border-dashed border-slate-200 rounded-full text-2xl font-black">
              ?
            </div>
            <h3 className="font-extrabold text-lg text-secondary">No Products Found</h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">
              We couldn't find any containers matching your exact criteria. Try resetting filters or using a broader query.
            </p>
            <div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  searchParams.delete('category');
                  setSearchParams(searchParams);
                }}
                className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-2.5 rounded-xl transition-all"
              >
                Reset Search Filters
              </button>
            </div>
          </div>
        )}

      </section>

    </div>
  );
};

export default Products;
