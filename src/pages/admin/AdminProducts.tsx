import React, { useEffect, useMemo, useState } from 'react';
import {
  Package,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  RotateCcw,
  ImageOff,
} from 'lucide-react';
import {
  getProducts,
  upsertProduct,
  deleteProduct,
  resetProductsToDefault,
  formatPrice,
  makeId,
} from '../../lib/store';
import type { Product } from '../../lib/products-data';

const CATEGORIES: Product['category'][] = [
  'Portable Container Homes',
  'Office Cabin',
  'Sanitation & Toilet Containers',
  'Storage Containers',
  'Used Containers',
];

interface FormState {
  id: string;
  name: string;
  category: Product['category'];
  priceNum: number;
  size: string;
  material: string;
  insulation: string;
  features: string; // comma separated
  description: string;
  image: string;
  secondaryImage: string;
}

const emptyForm: FormState = {
  id: '',
  name: '',
  category: 'Portable Container Homes',
  priceNum: 0,
  size: '',
  material: '',
  insulation: '',
  features: '',
  description: '',
  image: '',
  secondaryImage: '',
};

const productToForm = (p: Product): FormState => ({
  id: p.id,
  name: p.name,
  category: p.category,
  priceNum: p.priceNum,
  size: p.specs.size,
  material: p.specs.material,
  insulation: p.specs.insulation ?? '',
  features: (p.specs.features ?? []).join(', '),
  description: p.description,
  image: p.image,
  secondaryImage: p.secondaryImage ?? '',
});

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | Product['category']>('All');
  const [editing, setEditing] = useState<FormState | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reload = () => setProducts(getProducts());

  useEffect(() => {
    reload();
    window.addEventListener('mch-store-change', reload);
    return () => window.removeEventListener('mch-store-change', reload);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  const openNew = () => {
    setErrors({});
    setEditing({ ...emptyForm });
  };

  const openEdit = (p: Product) => {
    setErrors({});
    setEditing(productToForm(p));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this product from the catalog?')) deleteProduct(id);
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Reset the entire catalog back to the default products? This removes any custom products and edits.'
      )
    ) {
      resetProductsToDefault();
    }
  };

  const validate = (f: FormState): boolean => {
    const e: Record<string, string> = {};
    if (!f.name.trim()) e.name = 'Name is required';
    if (!f.size.trim()) e.size = 'Size is required';
    if (!f.material.trim()) e.material = 'Material is required';
    if (!f.description.trim()) e.description = 'Description is required';
    if (!f.image.trim()) e.image = 'Image URL is required';
    if (f.priceNum <= 0) e.priceNum = 'Enter a valid price';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!editing || !validate(editing)) return;
    const { price, priceNum } = formatPrice(editing.priceNum);
    const product: Product = {
      id: editing.id || makeId(editing.name),
      name: editing.name.trim(),
      category: editing.category,
      price,
      priceNum,
      specs: {
        size: editing.size.trim(),
        material: editing.material.trim(),
        ...(editing.insulation.trim() ? { insulation: editing.insulation.trim() } : {}),
        ...(editing.features.trim()
          ? { features: editing.features.split(',').map((x) => x.trim()).filter(Boolean) }
          : {}),
      },
      description: editing.description.trim(),
      image: editing.image.trim(),
      ...(editing.secondaryImage.trim() ? { secondaryImage: editing.secondaryImage.trim() } : {}),
    };
    upsertProduct(product);
    setEditing(null);
  };

  const set = (key: keyof FormState, value: string | number) =>
    setEditing((prev) => (prev ? { ...prev, [key]: value } : prev));

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-secondary tracking-tight flex items-center gap-2">
            <Package className="text-primary" /> Products Catalog
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Add, edit, or remove products. Changes appear instantly on the public site.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <RotateCcw size={16} /> Reset
          </button>
          <button
            onClick={openNew}
            className="flex items-center gap-2 text-sm font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-slate-50 border border-slate-200 text-sm pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as 'All' | Product['category'])}
          className="bg-slate-50 border border-slate-200 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-primary cursor-pointer"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 py-16 text-center text-slate-400 flex flex-col items-center gap-3">
          <Package size={40} className="text-slate-300" />
          <p className="text-sm">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="h-40 bg-slate-100 relative">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <ImageOff size={28} />
                  </div>
                )}
                <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {p.category}
                </span>
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-bold text-secondary text-sm leading-snug line-clamp-2">{p.name}</h3>
                <p className="text-primary font-black text-lg">{p.price}</p>
                <p className="text-xs text-slate-500 line-clamp-2">{p.description}</p>
                <div className="flex gap-2 mt-auto pt-3">
                  <button
                    onClick={() => openEdit(p)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-secondary bg-slate-100 hover:bg-slate-200 py-2.5 rounded-xl transition-colors"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center px-4 py-8 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 my-auto">
            <div className="bg-secondary px-6 py-5 flex items-center justify-between rounded-t-3xl sticky top-0">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Package size={18} className="text-primary" />
                {editing.id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setEditing(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-6 flex flex-col gap-4">
              <Field label="Product Name *" error={errors.name}>
                <input
                  value={editing.name}
                  onChange={(e) => set('name', e.target.value)}
                  className={inputCls(errors.name)}
                  placeholder="e.g. 40ft Modular Container Home"
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Category">
                  <select
                    value={editing.category}
                    onChange={(e) => set('category', e.target.value)}
                    className={`${inputCls()} cursor-pointer`}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Price (USD) *" error={errors.priceNum}>
                  <input
                    type="number"
                    value={editing.priceNum || ''}
                    onChange={(e) => set('priceNum', Number(e.target.value))}
                    className={inputCls(errors.priceNum)}
                    placeholder="19900"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Size / Dimensions *" error={errors.size}>
                  <input
                    value={editing.size}
                    onChange={(e) => set('size', e.target.value)}
                    className={inputCls(errors.size)}
                    placeholder="40ft × 8ft × 9.5ft"
                  />
                </Field>
                <Field label="Material *" error={errors.material}>
                  <input
                    value={editing.material}
                    onChange={(e) => set('material', e.target.value)}
                    className={inputCls(errors.material)}
                    placeholder="Reinforced Corten Steel"
                  />
                </Field>
              </div>

              <Field label="Insulation (optional)">
                <input
                  value={editing.insulation}
                  onChange={(e) => set('insulation', e.target.value)}
                  className={inputCls()}
                  placeholder="100mm Spray Foam (R-28)"
                />
              </Field>

              <Field label="Key Features (comma separated)">
                <input
                  value={editing.features}
                  onChange={(e) => set('features', e.target.value)}
                  className={inputCls()}
                  placeholder="Turnkey finish, Double glazed windows, Fitted kitchen"
                />
              </Field>

              <Field label="Description *" error={errors.description}>
                <textarea
                  rows={3}
                  value={editing.description}
                  onChange={(e) => set('description', e.target.value)}
                  className={`${inputCls(errors.description)} resize-y`}
                  placeholder="Short marketing description shown on the product card..."
                />
              </Field>

              <Field label="Image URL *" error={errors.image}>
                <input
                  value={editing.image}
                  onChange={(e) => set('image', e.target.value)}
                  className={inputCls(errors.image)}
                  placeholder="https://images.unsplash.com/..."
                />
              </Field>

              <Field label="Secondary Image URL (optional, shown on hover)">
                <input
                  value={editing.secondaryImage}
                  onChange={(e) => set('secondaryImage', e.target.value)}
                  className={inputCls()}
                  placeholder="https://images.unsplash.com/..."
                />
              </Field>

              {editing.image && (
                <img
                  src={editing.image}
                  alt="preview"
                  className="w-full h-40 object-cover rounded-2xl border border-slate-200"
                />
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex gap-3 sticky bottom-0 bg-white rounded-b-3xl">
              <button
                onClick={() => setEditing(null)}
                className="flex-1 py-3 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-md transition-colors"
              >
                {editing.id ? 'Save Changes' : 'Create Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const inputCls = (error?: string) =>
  `w-full bg-slate-50 border ${
    error ? 'border-red-300' : 'border-slate-200'
  } text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all`;

const Field: React.FC<{ label: string; error?: string; children: React.ReactNode }> = ({
  label,
  error,
  children,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{label}</label>
    {children}
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export default AdminProducts;
