# 🚀 GUÍA COMPLETA DE DEPLOYMENT - IA LAB GRUPOCESA

## Deploy paso a paso para producción

---

## 📋 PRE-REQUISITOS

```
✅ Cuenta Google (Gmail)
✅ Acceso a Google Drive
✅ Acceso a Google Apps Script
✅ Navegador moderno (Chrome/Firefox/Safari)
✅ OPCIONAL: Cuenta GitHub (para GitHub Pages)
✅ OPCIONAL: Servidor propio (para hosting custom)
```

---

## 🎯 OPCIÓN 1: DEPLOYMENT RÁPIDO (LOCAL + GOOGLE SHEET)

### Tiempo estimado: 15 minutos
### Complejidad: Fácil ⭐

```
Ideal para: Testing, pequeños grupos, uso interno
Ventajas: Rápido, sin dependencias externas, datos en Google Drive
Desventajas: URL no compartible fácilmente
```

### Paso 1: Configurar Google Apps Script

```bash
1. Abre: https://script.google.com/home

2. "Nuevo proyecto"

3. Copia TODO el código de:
   CODIGO_APPS_SCRIPT_CORS_CORREGIDO.gs
   
4. Pega en editor (Ctrl+A, Ctrl+V)

5. Ctrl+S (Guardar)

6. Espera a "✓ Guardado"
```

### Paso 2: Setup Inicial

```bash
1. Dropdown de funciones → "setupAdmin"

2. Click "Ejecutar" (play button)

3. Autoriza:
   - Click en "Autorizar"
   - Selecciona tu cuenta Google
   - Acepta permisos

4. En la consola (Ctrl+Enter):
   - Deberías ver: ✅ Setup completado correctamente

5. Abre Google Drive:
   - Busca carpeta "Google Apps Script"
   - Debería haber un Sheet nuevo "IA LAB Respuestas"
```

### Paso 3: Obtener Webhook URL

```bash
1. En Google Apps Script:

2. Dropdown → "getWebhookUrl"

3. Click "Ejecutar"

4. Abre consola (Ctrl+Enter)

5. Busca línea como:
   🔗 WEBHOOK URL (COPIA ESTO):
   https://script.google.com/macros/d/[ID]/useTriggerSource

6. COPIA esta URL exactamente
```

### Paso 4: Actualizar Formulario

```bash
1. Abre: FORMULARIO_FINAL_WEB_APP.html
   (con un editor de texto)

2. Busca (Ctrl+F): "const WEBHOOK_URL"

3. Reemplaza:
   ANTES: const WEBHOOK_URL = 'https://script.google.com/macros/d/1svzaUv7-Ts6oy0FnRCseL64zHaZpZq3MF9dzLUSsaIbLavOssIz7cHnY/useTriggerSource';
   
   DESPUÉS: const WEBHOOK_URL = 'https://script.google.com/macros/d/TU_ID_AQUI/useTriggerSource';

4. Ctrl+S (Guardar)
```

### Paso 5: Probar en Local

```bash
1. Abre FORMULARIO_FINAL_WEB_APP.html en navegador
   (Double-click en el archivo)

2. Completa TODOS los campos:
   - Nombre
   - Email
   - Área
   - Puesto
   - Proximidad (slider)
   - Herramientas (al menos una)
   - Tareas (al menos una)
   - Tarea repetitiva
   - Y el resto...

3. Click "Enviar Respuestas"

4. ESPERADO:
   ✅ ¡Respuestas Guardadas!
   Score: XX/100
   Nivel: 🟢/🟡/🔴

5. Abre Google Sheet:
   - Busca el Sheet "IA LAB Respuestas"
   - Pestaña "Respuestas"
   - Debería estar tu fila de datos

6. Verifica email:
   - Deberías recibir email de confirmación
   - (Puede tomar 1-2 minutos)
```

### Paso 6: Compartir con el equipo (LOCAL)

```bash
1. Guarda FORMULARIO_FINAL_WEB_APP.html
   en una carpeta compartida

2. Crea un alias o link:
   - Google Drive: Subir a carpeta compartida
   - OneDrive: Compartir link
   - Servidor interno: URL directa

3. Comparte link con:
   - Equipo de GrupoCESA
   - Pueden descargar y abrir localmente
   - O acceder desde link compartido
```

---

## 🌐 OPCIÓN 2: GITHUB PAGES (RECOMENDADO)

### Tiempo estimado: 10 minutos
### Complejidad: Fácil-Medio ⭐⭐

```
Ideal para: Distribución pública, URL profesional, HTTPS automático
Ventajas: HTTPS gratis, URL compartible, sin mantenimiento
Desventajas: Requiere cuenta GitHub, visible públicamente
```

### Paso 1: Crear repositorio GitHub

