# Catálogo · Streaming & Free Fire

Sitio estático minimalista en **HTML5 + CSS3 + JavaScript Vanilla** para mostrar un catálogo de cuentas de streaming, diamantes de Free Fire y (próximamente) juegos. Incluye carrito en memoria y cotización directa por **WhatsApp**.

## 📁 Estructura

```
static-site/
├── index.html      # Marcado semántico (header, tabs, grid, modal, FAB)
├── style.css       # Estilo minimalista B/N + gris
├── script.js       # Catálogo, carrito, cotización WhatsApp
└── README.md
```

## ✨ Funcionalidades

- **Mobile-first**, responsive desde 320 px hasta desktop.
- **3 categorías**: Streaming, Free Fire, Juegos (vacío, listo para agregar).
- **Cuadrícula** 2 columnas en móvil, 3-4 en tablet/desktop.
- **Carrito flotante** con contador animado.
- **Selector de cantidad en la tarjeta**: tras agregar, el botón se transforma en un control `− valor +` que permite sumar o restar sin abrir el modal. Si la cantidad llega a 0, vuelve al botón "Agregar al carrito".
- **Modal de carrito** con sumar/restar cantidad y total.
- **Cotización por WhatsApp** al número `+52 477 923 1683` con mensaje preformateado.
- El carrito **se reinicia automáticamente** después de enviar la cotización.
- Sin colores llamativos: paleta blanco/gris/negro.
- Botones e iconos con micro-interacciones suaves.

## 🛠️ Personalización

### 1. Logo
En `index.html`, dentro del header, agrega la ruta de tu logo:

```html
<img src="img/mi-logo.png" alt="Logo" class="brand-logo" id="brandLogo" />
```

### 2. Productos
Edita el arreglo `PRODUCTS` al inicio de `script.js`:

```js
{
  id: 'stream-netflix-premium',
  category: 'streaming',     // 'streaming' | 'freefire' | 'juegos'
  name: 'Netflix Premium',
  price: 200.00,
  stock: 5,
  image: 'img/netflix.jpg'   // o URL absoluta
}
```

Para agregar un juego nuevo en el futuro:

```js
{ id: 'game-cod-mw3', category: 'juegos', name: 'Call of Duty MW3', price: 600, stock: 2, image: 'img/cod.jpg' }
```

### 3. Número de WhatsApp
En `script.js`:

```js
const WHATSAPP_NUMBER = '524779231683';
```

## 🚀 Despliegue

### Opción A — Render (Static Site)
1. Sube esta carpeta a un repositorio Git (GitHub/GitLab).
2. En [render.com](https://render.com) → **New + → Static Site**.
3. Conecta tu repo.
4. **Build command**: *(déjalo vacío)*
5. **Publish directory**: `./` (o `static-site/` si subes todo el repo).
6. Deploy. ¡Listo!

### Opción B — Supabase Storage (CDN público)
1. Crea un bucket público (ej: `catalogo`) en tu proyecto Supabase.
2. Sube `index.html`, `style.css`, `script.js` y tus imágenes a ese bucket.
3. Habilita acceso público.
4. Comparte el URL público de `index.html`.

> **Tip:** También funciona en Netlify, Vercel, Cloudflare Pages o GitHub Pages sin cambios.

## 🧪 Probar localmente

```bash
# Opción 1 — con Python
python3 -m http.server 8080 -d static-site/

# Opción 2 — con npx
npx serve static-site

# Luego abre:
http://localhost:8080
```

## ✅ Cumplimiento de requisitos

- [x] HTML semántico, CSS moderno, JS Vanilla
- [x] Paleta blanca / gris claro / negro (sin colores llamativos)
- [x] Mobile-first 2 columnas
- [x] Header fijo con logo + “Pregunta por disponibilidad”
- [x] Cards con imagen, título mayúsculas, precio destacado, stock, botón
- [x] Click en imagen/card NO abre modales adicionales
- [x] FAB de carrito con contador dinámico
- [x] Cotización vía API WhatsApp con mensaje preformateado
- [x] Reinicio del carrito al enviar
