import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../api/mockProducts.js';
import { clearCart, getCart, removeFromCart, setCartQuantity } from '../api/cart.js';
import QuantityStepper from '../components/QuantityStepper.jsx';

export default function CartPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCartState] = useState({ items: [] });
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(getProducts());
    setCartState(getCart());
  }, []);

  const cartLines = useMemo(() => {
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

  const subtotal = cartLines.reduce((sum, l) => sum + l.lineTotal, 0);

  function refresh() {
    setCartState(getCart());
    setProducts(getProducts());
  }

  function onCheckout() {
    if (cartLines.length === 0) return;
    navigate('/checkout');
  }

  return (
    <div className="container">
      <div className="page-head">
        <h2>Your cart</h2>
        <div className="head-actions">
          <button
            type="button"
            className="btn"
            onClick={() => {
              clearCart();
              refresh();
            }}
            disabled={cartLines.length === 0}
          >
            Clear
          </button>
        </div>
      </div>

      {cartLines.length === 0 ? (
        <div className="empty">
          Cart is empty. <Link to="/products">Go shopping</Link>
        </div>
      ) : (
        <div className="cart">
          <div className="cart-list">
            {cartLines.map((line) => (
              <div key={line.productId} className="cart-row">
                <img className="cart-img" src={line.product.imageUrl} alt={line.product.name} />
                <div className="cart-mid">
                  <Link className="cart-name" to={`/products/${line.productId}`}>
                    {line.product.name}
                  </Link>
                  <div className="cart-meta">${line.product.price.toFixed(2)} each</div>
                  <div className="cart-stepper">
                    <QuantityStepper
                      value={line.quantity}
                      min={1}
                      max={line.product.stock ?? 99}
                      onChange={(v) => {
                        setCartQuantity(line.productId, v);
                        refresh();
                      }}
                    />
                  </div>
                </div>
                <div className="cart-right">
                  <div className="cart-total">${line.lineTotal.toFixed(2)}</div>
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => {
                      removeFromCart(line.productId);
                      refresh();
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <button type="button" className="btn btn-primary" onClick={onCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