```bash
1. Abre: https://github.com/new

2. Rellena:
   Repository name: ia-lab-grupocesa
   (O el nombre que prefieras)
   
   Description: Relevamiento de madurez en IA
   
   Public: SÍ (para GitHub Pages)
   
   Initialize: 
   ☐ Add .gitignore
   ☐ Add license

3. Click "Create repository"
```

### Paso 2: Subir archivo

```bash
OPCIÓN A: Via web GitHub

1. En tu nuevo repo, click "Add file" → "Upload files"

2. Drag & drop: FORMULARIO_FINAL_WEB_APP.html

3. Rename a: index.html
   (Importante: GitHub Pages busca index.html)

4. Commit message: "Agregar formulario IA LAB"

5. Click "Commit changes"


OPCIÓN B: Via Git (línea de comandos)

# Instalar Git si no lo tienes
# https://git-scm.com/download

git clone https://github.com/TU_USUARIO/ia-lab-grupocesa.git
cd ia-lab-grupocesa

# Renombrar a index.html
cp FORMULARIO_FINAL_WEB_APP.html index.html

git add index.html
git commit -m "Agregar formulario IA LAB"
git push origin main
```

### Paso 3: Activar GitHub Pages

```bash
1. En tu repo GitHub:
   Settings → Pages

2. Source: 
   ├─ Deploy from a branch
   ├─ Branch: main
   └─ Folder: / (root)

3. Save

4. Espera 1 minuto

5. GitHub te mostrará:
   Your site is published at:
   https://tu-usuario.github.io/ia-lab-grupocesa/
```

### Paso 4: Compartir URL

```
Tu URL final:
https://tu-usuario.github.io/ia-lab-grupocesa/

Comparte con:
- Email: "Completa este formulario..."
- Slack: Pin el link
- WhatsApp: Envía la URL
- Google Drive: Link en documento
```

---

## 🏢 OPCIÓN 3: SERVIDOR PROPIO

### Tiempo estimado: 30 minutos
### Complejidad: Medio-Difícil ⭐⭐⭐

```
Ideal para: Control total, integración con sistemas existentes
Ventajas: Control total, integración fácil, privado
Desventajas: Requiere servidor, mantenimiento
```

### Paso 1: Opciones de Servidor

```
A) cPanel/Hosting compartido (recomendado)
   - GoDaddy, Namecheap, Bluehost
   - $5-15/mes
   - HTTPS incluido

B) VPS (Virtual Private Server)
   - DigitalOcean, Linode, Vultr
   - $5-20/mes
   - Más control

C) Google Cloud / AWS
   - Serverless (Firebase, Cloud Run)
   - Pay-as-you-go
   - Más complejo

D) Servidor interno GrupoCESA
   - Si existe infraestructura
   - Contactar IT
```

### Paso 2: Upload via FTP/SFTP

```bash
# Si usas cPanel:

1. Accede a cPanel
   (URL de tu hosting)

2. File Manager

3. Navega a: public_html/

4. Upload: FORMULARIO_FINAL_WEB_APP.html
   Renombra a: index.html

5. Tu URL será:
   https://tudominio.com/
   O
   https://tudominio.com/formulario/ (si lo pones en carpeta)

6. Test: Abre URL en navegador
```

### Paso 3: Asegurar HTTPS

```bash
# La mayoría de hostings incluyen SSL gratuito

1. cPanel → SSL/TLS

2. Auto-configure: 
   Busca tu dominio
   Click "Auto-configure"

3. Espera 5 minutos

4. Tu URL debería ser:
   https://tudominio.com (con candado)
```

### Paso 4: Apuntar dominio

```bash
# Si compraste dominio en Registrador distinto

1. Registrador (GoDaddy, Namecheap, etc):
   Manage DNS

2. Update Name Servers a:
   (Del hosting donde subiste archivo)

3. Espera 24-48 horas para propagación

4. Tu dominio apuntará a tu hosting
```

---

## ⚙️ CONFIGURACIÓN PRE-DEPLOYMENT

### Antes de publicar, verifica:

```bash
☐ Google Apps Script:
  ☐ setupAdmin() ejecutado
  ☐ Webhook URL en consola
  ☐ Google Sheet creado
  ☐ Publicado como "Aplicación web"

☐ Formulario HTML:
  ☐ WEBHOOK_URL reemplazada (línea ~1360)
  ☐ Colores GrupoCESA correctos
  ☐ Estructura HTML válida
  ☐ JavaScript sin errores

☐ Testing:
  ☐ Abre en navegador
  ☐ Completa formulario (todos los campos)
  ☐ Submit funciona
  ☐ Score se calcula
  ☐ Datos en Google Sheet
  ☐ Email de confirmación llega

☐ Google Sheet:
  ☐ Pestaña "Respuestas" existe
  ☐ Headers correctos (17 columnas)
  ☐ Score y Nivel se calculan
  ☐ Datos visibles

☐ Seguridad:
  ☐ No hay API keys en HTML
  ☐ No hay credentials hardcodeadas
  ☐ CORS habilitado en backend
  ☐ HTTPS si es pública
```

