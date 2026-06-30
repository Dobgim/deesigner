import { PRODUCTS_DATA } from './products-data';
import type { Product } from './products-data';

/**
 * Lightweight client-side data layer for the admin dashboard.
 * Since the site has no backend, everything is persisted to localStorage.
 * Public forms write `contact_inquiries` and `quote_requests`; the admin
 * reads/manages those plus a `mch_products` catalog seeded from PRODUCTS_DATA.
 */

const PRODUCTS_KEY = 'mch_products';
const INQUIRIES_KEY = 'contact_inquiries';
const QUOTES_KEY = 'quote_requests';

/** Notify listeners (e.g. open admin tabs) that a collection changed. */
const emitChange = () => {
  window.dispatchEvent(new Event('mch-store-change'));
};

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
  emitChange();
}

/* ----------------------------- Inquiries ----------------------------- */

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  read?: boolean;
}

export const getInquiries = (): Inquiry[] =>
  readJSON<Inquiry[]>(INQUIRIES_KEY, []).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

export const setInquiryRead = (id: string, read: boolean) => {
  const items = readJSON<Inquiry[]>(INQUIRIES_KEY, []).map((i) =>
    i.id === id ? { ...i, read } : i
  );
  writeJSON(INQUIRIES_KEY, items);
};

export const deleteInquiry = (id: string) => {
  const items = readJSON<Inquiry[]>(INQUIRIES_KEY, []).filter((i) => i.id !== id);
  writeJSON(INQUIRIES_KEY, items);
};

/* ------------------------------- Quotes ------------------------------ */

export type QuoteStatus = 'new' | 'in-progress' | 'completed';

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  productName: string;
  quantity: number;
  message: string;
  date: string;
  status?: QuoteStatus;
}

export const getQuotes = (): QuoteRequest[] =>
  readJSON<QuoteRequest[]>(QUOTES_KEY, []).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

export const setQuoteStatus = (id: string, status: QuoteStatus) => {
  const items = readJSON<QuoteRequest[]>(QUOTES_KEY, []).map((q) =>
    q.id === id ? { ...q, status } : q
  );
  writeJSON(QUOTES_KEY, items);
};

export const deleteQuote = (id: string) => {
  const items = readJSON<QuoteRequest[]>(QUOTES_KEY, []).filter((q) => q.id !== id);
  writeJSON(QUOTES_KEY, items);
};

/* ------------------------------ Products ----------------------------- */

/**
 * Products are seeded from the bundled catalog on first run, then become
 * fully editable through the admin. Public pages read from here too, so
 * admin edits are reflected on the live site.
 */
export const getProducts = (): Product[] => {
  const stored = readJSON<Product[] | null>(PRODUCTS_KEY, null);
  if (stored && Array.isArray(stored)) return stored;
  // Seed on first access
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS_DATA));
  return PRODUCTS_DATA;
};

export const saveProducts = (products: Product[]) => {
  writeJSON(PRODUCTS_KEY, products);
};

export const upsertProduct = (product: Product) => {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === product.id);
  if (idx >= 0) {
    products[idx] = product;
  } else {
    products.unshift(product);
  }
  saveProducts(products);
};

export const deleteProduct = (id: string) => {
  saveProducts(getProducts().filter((p) => p.id !== id));
};

export const resetProductsToDefault = () => {
  saveProducts(PRODUCTS_DATA);
};

/** Build a price string + numeric value from a raw number input. */
export const formatPrice = (value: number): { price: string; priceNum: number } => ({
  price: `$${Number(value || 0).toLocaleString('en-US')}`,
  priceNum: Number(value || 0),
});

export const makeId = (name: string): string =>
  `${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 30)}-${Math.random().toString(36).slice(2, 6)}`;
