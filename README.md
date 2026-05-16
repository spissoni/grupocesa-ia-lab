# 🚀 IA LAB GrupoCESA - Relevamiento de Madurez IA

Solución completa para el relevamiento de estado actual de conocimiento y uso de IA en el equipo, con análisis de sentimiento y dashboard interactivo.

## 📁 Archivos

- **`index.html`** — Formulario principal (publicado automáticamente en GitHub Pages)
- **`DASHBOARD_IA_LAB.html`** — Panel admin de análisis y gráficos
- **`APPS_SCRIPT_V2.gs`** — Backend Google Apps Script (v2 con sentiment analysis)

---

## 🚀 Comenzar

### 1️⃣ Implementar el Backend (Google Apps Script)

1. Abre [Google Apps Script Console](https://script.google.com)
2. Crea un nuevo proyecto
3. Copia el contenido de **`APPS_SCRIPT_V2.gs`** al editor
4. En el menú, selecciona **Deploy > New deployment**
   - Type: **Web app**
   - Execute as: Tu cuenta
   - Who has access: **Anyone**
5. Copia la URL de deployment (ej: `https://script.google.com/macros/s/AKfycbx...`)
6. Pega en **`index.html`** línea ~905:
   ```javascript
   const WEBHOOK_URL = 'https://script.google.com/macros/s/[TU_ID]/exec';
   ```
7. En la consola de Apps Script, ejecuta `setupAdmin()` en el menú desplegable

### 2️⃣ Publicar Formulario en GitHub Pages

Las URLs ya están disponibles (GitHub Pages se habilita automáticamente):

- **Formulario**: https://spissoni.github.io/grupocesa-ia-lab/
- **Dashboard**: https://spissoni.github.io/grupocesa-ia-lab/DASHBOARD_IA_LAB.html

### 3️⃣ Usar el Dashboard

1. Ve a `DASHBOARD_IA_LAB.html`
2. Ingresa el token: **`GRUPOCESA2026`**
3. Verás todos los gráficos, análisis de sentimiento y estadísticas

---

## 📊 Características

### ✅ Formulario (`index.html`)
- ✓ Validación client-side (campos requeridos)
- ✓ Autosave con localStorage (sobrevive refresh)
- ✓ Barra de progreso con % real
- ✓ Accesibilidad ARIA completa
- ✓ Mobile responsive (touch targets 44px)
- ✓ Gauge SVG animado mostrando el score
- ✓ 3 tabs: Datos, Experiencia IA, Capacitación

### 📊 Dashboard (`DASHBOARD_IA_LAB.html`)
- ✓ 12 gráficos interactivos (Chart.js):
  - Histogram de scores
  - Donut de niveles
  - Bar chart por área
  - Distribución de proximidad
  - Herramientas más usadas
  - Casos de uso principales
  - Radar de intereses
  - Barreras detectadas
  - Disponibilidad y horarios
  - Análisis de sentimiento
  - Timeline de respuestas

- ✓ Filtros por área, nivel, fecha
- ✓ Tabla de respuestas con búsqueda
- ✓ Export a CSV (Excel-compatible)
- ✓ Análisis de sentimiento keyword-based (español)

### ⚙️ Backend (`APPS_SCRIPT_V2.gs`)
- ✓ `doPost()` — Recibe datos y calcula score (0-100)
- ✓ `doGet()` — Sirve datos a dashboard (requiere token)
- ✓ `analyzeSentiment()` — Análisis por keywords
- ✓ Guarda 19 columnas incluyendo sentimiento
- ✓ Envía email de confirmación con score
- ✓ CORS habilitado

---

## 📐 Scoring

El score se calcula así:
- Área: +15 pts
- Proximidad (0-5) × 12: 0-60 pts
- Herramientas × 5: hasta 25 pts
- Tareas × 4: hasta 20 pts
- Tarea repetitiva: +10/-5 pts según longitud
- Intereses × 3: hasta 15 pts

**Niveles:**
- 🔴 Principiante: < 34
- 🟡 Intermedio: 34-66
- 🟢 Avanzado: ≥ 67

---

## 🔐 Seguridad

- Token dashboard: `GRUPOCESA2026` (hardcoded, client-side only)
- Email enmascarado en tabla: `j***@empresa.com`
- Datos almacenados en Google Sheet (autorizado)
- CORS habilitado para cualquier origen

---

## 📱 Compatibilidad

- ✓ Desktop (Chrome, Firefox, Safari, Edge)
- ✓ Tablet
- ✓ Mobile (iPhone, Android)
- ✓ No requiere instalación

---

## 📊 Próximos Pasos

1. Personaliza el mensaje de bienvenida en `index.html`
2. Comparte la URL del formulario con tu equipo
3. Monitorea respuestas en el dashboard
4. Usa los datos para diseñar la capacitación personalizada

---

**Última actualización:** Mayo 16, 2026
