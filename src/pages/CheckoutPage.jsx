import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCart, getCart } from '../api/cart.js';
import { getProducts } from '../api/mockProducts.js';

export default function CheckoutPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCartState] = useState({ items: [] });
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [placed, setPlaced] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(getProducts());
    setCartState(getCart());
  }, []);

  const lines = useMemo(() => {
    return cart.items
      .map((i) => {
        const product = products.find((p) => p.id === i.productId);
        if (!product) return null;
        return {
          ...i,
          product,
          lineTotal: product.price * i.quantity,
        };
      })
      .filter(Boolean);
  }, [cart.items, products]);

  const total = lines.reduce((sum, l) => sum + l.lineTotal, 0);

  function placeOrder() {
    if (lines.length === 0) return;
    setPlaced(true);
    clearCart();
    setTimeout(() => navigate('/'), 1200);
  }

  return (
    <div className="container">
      <div className="page-head">
        <h2>Checkout</h2>
      </div>

      {lines.length === 0 ? (
        <div className="empty">Nothing to checkout. Go back to <button className="link-btn" onClick={() => navigate('/products')}>Products</button>.</div>
      ) : (
        <div className="checkout">
          <div className="checkout-form">
            <div className="card">
              <h3>Shipping details</h3>
              <div className="field">
                <label>Name</label>
                <input
                  className="input"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="John Doe"
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  className="input"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="john@example.com"
                />
              </div>
              <div className="field">
                <label>Address</label>
                <input
                  className="input"
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  placeholder="123 Main St"
                />
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={placeOrder}
                disabled={placed || !form.name.trim() || !form.email.trim() || !form.address.trim()}
              >
                {placed ? 'Order placed!' : `Pay $${total.toFixed(2)}`}
              </button>
              <div className="hint">Mock checkout: no payment is processed.</div>
            </div>
          </div>

          <div className="checkout-summary">
            <div className="card">
              <h3>Order summary</h3>
              {lines.map((l) => (
                <div key={l.productId} className="summary-line">
                  <div>
                    <div className="summary-title">{l.product.name}</div>
                    <div className="summary-sub">Qty {l.quantity}</div>
                  </div>
                  <div className="summary-price">${l.lineTotal.toFixed(2)}</div>
                </div>
              ))}
              <div className="summary-row total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

