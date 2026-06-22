const STORAGE_KEY = 'shopx_cart_v1';

export function getCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return { items: [] };
    return parsed;
  } catch {
    return { items: [] };
  }
}

export function setCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const idx = cart.items.findIndex((i) => i.productId === productId);
  if (idx >= 0) cart.items[idx].quantity += quantity;
  else cart.items.push({ productId, quantity });
  setCart(cart);
}

export function removeFromCart(productId) {
  const cart = getCart();
  cart.items = cart.items.filter((i) => i.productId !== productId);
  setCart(cart);
}

export function setCartQuantity(productId, quantity) {
  const cart = getCart();
  const qty = Math.max(0, Number(quantity) || 0);
  const idx = cart.items.findIndex((i) => i.productId === productId);
  if (idx < 0) {
    if (qty > 0) cart.items.push({ productId, quantity: qty });
  } else {
    if (qty <= 0) cart.items.splice(idx, 1);
    else cart.items[idx].quantity = qty;
  }
  setCart(cart);
}

export function clearCart() {
  setCart({ items: [] });
}

export function getCartCount() {
  const cart = getCart();
  return cart.items.reduce((sum, i) => sum + (i.quantity || 0), 0);
}

