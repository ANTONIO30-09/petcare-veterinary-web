# 🐾 PetCare Veterinary Web

Aplicación web moderna para una clínica veterinaria, desarrollada en **Angular 22** con componentes standalone, Signals y arquitectura escalable por features.

> **Proyecto académico** — PGM-611 Programación Gráfica y Multimedia I · Hito 3
> Universidad · Semestre 6

---

## 📋 Descripción

**PetCare Veterinary** es una landing + aplicación multipágina que presenta los servicios de una clínica veterinaria: catálogo de servicios, especialidades médicas, equipo de veterinarios, sucursales con mapa interactivo, precios transparentes y un sistema de contacto con chatbot simulado.

**No requiere backend.** Los datos viven en archivos JSON locales servidos como assets; la persistencia del formulario se simula con `localStorage`.

---

## 🛠️ Stack Tecnológico

| Tecnología             | Versión      | Uso                       |
| ---------------------- | ------------ | ------------------------- |
| **Angular**            | 22.2.1       | Framework principal       |
| **Angular CLI**        | 22.2.2       | Tooling                   |
| **TypeScript**         | 6.0.3        | Lenguaje                  |
| **Node.js**            | 22.23.3      | Runtime                   |
| **npm**                | 10.9.9       | Gestor de paquetes        |
| **SCSS**               | —            | Estilos con design tokens |
| **Leaflet**            | 1.9.4        | Mapas interactivos        |
| **Vitest**             | 5.x          | Testing                   |
| **Fraunces + DM Sans** | Google Fonts | Tipografía                |
| **Material Symbols**   | Google Fonts | Iconografía               |

**Características de Angular moderno utilizadas:**

- Standalone components (sin `NgModule`)
- Lazy loading con `loadComponent`
- Signals (`signal`, `computed`, `input`, `viewChild`)
- Control flow moderno (`@if`, `@for` con `track`)
- `inject()` en lugar de constructor injection
- `ChangeDetectionStrategy.OnPush` en todos los componentes
- Reactive Forms con validaciones

---

## ✅ Requisitos

- **Node.js** ≥ 22.x
- **npm** ≥ 10.x
- Navegador moderno (Chrome, Firefox, Edge, Safari)

Verificar las versiones instaladas:

```bash
node -v   # debe mostrar v22.x
npm -v    # debe mostrar 10.x
```

---

## 🚀 Instalación y ejecución

```bash
# 1) Clonar repositorio
git clone https://github.com/ANTONIO30-09/petcare-veterinary-web.git
cd petcare-veterinary-web

# 2) Instalar dependencias
npm install

# 3) Levantar servidor de desarrollo
npm start
```

La aplicación estará disponible en **http://localhost:4200**

---

## 🏗️ Build de producción

```bash
npm run build
```

El output queda en `dist/veterinaria-petcare/browser/`.

**Tamaños de referencia:**

- Initial total: **~79 KB** (gzip)
- Chunk más pesado (Leaflet, lazy): **~42 KB** (gzip)
- El resto de features cargan bajo demanda

---

## 🧪 Tests

```bash
npm test -- --watch=false
```

