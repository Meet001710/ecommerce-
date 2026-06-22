import { Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import { CartButton } from './components/CartButton.jsx';

export default function App() {
  return (
    <div>
      <header className="app-header">
        <div className="app-brand">ShopX</div>
        <nav className="app-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : undefined)} end>
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            Products
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            Admin
          </NavLink>
        </nav>
        <div className="app-actions">
          <CartButton />
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<div style={{ padding: 24 }}>Page not found</div>} />
        </Routes>
      </main>

      <footer className="app-footer">© {new Date().getFullYear()} ShopX</footer>
    </div>
  );
}

