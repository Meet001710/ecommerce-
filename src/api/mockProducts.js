const seed = [
  {
    id: 'p1',
    name: 'Wireless Headphones',
    price: 79.99,
    rating: 4.6,
    description:
      'Comfortable over-ear headphones with deep bass and all-day battery life.',
    imageUrl:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80',
    stock: 18,
    category: 'Audio',
  },
  {
    id: 'p2',
    name: 'Smart Watch Series 6',
    price: 129.0,
    rating: 4.4,
    description:
      'Track workouts, heart rate, and sleep with a bright always-on display.',
    imageUrl:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    stock: 25,
    category: 'Wearables',
  },
  {
    id: 'p3',
    name: 'Mechanical Keyboard',
    price: 99.5,
    rating: 4.7,
    description:
      'Tactile switches, hot-swappable design, and customizable per-key RGB.',
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    stock: 12,
    category: 'Accessories',
  },
  {
    id: 'p4',
    name: 'Gaming Mouse Pro',
    price: 49.99,
    rating: 4.3,
    description:
      'Ultra-light with precise tracking and programmable buttons.',
    imageUrl:
      'https://images.unsplash.com/photo-1587825140708-dfafc7b9c3f3?auto=format&fit=crop&w=800&q=80',
    stock: 30,
    category: 'Accessories',
  },
  {
    id: 'p5',
    name: 'Portable SSD 1TB',
    price: 109.99,
    rating: 4.5,
    description:
      'Fast USB-C portable storage for backups, photos, and projects.',
    imageUrl:
      'https://images.unsplash.com/photo-1629195512361-9275e3c6e8df?auto=format&fit=crop&w=800&q=80',
    stock: 9,
    category: 'Storage',
  },
  {
    id: 'p6',
    name: 'Ergonomic Office Chair',
    price: 189.99,
    rating: 4.2,
    description:
      'Supportive lumbar design with breathable mesh for long work sessions.',
    imageUrl:
      'https://images.unsplash.com/photo-1545244166-3d2a5e4b9b5d?auto=format&fit=crop&w=800&q=80',
    stock: 7,
    category: 'Home Office',
  },
];

export function getSeedProducts() {
  return seed;
}

const STORAGE_KEY = 'shopx_products_v1';

export function getProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return seed;
    return parsed;
  } catch {
    return seed;
  }
}

export function setProducts(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

