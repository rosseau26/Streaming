/* =========================================================
   Catálogo · Streaming, Free Fire y Juegos
   Carrito + Cotización por WhatsApp (Vanilla JS)
   ========================================================= */

/* ---------- Configuración ---------- */
const WHATSAPP_NUMBER = '524779231683'; // Sin signos, con código de país
const CURRENCY = '$';

/* ---------- Catálogo Demo ----------
   Reemplaza `image` por la ruta/URL de tus imágenes.
   Reemplaza `price` y `stock` según tu inventario. */
const PRODUCTS = [
  /* ===== STREAMING ===== */
  {
    id: 'stream-netflix-premium',
    category: 'streaming',
    name: 'Netflix Premium',
    price: 200.00,
    stock: 5,
    image: '' // ej: 'img/netflix.jpg'
  },
  {
    id: 'stream-prime-6m',
    category: 'streaming',
    name: 'Prime 6M',
    price: 80.00,
    stock: 12,
    image: ''
  },
  {
    id: 'stream-spotify-1m',
    category: 'streaming',
    name: 'Spotify Premium 1M',
    price: 50.00,
    stock: 8,
    image: ''
  },
  {
    id: 'stream-disney-1m',
    category: 'streaming',
    name: 'Disney+ 1M',
    price: 90.00,
    stock: 4,
    image: ''
  },
  {
    id: 'stream-hbo-1m',
    category: 'streaming',
    name: 'HBO Max 1M',
    price: 70.00,
    stock: 6,
    image: ''
  },
  {
    id: 'stream-paramount-1m',
    category: 'streaming',
    name: 'Paramount+ 1M',
    price: 45.00,
    stock: 9,
    image: ''
  },
  {
    id: 'stream-vix-1m',
    category: 'streaming',
    name: 'Vix Premium 1M',
    price: 40.00,
    stock: 7,
    image: ''
  },
  {
    id: 'stream-youtube-1m',
    category: 'streaming',
    name: 'YouTube Premium 1M',
    price: 60.00,
    stock: 3,
    image: ''
  },

  /* ===== FREE FIRE ===== */
  {
    id: 'ff-100',
    category: 'freefire',
    name: '100 Diamantes',
    price: 25.00,
    stock: 99,
    image: ''
  },
  {
    id: 'ff-310',
    category: 'freefire',
    name: '310 Diamantes',
    price: 70.00,
    stock: 99,
    image: ''
  },
  {
    id: 'ff-520',
    category: 'freefire',
    name: '520 Diamantes',
    price: 115.00,
    stock: 99,
    image: ''
  },
  {
    id: 'ff-1060',
    category: 'freefire',
    name: '1060 Diamantes',
    price: 220.00,
    stock: 99,
    image: ''
  },
  {
    id: 'ff-2180',
    category: 'freefire',
    name: '2180 Diamantes',
    price: 440.00,
    stock: 99,
    image: ''
  },
  {
    id: 'ff-5600',
    category: 'freefire',
    name: '5600 Diamantes',
    price: 1100.00,
    stock: 99,
    image: ''
  },
  {
    id: 'ff-pase-mensual',
    category: 'freefire',
    name: 'Pase Mensual',
    price: 95.00,
    stock: 99,
    image: ''
  },
  {
    id: 'ff-tarjeta-semanal',
    category: 'freefire',
    name: 'Tarjeta Semanal',
    price: 35.00,
    stock: 99,
    image: ''
  },

  /* ===== JUEGOS (vacío por ahora) =====
     Para agregar más adelante, crea objetos con category: 'juegos'.
     Ejemplo:
     { id: 'game-cod', category: 'juegos', name: 'Call of Duty', price: 350, stock: 2, image: '' }
  */
];

/* ---------- Estado ---------- */
let activeCategory = 'streaming';
const cart = new Map(); // id -> { product, qty }

/* ---------- Referencias DOM ---------- */
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

/* ---------- Utilidades ---------- */
const formatPrice = (v) => `${CURRENCY}${v.toFixed(2)}`;

const categoryMeta = {
  streaming: {
    title: 'Streaming',
    sub: 'Cuentas premium con garantía. Pregunta por disponibilidad.'
  },
  freefire: {
    title: 'Free Fire',
    sub: 'Recargas de diamantes y pases. Entrega rápida.'
  },
  juegos: {
    title: 'Juegos',
    sub: 'Próximamente más opciones de videojuegos.'
  }
};