---

## 📤 DEPLOYMENT CHECKLIST

### Momento de publicar

```bash
# 15 MINUTOS ANTES DEL DEPLOYMENT

☐ Backup de Google Sheet
   (Download como CSV)

☐ Backup de código
   (Copiar CODIGO_APPS_SCRIPT_CORS_CORREGIDO.gs)

☐ Backup de formulario
   (Copiar FORMULARIO_FINAL_WEB_APP.html)

☐ Test final en ambiente local

☐ Revisar URLs en código

# 5 MINUTOS ANTES

☐ Notificar al equipo:
   "Formulario IA LAB se publica en X minutos"

☐ Preparar link a compartir

# EN EL MOMENTO

☐ Publicar/Activar

☐ Test en URL final

☐ Compartir con equipo

# 10 MINUTOS DESPUÉS

☐ Monitorear primeras respuestas

☐ Verificar emails llegan

☐ Verificar datos en Sheet

☐ Estar listo para troubleshoot
```

---

## 🔍 POST-DEPLOYMENT

### Monitoreo primeras 24 horas

```bash
CADA HORA:
☐ ¿Llegan respuestas a Sheet?
☐ ¿Se calculan scores correctamente?
☐ ¿Se envían emails?

ERRORES A BUSCAR:
❌ "Failed to fetch" → Webhook URL incorrecta
❌ No aparecen datos → Apps Script error
❌ No llega email → Límite Gmail superado
❌ Score = 0 → Fórmula de scoring con error

SI HAY ERROR:
1. Revisar console (F12) en navegador
2. Revisar logs en Google Apps Script
3. Revisar Sheet para patrones
4. Contactar con soporte
```

### Mantenimiento regular

```
DIARIAMENTE:
- Revisar nuevas respuestas
- Monitorear errores en logs

SEMANALMENTE:
- Exportar datos a CSV
- Backup del Sheet
- Revisar barreras críticas

MENSUALMENTE:
- Análisis de datos
- Actualizar documentación
- Planning de capacitación
```

---

## 🚨 ROLLBACK PLAN

### Si algo sale mal

```bash
STEP 1: STOP ACCEPTING RESPONSES
- Si URL está rota: Compartir mensaje "mantenimiento"
- Si datos corrupto: Pausar Sheet de recepción

STEP 2: DIAGNOSE
- Ver error en consola
- Revisar Apps Script logs
- Revisar Google Sheet

STEP 3: FIX
- Reemplazar código si es necesario
- Restaurar Sheet si es necesario
- Reconfigura webhook

STEP 4: TEST
- Prueba local
- Prueba en staging
- Valida datos

STEP 5: RE-LAUNCH
- Vuelve a activar
- Notifica al equipo
- Monitorea nuevamente

STEP 6: POSTMORTEM
- ¿Qué salió mal?
- ¿Cómo lo prevenimos?
- ¿Documentación faltante?
```

---

## 📊 CASOS DE USO POR DEPLOYMENT OPTION

### OPCIÓN 1: LOCAL
```
Caso: Pruebas internas, testing, grupo pequeño
Usuarios: < 20
Duración: 1-2 semanas
Acceso: Descarga manual o carpeta compartida
```

### OPCIÓN 2: GITHUB PAGES
```
Caso: Distribución pública, URL permanente
Usuarios: < 1000
Duración: Ilimitada
Acceso: Link compartible URL
```

### OPCIÓN 3: SERVIDOR PROPIO
```
Caso: Producción, integración sistema, uso prolongado
Usuarios: 100+
Duración: Ilimitada
Acceso: URL personalizada con dominio
```

---

## 🎯 DECISIÓN FINAL

**¿Cuál elegir?**

```
¿Quieres probar rápido?
→ OPCIÓN 1 (Local)

¿Quieres compartir fácilmente con URL?
→ OPCIÓN 2 (GitHub Pages)

¿Quieres control total y marca propia?
→ OPCIÓN 3 (Servidor propio)
```

---

## 📞 SOPORTE DEPLOYMENT

Si algo falla:

```
1. Revisar TROUBLESHOOTING_COMPLETO.md
2. Revisar console navegador (F12)
3. Revisar Google Apps Script logs
4. Verificar Webhook URL exacta
5. Contactar support si no resuelve
```

---

**Versión:** 1.0
**Última actualización:** Mayo 16, 2026
**Status:** ✅ Listo para producción
