import { NavLink } from 'react-router-dom';
import { getCartCount } from '../api/cart.js';
import { useEffect, useState } from 'react';

export function CartButton() {
  const [count, setCount] = useState(getCartCount());

  useEffect(() => {
    const onStorage = () => setCount(getCartCount());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <NavLink to="/cart" className="btn">
      Cart ({count})
    </NavLink>
  );
}