Cobertura actual: **28 tests** en 4 archivos (`app`, `DataService`, `ContactService`, `ChatbotService`).

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── core/                     # Núcleo transversal
│   │   ├── models/               # Interfaces TypeScript
│   │   └── services/             # Servicios singleton
│   │       ├── data.service.ts         # Acceso a JSON vía HttpClient
│   │       ├── chatbot.service.ts      # Lógica de respuestas del bot
│   │       └── contact.service.ts      # Persistencia en localStorage
│   │
│   ├── shared/                   # Componentes reutilizables
│   │   └── components/
│   │       ├── navbar/                 # Navbar + drawer móvil
│   │       ├── footer/
│   │       ├── hero/                   # Hero con SVG animado
│   │       ├── video-hero/             # Bloque de video
│   │       ├── service-card/
│   │       ├── specialty-card/
│   │       ├── location-card/
│   │       ├── veterinarian-card/      # Variantes full/minimal
│   │       ├── pricing-table/
│   │       ├── info-block/
│   │       ├── cta-banner/
│   │       ├── chatbot-widget/         # Widget flotante global
│   │       └── map-view/               # Wrapper de Leaflet
│   │
│   ├── features/                 # Vistas por dominio (lazy)
│   │   ├── home/                       # Landing
│   │   ├── services/                   # Catálogo con filtros
│   │   ├── specialties/                # Listado editorial
│   │   ├── locations/                  # Mapa interactivo
│   │   ├── pricing/                    # Planes en columnas
│   │   ├── about/                      # Institucional + equipo
│   │   ├── contact/                    # Formulario reactivo
│   │   └── chatbot/                    # Página de chat completa
│   │
│   ├── app.ts                    # Root component
│   ├── app.config.ts             # Providers globales
│   ├── app.routes.ts             # Rutas lazy con títulos
│   └── app.html
│
├── public/
│   └── data/                     # JSON estáticos
│       ├── services.json               # 8 servicios
│       ├── specialties.json            # 6 especialidades
│       ├── veterinarians.json          # 5 veterinarios
│       └── locations.json              # 3 sucursales
│
├── styles.scss                   # Tokens + reset + tipografía global
└── index.html                    # Fuentes + metadatos
```

---

## 🎨 Design System — "Emerald PetCare"

Sistema de diseño con **CSS Custom Properties** definido en `src/styles.scss`.

**Paleta completa (gama verde + crema):**

| Token                              | Uso                                           |
| ---------------------------------- | --------------------------------------------- |
| `--pc-green-950` … `--pc-green-50` | 11 tonos de verde (de más oscuro a más claro) |
| `--pc-cream-50`                    | Fondo cálido principal                        |
| `--pc-white`                       | Superficies                                   |

**Tipografía:**

- **Fraunces** (serif variable) → títulos y display
- **DM Sans** (sans geométrica) → cuerpo y UI

**Escala:** 49 tokens (`--pc-space-*`, `--pc-fs-*`, `--pc-radius-*`, `--pc-shadow-*`, `--pc-transition-*`).

---

## ✨ Funcionalidades

### 🏠 Home

- Hero asimétrico con ilustración SVG de perro animada
- Video institucional con fallback
- Servicios destacados (4 de 8)
- Especialidades, Ubicaciones, Veterinarios (variante minimal)
- Tabla de precios con badge "Más solicitado"
- Bloque institucional con stats
- CTA final

### 🩺 Servicios

Catálogo completo con **filtros por categoría** (chips) y contador dinámico.

### 🎓 Especialidades

Listado editorial con filas numeradas, iconos Material Symbols, hover premium.

### 📍 Ubicaciones

Mapa interactivo con **Leaflet + OpenStreetMap** (sin API key). Click en sucursal → vuela al marcador con animación.

### 💰 Precios

3 columnas tipo "Planes" (Preventivo, Diagnóstico, Cirugía) derivadas por categoría, con lista de servicios y precios.

### 👥 Nosotros

Historia con timeline serpenteante, equipo de 5 veterinarios con fotos, valores institucionales.

### ✉️ Contacto

Formulario **Reactive Forms** con 6 campos y validaciones. Persistencia en `localStorage`. Estado de éxito tras enviar.

### 🤖 Chatbot

Widget flotante global + página completa con sidebar de preguntas rápidas. Respuestas predefinidas por palabras clave (no hay IA real, es simulación).

---

## ♿ Accesibilidad

- Skip-link "Saltar al contenido principal" al tabular
- `aria-label` en todos los botones icon-only
- Foco visible (`:focus-visible` con outline verde)
- Soporte `prefers-reduced-motion`
- HTML semántico (`<main>`, `<header>`, `<nav>`, `<footer>`)
- Contraste AA en textos principales
- Navegación por teclado completa (incluye Escape para cerrar drawer)

---

## 📱 Responsive

Diseño mobile-first adaptado a:

- **Móvil** (< 640px): drawer lateral, layouts en columna
- **Tablet** (640–960px): grids intermedios
- **Desktop** (> 960px): layout completo, sidebar sticky

---

## 🔗 Repositorio

**GitHub:** https://github.com/ANTONIO30-09/petcare-veterinary-web

Rama principal: `main`

---

## 👨‍💻 Autor

**Antonio** — Estudiante de Ingeniería de Sistemas

- GitHub: [@ANTONIO30-09](https://github.com/ANTONIO30-09)

**Materia:** PGM-611 Programación Gráfica y Multimedia I
**Hito:** 3
**Semestre:** 6

---

## 📄 Licencia

Proyecto académico — uso educativo. Los recursos externos (video de Pexels, imágenes de veterinarios) mantienen sus licencias originales.
