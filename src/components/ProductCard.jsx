import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <img className="product-img" src={product.imageUrl} alt={product.name} />
      <div className="product-meta">
        <div className="product-name">{product.name}</div>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <div className="product-rating">⭐ {product.rating.toFixed(1)}</div>
      </div>
    </Link>
  );
}

