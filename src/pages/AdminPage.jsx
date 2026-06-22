import { useEffect, useMemo, useState } from 'react';
import { getProducts, setProducts } from '../api/mockProducts.js';

export default function AdminPage() {
  const [products, setLocalProducts] = useState([]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    price: '',
    rating: '4.5',
    stock: '10',
    category: 'Accessories',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    setLocalProducts(getProducts());
  }, []);

  const totalValue = useMemo(() => {
    return products.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
  }, [products]);

  function addProduct() {
    const price = Number(form.price);
    const rating = Number(form.rating);
    const stock = Number(form.stock);
    if (!form.id.trim() || !form.name.trim() || !Number.isFinite(price) || !Number.isFinite(stock)) return;

    const next = [
      ...products,
      {
        id: form.id.trim(),
        name: form.name.trim(),
        price,
        rating: Number.isFinite(rating) ? rating : 4.5,
        stock,
        category: form.category || 'Accessories',
        description: form.description || '—',
        imageUrl:
          form.imageUrl ||
          'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=80',
      },
    ];

    setProducts(next);
    setLocalProducts(next);
    setForm({
      id: '',
      name: '',
      price: '',
      rating: '4.5',
      stock: '10',
      category: 'Accessories',
      description: '',
      imageUrl: '',
    });
  }

  function updateStock(id, stock) {
    const next = products.map((p) => (p.id === id ? { ...p, stock: Number(stock) || 0 } : p));
    setProducts(next);
    setLocalProducts(next);
  }

  function removeProduct(id) {
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    setLocalProducts(next);
  }

  return (
    <div className="container">
      <div className="page-head">
        <h2>Admin (Mock)</h2>
        <div className="subtle">{products.length} products • Sum of prices: ${totalValue.toFixed(2)}</div>
      </div>

      <div className="admin">
        <div className="card">
          <h3>Add product</h3>
          <div className="grid2">
            <div className="field">
              <label>ID</label>
              <input className="input" value={form.id} onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))} />
            </div>
            <div className="field">
              <label>Name</label>
              <input className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="field">
              <label>Price</label>
              <input className="input" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
            </div>
            <div className="field">
              <label>Stock</label>
              <input className="input" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} />
            </div>
            <div className="field">
              <label>Rating</label>
              <input className="input" value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))} />
            </div>
            <div className="field">
              <label>Category</label>
              <input className="input" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <label>Description</label>
              <input
                className="input"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <label>Image URL</label>
              <input
                className="input"
                value={form.imageUrl}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
              />
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={addProduct}>
            Add
          </button>
          <div className="hint">Stored in localStorage. Refreshing keeps your changes.</div>
        </div>

        <div className="card">
          <h3>Products</h3>
          <div className="admin-table">
            {products.map((p) => (
              <div key={p.id} className="admin-row">
                <div className="admin-left">
                  <img className="admin-img" src={p.imageUrl} alt={p.name} />
                  <div>
                    <div className="admin-name">{p.name}</div>
                    <div className="admin-sub">{p.id} • ${p.price.toFixed(2)}</div>
                    <div className="admin-sub">⭐ {p.rating.toFixed(1)} • {p.category}</div>
                  </div>
                </div>
                <div className="admin-right">
                  <div className="field-inline">
                    <label>Stock</label>
                    <input
                      className="input"
                      value={p.stock}
                      onChange={(e) => updateStock(p.id, e.target.value)}
                    />
                  </div>
                  <button type="button" className="link-btn" onClick={() => removeProduct(p.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

