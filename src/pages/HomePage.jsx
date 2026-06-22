import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container">
      <section className="hero">
        <div>
          <h1>ShopX Ecommerce</h1>
          <p>Mock products, fast UI, and a cart that persists in localStorage.</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">
              Browse products
            </Link>
            <Link to="/cart" className="btn">
              View cart
            </Link>
          </div>
        </div>
        <div className="hero-box">
          <div className="hero-badge">New arrivals</div>
          <div className="hero-sub">Built with React + React Router</div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">6+</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat">
              <div className="stat-num">Local</div>
              <div className="stat-label">Cart storage</div>
            </div>
            <div className="stat">
              <div className="stat-num">Admin</div>
              <div className="stat-label">Mock manage</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

