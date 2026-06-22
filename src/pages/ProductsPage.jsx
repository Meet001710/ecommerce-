import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../api/mockProducts.js';
import ProductCard from '../components/ProductCard.jsx';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchC = category === 'All' || p.category === category;
      return matchQ && matchC;
    });
  }, [products, query, category]);

  return (
    <div className="container">
      <div className="page-head">
        <h2>Products</h2>
        <div className="filters">
          <input
            className="input"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 ? <div className="empty">No products found.</div> : null}
    </div>
  );
}

