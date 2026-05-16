/* =========================================================
   Catálogo · Streaming, Free Fire y Juegos
   Carrito + Cotización por WhatsApp (Vanilla JS)
   ========================================================= */

const WHATSAPP_NUMBER = '524779231683'; 
const CURRENCY = '$';

const PRODUCTS = [
  { id: 'stream-netflix-premium', category: 'streaming', name: 'Netflix Premium', price: 275.00, stock: 99, image: 'https://images.ctfassets.net/4cd45et68cgf/4nEB8vY3FaMkxE3SYX5vJU/91bac46b571243445d8005030227eedf/neflix_logo.png' },
  { id: 'stream-prime video-1m', category: 'streaming', name: 'Prime 6M', price: 75.00, stock: 0, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Amazon_Prime_Video_logo.svg/2560px-Amazon_Prime_Video_logo.svg.png' },
  { id: 'stream-spotify-1m', category: 'streaming', name: 'Spotify Premium 1M', price: 50.00, stock: 0, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png' },
  { id: 'stream-disney-1m', category: 'streaming', name: 'Disney+ 1M', price: 75.00, stock: 99, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/2560px-Disney%2B_logo.svg.png' },
  { id: 'stream-hbo-1m', category: 'streaming', name: 'HBO Max 1M', price: 75.00, stock: 6, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Max_logo.svg/1200px-Max_logo.svg.png' },
  { id: 'stream-paramount-1m', category: 'streaming', name: 'Paramount+ 1M', price: 35.00, stock: 0, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Paramount%2B_logo.svg/2560px-Paramount%2B_logo.svg.png' },
  { id: 'stream-vix-1m', category: 'streaming', name: 'Vix Premium 1M', price: 40.00, stock: 99, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/ViX_logo.svg/1200px-ViX_logo.svg.png' },
  { id: 'stream-youtube-1m', category: 'streaming', name: 'YouTube Premium 1M', price: 60.00, stock: 0, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/YouTube_Premium_logo.svg/1280px-YouTube_Premium_logo.svg.png' },
  { id: 'ff-100', category: 'freefire', name: '110 Diamantes', price: 16.00, stock: 99, image: 'https://garena.com/garena_cms/image/e8fc0cf02d2da079f2fe7b973e4da664.png' },
  { id: 'ff-310', category: 'freefire', name: '341 Diamantes', price: 45.00, stock: 99, image: 'https://garena.com/garena_cms/image/e8fc0cf02d2da079f2fe7b973e4da664.png' },
  { id: 'ff-520', category: 'freefire', name: '572 Diamantes', price: 80.00, stock: 99, image: 'https://garena.com/garena_cms/image/e8fc0cf02d2da079f2fe7b973e4da664.png' },
  { id: 'ff-1060', category: 'freefire', name: '1116 Diamantes', price: 155.00, stock: 99, image: 'https://garena.com/garena_cms/image/e8fc0cf02d2da079f2fe7b973e4da664.png' },
  { id: 'ff-2180', category: 'freefire', name: '2398 Diamantes', price: 280.00, stock: 99, image: 'https://garena.com/garena_cms/image/e8fc0cf02d2da079f2fe7b973e4da664.png' },
  { id: 'ff-6168', category: 'freefire', name: '6168 Diamantes', price: 650.00, stock: 99, image: 'https://garena.com/garena_cms/image/e8fc0cf02d2da079f2fe7b973e4da664.png' },
  { id: 'ff-pase-mensual', category: 'freefire', name: 'Tarjeta Mensual', price: 0.00, stock: 0, image: 'https://img.icons8.com/fluency/48/000000/membership-card.png' },
  { id: 'ff-tarjeta-semanal', category: 'freefire', name: 'Tarjeta Semanal', price: 0.00, stock: 0, image: 'https://img.icons8.com/fluency/48/000000/calendar.png' }
];

let activeCategory = 'streaming';
const cart = new Map();

const grid = document.getElementById('productGrid');
const emptyState = document.getElementById('emptyState');
const tabs = document.querySelectorAll('.tab');
const fabCount = document.getElementById('fabCount');
const fabCart = document.getElementById('fabCart');
const cartModal = document.getElementById('cartModal');
const closeModalBtn = document.getElementById('closeModal');
const modalOverlay = document.getElementById('modalOverlay');
const cartList = document.getElementById('cartList');
const cartEmpty = document.getElementById('cartEmpty');
const modalFoot = document.getElementById('modalFoot');
const cartTotalEl = document.getElementById('cartTotal');
const clearCartBtn = document.getElementById('clearCart');
const sendWhatsappBtn = document.getElementById('sendWhatsapp');
const catalogTitle = document.getElementById('catalogTitle');
const catalogSub = document.getElementById('catalogSub');
const yearEl = document.getElementById('year');

const formatPrice = (v) => `${CURRENCY}${v.toFixed(2)}`;

const categoryMeta = {
  streaming: { title: 'Streaming', sub: 'Cuentas premium con garantía. Pregunta por disponibilidad.' },
  freefire: { title: 'Free Fire', sub: 'Recargas de diamantes y pases. Entrega rápida.' },
  juegos: { title: 'Juegos', sub: 'Próximamente más opciones de videojuegos.' }
};

function cardActionMarkup(p) {
  const inCart = cart.get(p.id);
  if (inCart && inCart.qty > 0) {
    return `
      <div class="card-qty" data-testid="card-qty-${p.id}">
        <button class="qty-btn" data-card-action="dec" data-id="${p.id}" aria-label="Quitar uno" data-testid="card-dec-${p.id}">
          <i data-lucide="minus"></i>
        </button>
        <span class="qty-value" data-testid="card-qty-value-${p.id}">${inCart.qty}</span>
        <button class="qty-btn" data-card-action="inc" data-id="${p.id}" aria-label="Añadir uno" data-testid="card-inc-${p.id}">
          <i data-lucide="plus"></i>
        </button>
      </div>
    `;
  }
  return `
    <button class="btn btn-add" data-card-action="add" data-id="${p.id}" data-testid="add-${p.id}" ${p.stock === 0 ? 'disabled' : ''}>
      <i data-lucide="plus"></i> Agregar al carrito
    </button>
  `;
}

function refreshCardActions() {
  document.querySelectorAll('[data-card-actions]').forEach((wrap) => {
    const id = wrap.dataset.cardActions;
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;
    wrap.innerHTML = cardActionMarkup(product);
  });
  if (window.lucide) window.lucide.createIcons();
}

function renderProducts() {
  const items = PRODUCTS.filter((p) => p.category === activeCategory);
  const meta = categoryMeta[activeCategory];
  catalogTitle.textContent = meta.title;
  catalogSub.textContent = meta.sub;

  if (items.length === 0) {
    grid.hidden = true;
    grid.innerHTML = '';
    emptyState.hidden = false;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  grid.hidden = false;
  emptyState.hidden = true;

  grid.innerHTML = items
    .map((p, i) => {
      const stockLabel = p.stock > 10 ? 'Disponible' : p.stock > 0 ? `Stock: ${p.stock}` : 'Agotado';
      const stockClass = p.stock <= 5 ? 'is-low' : '';
      const mediaContent = p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy" />` : `<div class="placeholder"><i data-lucide="image"></i></div>`;

      return `
        <article class="card" style="animation-delay:${i * 35}ms" data-testid="card-${p.id}">
          <div class="card-media">
            <span class="stock ${stockClass}" data-testid="stock-${p.id}">
              <span class="stock-dot"></span>${stockLabel}
            </span>
            ${mediaContent}
          </div>
          <div class="card-body">
            <h3 class="card-title">${p.name}</h3>
            <div class="card-price" data-testid="price-${p.id}">${formatPrice(p.price)}</div>
            <div class="card-actions" data-card-actions="${p.id}">
              ${cardActionMarkup(p)}
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  if (window.lucide) window.lucide.createIcons();
}

grid.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-card-action]');
  if (!btn) return;
  e.stopPropagation();
  const id = btn.dataset.id;
  const action = btn.dataset.cardAction;
  if (action === 'add' || action === 'inc') addToCart(id);
  else if (action === 'dec') decrementItem(id);
});

function setCategory(cat) {
  activeCategory = cat;
  tabs.forEach((t) => t.classList.toggle('is-active', t.dataset.category === cat));
  renderProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => setCategory(tab.dataset.category));
});

function addToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  if (cart.has(id)) { cart.get(id).qty += 1; } else { cart.set(id, { product, qty: 1 }); }
  updateCartUI();
  bumpFab();
  showToast(`Añadido: ${product.name}`);
}

function decrementItem(id) {
  if (!cart.has(id)) return;
  const item = cart.get(id);
  item.qty -= 1;
  if (item.qty <= 0) cart.delete(id);
  updateCartUI();
}

function clearCart() { cart.clear(); updateCartUI(); }
function cartTotal() { let total = 0; cart.forEach(({ product, qty }) => { total += product.price * qty; }); return total; }
function cartCount() { let n = 0; cart.forEach(({ qty }) => (n += qty)); return n; }

function updateCartUI() {
  refreshCardActions();
  const count = cartCount();
  fabCount.textContent = count;

  if (cart.size === 0) {
    cartList.innerHTML = '';
    cartEmpty.hidden = false;
    modalFoot.hidden = true;
    return;
  }

  cartEmpty.hidden = true;
  modalFoot.hidden = false;
  cartList.innerHTML = '';
  
  cart.forEach(({ product, qty }, id) => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.dataset.testid = `cart-item-${id}`;
    const thumb = product.image ? `<img src="${product.image}" alt="${product.name}" />` : '';

    li.innerHTML = `
      <div class="cart-thumb">${thumb}</div>
      <div class="cart-info">
        <div class="name">${product.name}</div>
        <div class="price">${formatPrice(product.price)}</div>
      </div>
      <div class="qty-control" data-testid="qty-${id}">
        <button class="qty-btn" data-action="dec" aria-label="Quitar uno" data-testid="dec-${id}"><i data-lucide="minus"></i></button>
        <span class="qty-value">${qty}</span>
        <button class="qty-btn" data-action="inc" aria-label="Añadir uno" data-testid="inc-${id}"><i data-lucide="plus"></i></button>
      </div>
    `;

    li.querySelector('[data-action="dec"]').addEventListener('click', () => decrementItem(id));
    li.querySelector('[data-action="inc"]').addEventListener('click', () => {
      if (!cart.has(id)) return;
      cart.get(id).qty += 1;
      updateCartUI();
    });
    cartList.appendChild(li);
  });

  cartTotalEl.textContent = formatPrice(cartTotal());
  if (window.lucide) window.lucide.createIcons();
}

function bumpFab() {
  fabCount.classList.remove('bump');
  void fabCount.offsetWidth;
  fabCount.classList.add('bump');
  setTimeout(() => fabCount.classList.remove('bump'), 260);
}

let toastTimer = null;
function showToast(msg) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('data-testid', 'toast');
    document.body.appendChild(el);
  }
  el.textContent = msg;
  requestAnimationFrame(() => el.classList.add('is-visible'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-visible'), 1800);
}

function openCart() {
  cartModal.hidden = false;
  cartModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (window.lucide) window.lucide.createIcons();
}

function closeCart() {
  cartModal.hidden = true;
  cartModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

fabCart.addEventListener('click', openCart);
closeModalBtn.addEventListener('click', closeCart);
modalOverlay.addEventListener('click', closeCart);
clearCartBtn.addEventListener('click', () => { clearCart(); showToast('Carrito vacío'); });

document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !cartModal.hidden) closeCart(); });

function buildWhatsappMessage() {
  let msg = 'Hola, me interesa realizar una cotización de los siguientes productos:\n';
  cart.forEach(({ product, qty }) => {
    const subtotal = product.price * qty;
    msg += `- ${qty}x ${product.name} (${formatPrice(subtotal)})\n`;
  });
  msg += `\nTotal estimado: ${formatPrice(cartTotal())}`;
  return msg;
}

function sendToWhatsapp() {
  if (cart.size === 0) { showToast('Tu carrito está vacío'); return; }
  const text = encodeURIComponent(buildWhatsappMessage());
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  clearCart(); closeCart(); showToast('Enviado a WhatsApp');
}

sendWhatsappBtn.addEventListener('click', sendToWhatsapp);

function init() {
  yearEl.textContent = new Date().getFullYear();
  renderProducts();
  updateCartUI();
  if (window.lucide) window.lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', init);
