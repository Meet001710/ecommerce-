import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../api/mockProducts.js';
import { addToCart } from '../api/cart.js';

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const product = useMemo(() => products.find((p) => p.id === productId), [products, productId]);

  if (!product) {
    return (
      <div className="container">
        <div className="empty">
          Product not found. <Link to="/products">Back to products</Link>
        </div>
      </div>
    );
  }

  const maxQty = product.stock ?? 99;
  const safeQty = Math.min(Math.max(Number(qty) || 1, 1), maxQty);

  function onAdd() {
    addToCart(product.id, safeQty);
    navigate('/cart');
  }

  return (
    <div className="container">
      <div className="details">
        <div className="details-imgWrap">
          <img className="details-img" src={product.imageUrl} alt={product.name} />
        </div>
        <div className="details-info">
          <div className="breadcrumbs">
            <Link to="/products">Products</Link> / <span>{product.name}</span>
          </div>
          <h2>{product.name}</h2>
          <div className="details-sub">
            <span>⭐ {product.rating.toFixed(1)}</span>
            <span>•</span>
            <span>Category: {product.category}</span>
          </div>
          <div className="details-price">${product.price.toFixed(2)}</div>
          <p className="details-desc">{product.description}</p>
          <div className="details-stock">In stock: {product.stock}</div>

          <div className="details-actions">
            <div className="qty-row">
              <label>Quantity</label>
              <input
                className="input"
                value={safeQty}
                inputMode="numeric"
                onChange={(e) => setQty(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onAdd}
              disabled={product.stock <= 0}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