/* ---------- Acciones de la Tarjeta (botón / control de cantidad) ---------- */
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
    <button
      class="btn btn-add"
      data-card-action="add"
      data-id="${p.id}"
      data-testid="add-${p.id}"
      ${p.stock === 0 ? 'disabled' : ''}
    >
      <i data-lucide="plus"></i>
      Agregar al carrito
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

  // Texto de cabecera
  const meta = categoryMeta[activeCategory];
  catalogTitle.textContent = meta.title;
  catalogSub.textContent = meta.sub;

  // Estado vacío
  if (items.length === 0) {
    grid.hidden = true;
    grid.innerHTML = '';
    emptyState.hidden = false;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  grid.hidden = false;
  emptyState.hidden = true;

  // Construcción del HTML
  grid.innerHTML = items
    .map((p, i) => {
      const stockLabel =
        p.stock > 10 ? 'Disponible' : p.stock > 0 ? `Stock: ${p.stock}` : 'Agotado';
      const stockClass = p.stock <= 5 ? 'is-low' : '';
      const mediaContent = p.image
        ? `<img src="${p.image}" alt="${p.name}" loading="lazy" />`
        : `<div class="placeholder"><i data-lucide="image"></i></div>`;

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

/* Delegación de eventos: sobrevive al re-render de las acciones */
grid.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-card-action]');
  if (!btn) return;
  e.stopPropagation();
  const id = btn.dataset.id;
  const action = btn.dataset.cardAction;
  if (action === 'add' || action === 'inc') addToCart(id);
  else if (action === 'dec') decrementItem(id);
});

/* ---------- Cambio de Categoría ---------- */
function setCategory(cat) {
  activeCategory = cat;
  tabs.forEach((t) => {
    t.classList.toggle('is-active', t.dataset.category === cat);
  });
  renderProducts();
  // Scroll suave al inicio del catálogo
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => setCategory(tab.dataset.category));
});

/* ---------- Carrito ---------- */
function addToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;

  if (cart.has(id)) {
    cart.get(id).qty += 1;
  } else {
    cart.set(id, { product, qty: 1 });
  }
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

function incrementItem(id) {
  if (!cart.has(id)) return;
  cart.get(id).qty += 1;
  updateCartUI();
}

function clearCart() {
  cart.clear();
  updateCartUI();
}

function cartTotal() {
  let total = 0;
  cart.forEach(({ product, qty }) => {
    total += product.price * qty;
  });
  return total;
}

function cartCount() {
  let n = 0;
  cart.forEach(({ qty }) => (n += qty));
  return n;
}

/* ---------- Actualización de UI ---------- */
function updateCartUI() {
  // Sincronizar acciones de tarjetas con estado del carrito
  refreshCardActions();

  // Contador FAB
  const count = cartCount();
  fabCount.textContent = count;

  // Render lista
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

    const thumb = product.image
      ? `<img src="${product.image}" alt="${product.name}" />`
      : '';

    li.innerHTML = `
      <div class="cart-thumb">${thumb}</div>
      <div class="cart-info">
        <div class="name">${product.name}</div>
        <div class="price">${formatPrice(product.price)}</div>
      </div>
      <div class="qty-control" data-testid="qty-${id}">
        <button class="qty-btn" data-action="dec" aria-label="Quitar uno" data-testid="dec-${id}">
          <i data-lucide="minus"></i>
        </button>
        <span class="qty-value">${qty}</span>
        <button class="qty-btn" data-action="inc" aria-label="Añadir uno" data-testid="inc-${id}">
          <i data-lucide="plus"></i>
        </button>
      </div>
    `;

    li.querySelector('[data-action="dec"]').addEventListener('click', () => decrementItem(id));
    li.querySelector('[data-action="inc"]').addEventListener('click', () => incrementItem(id));

    cartList.appendChild(li);
  });

  cartTotalEl.textContent = formatPrice(cartTotal());

  if (window.lucide) window.lucide.createIcons();
}

/* ---------- Animación FAB ---------- */
function bumpFab() {
  fabCount.classList.remove('bump');
  // forzar reflow para reiniciar animación
  // eslint-disable-next-line no-unused-expressions
  void fabCount.offsetWidth;
  fabCount.classList.add('bump');
  setTimeout(() => fabCount.classList.remove('bump'), 260);
}

/* ---------- Toast ---------- */
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

/* ---------- Modal ---------- */
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
clearCartBtn.addEventListener('click', () => {
  clearCart();
  showToast('Carrito vacío');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !cartModal.hidden) closeCart();
});

/* ---------- Envío por WhatsApp ---------- */
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
  if (cart.size === 0) {
    showToast('Tu carrito está vacío');
    return;
  }
  const text = encodeURIComponent(buildWhatsappMessage());
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  // Abrir WhatsApp
  window.open(url, '_blank', 'noopener,noreferrer');
  // Reiniciar carrito tras el envío (como pidió el cliente)
  clearCart();
  closeCart();
  showToast('Enviado a WhatsApp');
}

sendWhatsappBtn.addEventListener('click', sendToWhatsapp);

/* ---------- Inicialización ---------- */
function init() {
  yearEl.textContent = new Date().getFullYear();
  renderProducts();
  updateCartUI();
  if (window.lucide) window.lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', init);
