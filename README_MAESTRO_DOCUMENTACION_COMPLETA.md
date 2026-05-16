# 📚 RELEVAMIENTO IA LAB - DOCUMENTACIÓN COMPLETA

## GrupoCESA - Sistema de Capacitación en IA

**Última actualización:** Mayo 16, 2026
**Versión:** 1.0 - Producción
**Status:** ✅ Listo para deployment

---

## 📋 TABLA DE CONTENIDOS

1. [Overview](#overview)
2. [Arquitectura del Sistema](#arquitectura)
3. [Archivos del Proyecto](#archivos)
4. [Setup & Configuración](#setup)
5. [Flujo de Datos](#flujo)
6. [Especificaciones Técnicas](#especificaciones)
7. [Guías de Uso](#guias)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 OVERVIEW {#overview}

### Qué es IA LAB

Sistema completo de **relevamiento, scoring y capacitación** para mapear madurez en IA dentro de GrupoCESA.

### Objetivos

✅ Mapear conocimiento y experiencia en IA de todo el equipo
✅ Calcular score automático (0-100)
✅ Clasificar participantes en niveles (Principiante/Intermedio/Avanzado)
✅ Identificar barreras y necesidades de capacitación
✅ Personalizar talleres por grupo/área
✅ Enviar confirmación automática por email

### Usuarios Objetivo

- **Participantes**: Completan el formulario de 3 tabs
- **Admin** (Sebastian): Ve métricas en Google Sheet, diseña capacitación

### Resultado Final

✅ Google Sheet con datos de todos los participantes
✅ Score y Nivel calculados automáticamente
✅ Email de confirmación enviado
✅ Datos listos para análisis y segmentación

---

## 🏗️ ARQUITECTURA DEL SISTEMA {#arquitectura}

### Diagrama de Flujo

```
PARTICIPANTE
      ↓
[Formulario HTML]
      ↓
  (3 tabs)
  1. Datos
  2. Experiencia IA
  3. Capacitación
      ↓
  [Click Enviar]
      ↓
  POST JSON
      ↓
[Google Apps Script]
      ↓
  ├─ Parsea JSON
  ├─ Calcula Score
  ├─ Determina Nivel
  ├─ Guarda en Sheet
  └─ Envía Email
      ↓
[Google Sheet]
      ↓
  ├─ Respuestas (datos + score)
  ├─ Admin Panel
  ├─ Análisis Sentimiento
  └─ Personas en Riesgo
      ↓
[ADMIN: Análisis & Decisiones]
      ↓
[Diseño de Capacitación Personalizada]
```

### Stack Tecnológico

**Frontend:**
- HTML5 + CSS3 + JavaScript Vanilla
- Sin dependencias externas
- Responsive (mobile + desktop)
- 900px max-width

**Backend:**
- Google Apps Script (JavaScript)
- CORS habilitado
- Headers HTTP customizados
- Error handling robusto

**Data:**
- Google Sheet (almacenamiento)
- JSON (transporte)
- Arrays/Strings (procesamiento)

**Emails:**
- Gmail API (via Google Apps Script)
- Confirmación automática a participante

---

## 📁 ARCHIVOS DEL PROYECTO {#archivos}

### Frontend

#### `FORMULARIO_FINAL_WEB_APP.html`
**Archivo principal - Formulario interactivo**

Características:
- 3 tabs secuenciales (Datos → Experiencia → Capacitación)
- Indicador de progreso visual
- Botones Siguiente/Anterior
- Checkboxes con campos "Otro" dinámicos
- Slider para proximidad IA
- Validación de campos obligatorios
- 14 preguntas totales

Estructura HTML:
```
├─ Header (branding GrupoCESA)
├─ Progress Indicator (visual 1/2/3)
├─ Form Container
│  ├─ TAB 1: Datos Personales
│  │  ├─ Nombre (text, required)
│  │  ├─ Email (email, required)
│  │  ├─ Área (select, required)
│  │  ├─ Puesto (text, required)
│  │  └─ Antigüedad (select)
│  │
│  ├─ TAB 2: Experiencia IA
│  │  ├─ Proximidad (slider 0-5)
│  │  ├─ Herramientas (checkboxes x8)
│  │  ├─ Casos de Uso (checkboxes x8)
│  │  └─ Tarea Repetitiva (textarea)
│  │
│  ├─ TAB 3: Capacitación
│  │  ├─ Temas de Interés (checkboxes x8)
│  │  ├─ Barreras/Miedos (checkboxes x8)
│  │  ├─ Disponibilidad (select)
│  │  ├─ Horario (select)
│  │  └─ Comentarios (textarea)
│  │
│  └─ Success Section (aparece después de enviar)
│
└─ Webhook URL (hardcoded)
```

Webhook URL:
```javascript
const WEBHOOK_URL = 'https://script.google.com/macros/s/[REEMPLAZAR]/exec';
```

**NOTA IMPORTANTE:** Reemplaza `[REEMPLAZAR]` con tu URL real de Web App.

---

### Backend

#### `CODIGO_APPS_SCRIPT_CORS_CORREGIDO.gs`
**Google Apps Script - Backend principal**

Funciones principales:

```javascript
function setupAdmin()
```
**Propósito:** Crear Google Sheet y headers
**Llamar:** Una sola vez (setup inicial)
**Output:** Sheet "Respuestas" con 17 columnas

```javascript
function doPost(e)
```
**Propósito:** Recibir datos del formulario
**Trigger:** POST desde formulario HTML
**Procesa:**
- Parsea JSON
- Calcula Score (0-100)
- Determina Nivel (🔴/🟡/🟢)
- Guarda en Google Sheet
- Envía email
- Retorna JSON con score+level

**Fórmula Score:**
```
Score = 0-100
├─ Área: +15
├─ Proximidad: ×12 (máx 60)
├─ Herramientas: ×5 (máx 25)
├─ Tareas: ×4 (máx 20)
├─ Tarea repetitiva: +5 a +10
├─ Intereses: ×3 (máx 15)
└─ Total: 0-100
```

**Niveles:**
```
🔴 Principiante: 0-33
🟡 Intermedio: 34-66
🟢 Avanzado: 67-100
```

```javascript
function doOptions(e)
```
**Propósito:** Manejar CORS preflight
**Trigger:** OPTIONS request automático

```javascript
function sendConfirmationEmail(nombre, email, score, level)
```
**Propósito:** Enviar email al participante
**Template:** Confirmación + Score + Nivel

```javascript
function getWebhookUrl()
```
**Propósito:** Mostrar URL en consola
**Salida:** URL para formulario

---

### Google Sheet

#### Estructura de Datos

**Pestaña "Respuestas"** (principal)

Columnas (17 total):
```
1.  Timestamp (datetime)
2.  Nombre (text)
3.  Email (text)
4.  Área (text)
5.  Puesto (text)
6.  Antigüedad (text)
7.  Proximidad (0-5)
8.  Herramientas (pipe-separated: ChatGPT|Claude|...)
9.  Tareas (pipe-separated)
10. Tarea Repetitiva (text)
11. Intereses (pipe-separated)
12. Barreras (pipe-separated)
13. Disponibilidad (text)
14. Horario (text)
15. Comentarios (text)
16. Score (0-100) AUTO-CALCULADO
17. Nivel (🟢/🟡/🔴) AUTO-CALCULADO
```

---

## ⚙️ SETUP & CONFIGURACIÓN {#setup}

### 1️⃣ Configuración Google Apps Script

**Archivo:** `CODIGO_APPS_SCRIPT_CORS_CORREGIDO.gs`

```bash
# Paso 1: Crear nuevo proyecto
https://script.google.com/home
→ "Nuevo proyecto"

# Paso 2: Copiar TODO el código
Abre: CODIGO_APPS_SCRIPT_CORS_CORREGIDO.gs
Copy: Ctrl+A → Ctrl+C
En Google Apps Script: Ctrl+A → Ctrl+V

# Paso 3: Guardar
Ctrl+S

# Paso 4: Ejecutar setupAdmin()
Dropdown de funciones → setupAdmin
Click "Ejecutar"
Autorizar acceso

# Paso 5: Obtener Webhook URL
Dropdown → getWebhookUrl()
Click "Ejecutar"
Abre consola (Ctrl+Enter)
Copia URL (formato: /macros/d/.../useTriggerSource)
```

### 2️⃣ Publicar como Web App

```bash
# En Google Apps Script:

1. Click "Implementar" (botón azul arriba derecha)
2. Selecciona "Nueva implementación"
3. En el popup:
   - Tipo: "Aplicación web"
   - Ejecutar como: [Tu email]
   - Acceso: "Cualquiera"
4. Click "Implementar"
5. Autoriza acceso
6. Copia la URL que aparece
```

**Formato URL final:**
```
https://script.google.com/macros/s/[ID]/exec
O
https://script.google.com/macros/d/[ID]/useTriggerSource
```

### 3️⃣ Configurar Formulario HTML

**Archivo:** `FORMULARIO_FINAL_WEB_APP.html`

```javascript
// Línea ~1360 (buscar "WEBHOOK_URL")

const WEBHOOK_URL = 'https://script.google.com/macros/s/[TU_ID]/exec';
// ↑ Reemplaza [TU_ID] con tu URL real
```

### 4️⃣ Deploy

```bash
# Opción A: GitHub Pages (recomendado)
1. Crear repo en GitHub
2. Subir FORMULARIO_FINAL_WEB_APP.html
3. Settings → Pages → Source: Main
4. URL: https://username.github.io/ia-lab-formulario/

# Opción B: Compartir archivo local
1. Descargar FORMULARIO_FINAL_WEB_APP.html
2. Abrir en navegador (file:// URL)
3. Funciona offline si lo guardas localmente

# Opción C: Hosting propio
1. Subir archivo a tu servidor
2. Acceder via https://tudominio.com/formulario.html
```

---

## 🔄 FLUJO DE DATOS {#flujo}

### Request

**Método:** POST
**Endpoint:** Webhook URL
**Content-Type:** application/json

```json
{
  "timestamp": "2026-05-16T10:30:00.000Z",
  "nombre": "Juan Pérez",
  "email": "juan@grupocesa.com",
  "area": "Desarrollo",
  "puesto": "Senior Developer",
  "antiguedad": "2-5 años",
  "proximidad": "4",
  "herramientas": ["ChatGPT", "Claude", "Copilot"],
  "tareas": ["Código", "Análisis datos"],
  "tareaRepetitiva": "Revisar código y escribir documentación",
  "interes": ["Prompts", "Integraciones", "IA en Procesos"],
  "barreras": ["Privacidad/seguridad"],
  "disponibilidad": "Sí, con ajustes",
  "horario": "Mañana",
  "comentarios": "Interesado en aprender más sobre prompts"
}
```

### Response

```json
{
  "success": true,
  "message": "Respuesta guardada correctamente",
  "nombre": "Juan Pérez",
  "score": 78,
  "level": "🟢 Avanzado"
}
```

### Google Sheet Update

Nueva fila agregada a "Respuestas":

```
Timestamp | Nombre | Email | Área | ... | Score | Nivel
2026-05-16 10:30 | Juan Pérez | juan@... | Desarrollo | ... | 78 | 🟢 Avanzado
```

### Email Enviado

**A:** juan@grupocesa.com
**Asunto:** ✅ Respuestas recibidas - Relevamiento IA LAB
**Body:**
```
Hola Juan,

¡Gracias por completar el formulario de Relevamiento IA LAB!

Tus respuestas han sido procesadas correctamente.

Estado: 🟢 Avanzado
Puntuación: 78/100

Próximamente recibirás información sobre el taller personalizado.

Saludos,
Equipo GrupoCESA
```

---

## 📊 ESPECIFICACIONES TÉCNICAS {#especificaciones}

### Frontend Specs

**HTML/CSS/JS:**
- Responsive: 320px - 1920px
- CSS Variables para temas
- No jQuery, no Bootstrap
- ~2000 líneas de código total

**Performance:**
- Tamaño: ~65KB (sin minify)
- Load time: <1s en conexión normal
- Interactividad inmediata

**Navegadores:**
- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)
- Mobile: iOS Safari, Android Chrome

### Backend Specs

**Google Apps Script:**
- Ejecución: 6 min máx por request
- Storage: Google Sheet ilimitado
- Quotas: 20,000 requests/día
- Concurrencia: Soporta múltiples requests simultáneos

**Rate Limits:**
- Apps Script: 100 peticiones/minuto
- Gmail: 100 emails/día por Apps Script

### Data Storage

**Google Sheet:**
- Filas ilimitadas
- 17 columnas
- Acceso: Solo propietario + compartidos
- Backup automático (Google Drive)

---

## 📖 GUÍAS DE USO {#guias}

### Para Participantes

1. **Abrir formulario**
   - Local: Descargar HTML, abrir en navegador
   - Web: Ir a link compartido

2. **Completar 3 tabs**
   - TAB 1 (5 min): Datos personales
   - TAB 2 (8 min): Experiencia IA
   - TAB 3 (7 min): Capacitación
   - Total: ~20 minutos

3. **Enviar**
   - Click "Enviar Respuestas"
   - Ver confirmación con Score + Nivel
   - Esperar email de confirmación (2-5 min)

### Para Admin (Sebastian)

1. **Acceder a Google Sheet**
   - Abrir Sheet desde Google Drive
   - Pestaña "Respuestas"

2. **Ver datos en tiempo real**
   - Nueva fila = nuevo participante
   - Score y Nivel calculados automáticamente

3. **Analizar resultados**
   - Filtrar por Área
   - Filtrar por Nivel (🔴/🟡/🟢)
   - Agrupar por Barreras

4. **Diseñar capacitación**
   - Crear talleres por nivel
   - Personalizar por área
   - Abordar barreras específicas

### Para Desarrollador (Claude Code)

Ver sección "Continuación con Claude Code" abajo.

---

## 🔧 TROUBLESHOOTING {#troubleshooting}

### ❌ "Error de conexión: Failed to fetch"

**Causa:** Webhook URL incorrecta o no publicada como Web App

**Solución:**
1. Verifica que Apps Script está publicado como "Aplicación web"
2. Copia URL correcta desde Implementaciones
3. Reemplaza en FORMULARIO_FINAL_WEB_APP.html
4. Recarga página (Ctrl+F5)

### ❌ "Error: setupAdmin no ejecutado"

**Causa:** No corriste setupAdmin() en Google Apps Script

**Solución:**
1. Ve a Google Apps Script
2. Dropdown → setupAdmin
3. Click "Ejecutar"
4. Autoriza acceso

### ❌ No llega email de confirmación

**Causa:** Puede ir a spam o haber error en email

**Solución:**
1. Verifica que los datos SÍ llegaron a Google Sheet
2. Si llegaron → email está en spam
3. Si no llegaron → revisar error en console (F12)

### ❌ El Score no se calcula

**Causa:** Código doPost() no tiene la fórmula de scoring

**Solución:**
1. Verifica que pegaste TODO el código de CODIGO_APPS_SCRIPT_CORS_CORREGIDO.gs
2. Busca "CALCULAR SCORE" en el código
3. Debe haber ~100 líneas de fórmula

---

## 🚀 CONTINUACIÓN CON CLAUDE CODE {#claude-code}

### Cómo usar estos archivos en Claude Code

```bash
# 1. Subir todos los archivos a Claude Code
   - FORMULARIO_FINAL_WEB_APP.html
   - CODIGO_APPS_SCRIPT_CORS_CORREGIDO.gs
   - Esta documentación

# 2. Pedir mejoras específicas
   - "Agregar análisis de sentimiento"
   - "Crear dashboard visual"
   - "Exportar a PDF"
   - "Traducir a otros idiomas"

# 3. Integrar nuevas funcionalidades
   - Webhook adicionales
   - Reportes automáticos
   - Segmentación avanzada
   - APIs externas (Slack, etc)
```

### Próximas Mejoras Recomendadas

1. **Dashboard Interactivo**
   - Gráficos Chart.js
   - Filtros por área/nivel
   - KPIs en tiempo real

2. **Análisis de Sentimiento**
   - NLP de comentarios
   - Identificar frustraciones
   - Sugerencias personalizadas

3. **Exportación de Datos**
   - PDF con perfiles
   - CSV para análisis
   - Gráficos automáticos

4. **Integración Slack**
   - Notificar cuando alguien completa
   - Alertas de barreras críticas
   - Resumen diario

5. **Multi-idioma**
   - Español/Inglés/Portugués
   - Localización automática

---

## 📞 SOPORTE Y CONTACTO

**Para preguntas técnicas:**
- Revisar esta documentación
- Buscar en el archivo relevante
- Abrir issue en GitHub (si usas)

**Para mejoras:**
- Usar Claude Code
- Proporcionar brief claro
- Testeear en ambiente local primero

---

## 📄 LICENCIA

GrupoCESA - Uso Interno
Confidencial

---

**Documentación v1.0**
**Última actualización: Mayo 16, 2026**
**Autor: Claude + Sebastian**
