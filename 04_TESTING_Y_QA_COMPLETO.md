# 🧪 TESTING & QA - IA LAB GRUPOCESA

## Casos de prueba para validación

---

## 📋 TEST CASES

### TC-001: Submit básico (Happy Path)

```
Descripción: Usuario completa todo correctamente
Pasos:
1. Abrir formulario
2. TAB 1:
   - Nombre: "Juan Pérez"
   - Email: "juan@email.com"
   - Área: "Desarrollo"
   - Puesto: "Senior Dev"
   - Antigüedad: "2-5 años"
3. Click "Siguiente"
4. TAB 2:
   - Proximidad: 4 (slider)
   - Herramientas: ChatGPT, Claude, Copilot
   - Tareas: Código, Análisis
   - Tarea repetitiva: "Revisar código diariamente"
5. Click "Siguiente"
6. TAB 3:
   - Intereses: Prompts, Integraciones
   - Barreras: Privacidad
   - Disponibilidad: "Sí, con ajustes"
   - Horario: "Mañana"
   - Comentarios: "Me interesa aprender"
7. Click "Enviar"

Expected:
✅ No hay errores
✅ "Respuestas Guardadas" aparece
✅ Score 50-80 (Intermedio/Avanzado)
✅ Nivel 🟡 o 🟢
✅ Email recibido en 2 minutos
✅ Datos en Google Sheet
```

### TC-002: Campos obligatorios vacíos

```
Descripción: Validación de campos requeridos

Prueba A: Nombre vacío
- Dejar nombre en blanco
- Click "Siguiente"
Expected: ❌ Error "Nombre requerido"

Prueba B: Email inválido
- Email: "noesunmail"
- Click "Siguiente"
Expected: ❌ Error "Email inválido"

Prueba C: Sin herramientas seleccionadas
- No marcar ninguna herramienta
- Click "Siguiente"
Expected: ❌ Error "Selecciona al menos una"

Prueba D: Sin área seleccionada
- Dejar área vacía
- Click "Siguiente"
Expected: ❌ Error "Selecciona área"
```

### TC-003: Campos "Otro" customizables

```
Descripción: Probar campos dinámicos con "Otro"

Prueba A: Herramientas - Otro
1. TAB 2
2. Seleccionar "Otro" en herramientas
3. Debería aparecer textbox
4. Escribir: "ChatGPT Pro"
5. Enviar
Expected: ✅ Se guarda "Otro: ChatGPT Pro"

Prueba B: Tareas - Otro
1. TAB 2
2. Seleccionar "Otro" en tareas
3. Debería aparecer textbox
4. Escribir: "Generar imágenes"
5. Enviar
Expected: ✅ Se guarda "Otro: Generar imágenes"
```

### TC-004: Slider de Proximidad

```
Descripción: Probar interacción slider

Prueba A: Valor mínimo
- Mover slider a 0
- Debería mostrar "No la uso nunca"
- Enviar
Expected: ✅ Score bajo

Prueba B: Valor máximo
- Mover slider a 5
- Debería mostrar "Integrada en mi día"
- Enviar
Expected: ✅ Score alto

Prueba C: Valor intermedio
- Mover slider a 2
- Debería mostrar "Uso ocasional"
- Enviar
Expected: ✅ Score medio
```

### TC-005: Score Calculation

```
Descripción: Validar cálculo de score

Test Data 1: Principiante
- Área: Desarrollo (+15)
- Proximidad: 0 (×12 = 0)
- Herramientas: 1 (×5 = 5)
- Tareas: 1 (×4 = 4)
- Tarea rep: 10 chars (+5)
- Intereses: 0 (×3 = 0)
Expected Score: 15+0+5+4+5+0 = 29 (🔴)

Test Data 2: Intermedio
- Área: Desarrollo (+15)
- Proximidad: 3 (×12 = 36)
- Herramientas: 4 (×5 = 20)
- Tareas: 3 (×4 = 12)
- Tarea rep: 60 chars (+10)
- Intereses: 3 (×3 = 9)
Expected Score: 15+36+20+12+10+9 = 102 → capped at 100
Expected Level: 🟢 Avanzado

Test Data 3: Intermedio
- Área: Comercial (+15)
- Proximidad: 2 (×12 = 24)
- Herramientas: 2 (×5 = 10)
- Tareas: 2 (×4 = 8)
- Tarea rep: 40 chars (+10)
- Intereses: 2 (×3 = 6)
Expected Score: 15+24+10+8+10+6 = 73 (🟢)
Expected Level: 🟢 Avanzado
```

### TC-006: Navegación entre tabs

```
Descripción: Probar botones Anterior/Siguiente

Prueba A: Forward
1. Llenar TAB 1
2. Click "Siguiente"
3. Debería ir a TAB 2
4. Progress: ① → ②
Expected: ✅ Navegación suave

Prueba B: Backward
1. En TAB 2
2. Click "Anterior"
3. Debería ir a TAB 1
4. Datos deberían persistir
Expected: ✅ Datos guardados en memoria

Prueba C: Reset después de envío
1. Completar y enviar
2. Ver "Respuestas Guardadas"
3. Click "Completar otro formulario"
4. Debería volver a TAB 1 vacío
Expected: ✅ Limpia formulario
```

### TC-007: Responsive Design

```
Descripción: Probar en diferentes tamaños

Mobile (iPhone SE - 375px):
Expected:
✅ Texto legible
✅ Botones tocables
✅ Form fields grandes
✅ Sin scroll horizontal

Tablet (iPad - 768px):
Expected:
✅ Layout optimizado
✅ Dos columnas donde aplique
✅ Botones bien espaciados

Desktop (1920px):
Expected:
✅ Max-width 900px
✅ Centrado
✅ Completo visible
```

### TC-008: Email Confirmation

```
Descripción: Validar emails de confirmación

Prueba A: Email recibido
1. Llenar formulario con email real
2. Submit
3. Esperar 2-5 minutos
4. Revisar inbox

Expected:
✅ Email recibido
✅ Subject: "✅ Respuestas recibidas - Relevamiento IA LAB"
✅ Body contiene:
  - Nombre del usuario
  - Score
  - Nivel
  - Mensaje de confirmación

Prueba B: Email en spam
- Si no aparece en inbox
- Buscar en spam/promotions
Expected: Debería estar ahí (marcar como no spam)
```

### TC-009: Google Sheet Sync

```
Descripción: Validar sincronización con Sheet

Prueba A: Dato aparecer en Sheet
1. Submit formulario
2. Abrir Google Sheet
3. Pestaña "Respuestas"
4. Ver última fila
Expected:
✅ Nueva fila con datos
✅ Score calculado
✅ Nivel mostrado
✅ Email correcto
✅ Timestamp válido

Prueba B: Múltiples respuestas
1. Submit 3 formularios diferentes
2. Ver Sheet
Expected:
✅ 3 filas nuevas
✅ Cada una con datos distintos
✅ Scores diferentes (si corresponde)

Prueba C: Datos completos
- Verificar todas las 17 columnas tienen datos
Expected:
✅ Ninguna columna vacía (excepto comentarios si opcional)
```

### TC-010: Error Handling

```
Descripción: Probar manejo de errores

Prueba A: Webhook URL inválida
- En HTML: cambiar WEBHOOK_URL a algo inválido
- Submit
Expected: ❌ "Error de conexión: Failed to fetch"

Prueba B: Sin conexión a internet
- Desactivar WiFi/internet
- Enviar formulario
Expected: ❌ "Error de conexión"

Prueba C: Google Sheet no existe
- Eliminar Sheet "Respuestas"
- Enviar formulario
Expected: ❌ Error en backend (revisar logs)

Prueba D: Apps Script timeout
- Si Apps Script tarda > 30 segundos
Expected: ⚠️ Request timeout
```

---

## 📊 TEST DATA MOCK

### Conjunto A: Principiante

```json
{
  "nombre": "Carlos García",
  "email": "carlos@empresa.com",
  "area": "Mesa de Ayuda",
  "puesto": "Support Specialist",
  "antiguedad": "< 6 meses",
  "proximidad": "0",
  "herramientas": ["ChatGPT"],
  "tareas": ["Redacción"],
  "tareaRepetitiva": "Responder tickets repetitivos",
  "interes": ["Prompts"],
  "barreras": ["No sé por dónde empezar", "Miedo perder job/skills"],
  "disponibilidad": "Sí, disponibilidad total",
  "horario": "Tarde",
  "comentarios": "Tengo miedo de quedar obsoleto"
}

Expected Score: ~20-30 (🔴 Principiante)
```

### Conjunto B: Intermedio

```json
{
  "nombre": "María López",
  "email": "maria@empresa.com",
  "area": "Customer Success",
  "puesto": "Account Manager",
  "antiguedad": "2-5 años",
  "proximidad": "3",
  "herramientas": ["ChatGPT", "Claude", "Gemini"],
  "tareas": ["Redacción", "Resumen", "Búsqueda"],
  "tareaRepetitiva": "Redactar respuestas a clientes de manera más eficiente",
  "interes": ["Prompts", "Casos uso", "IA en Ventas"],
  "barreras": ["Privacidad/seguridad"],
  "disponibilidad": "Sí, con ajustes",
  "horario": "Flexible",
  "comentarios": "Me gustaría aplicar IA en mis procesos de ventas"
}

Expected Score: ~45-55 (🟡 Intermedio)
```

### Conjunto C: Avanzado

```json
{
  "nombre": "Roberto Fernández",
  "email": "roberto@empresa.com",
  "area": "Desarrollo",
  "puesto": "Lead Developer",
  "antiguedad": "> 5 años",
  "proximidad": "5",
  "herramientas": ["ChatGPT", "Claude", "DeepSeek", "Copilot", "Perplexity"],
  "tareas": ["Código", "Análisis datos", "Visual", "Diseño"],
  "tareaRepetitiva": "Generar documentación, refactorizar código, crear componentes React",
  "interes": ["Prompts", "Seguridad", "Integraciones", "IA en Procesos"],
  "barreras": [],
  "disponibilidad": "Flexible",
  "horario": "Flexible",
  "comentarios": "Quiero llevar la IA a un nuevo nivel en nuestros productos"
}

Expected Score: ~85-95 (🟢 Avanzado)
```

---

## ✅ CHECKLIST PRE-PRODUCCIÓN

```
ANTES DE PUBLICAR:

☐ Frontend Testing
  ☐ TC-001: Happy path funciona
  ☐ TC-002: Validación de campos
  ☐ TC-003: Campos dinámicos "Otro"
  ☐ TC-004: Slider funciona
  ☐ TC-006: Navegación entre tabs
  ☐ TC-007: Responsive (probar 3 tamaños)

☐ Backend Testing
  ☐ TC-005: Score calculation correcto
  ☐ TC-008: Email llega
  ☐ TC-009: Datos en Sheet
  ☐ Verificar logs en Apps Script

☐ Integration Testing
  ☐ Webhook URL correcta
  ☐ CORS headers presentes
  ☐ Google Sheet creado
  ☐ setupAdmin() ejecutado

☐ Error Handling
  ☐ TC-010: Errores manejados
  ☐ Mensajes claros al usuario
  ☐ No errores JavaScript (F12 console)

☐ Production Ready
  ☐ Sin credenciales en código
  ☐ Sin API keys expuestas
  ☐ URL webhook correcta
  ☐ HTTPS si es público
  ☐ Documentación completa
```

---

## 🔍 DEBUGGING GUIDE

### Si falla TC-001 (Submit)

```
1. Revisar F12 Console
   └─ ¿Error de fetch?
   └─ ¿Error de JSON?

2. Revisar WEBHOOK_URL
   └─ ¿URL correcta?
   └─ ¿Publicado como Web App?
   └─ ¿CORS habilitado?

3. Revisar Google Apps Script
   └─ ¿setupAdmin() ejecutado?
   └─ ¿Código sin errores?
   └─ ¿Publicado como "Aplicación web"?

4. Revisar Google Sheet
   └─ ¿Existe "Respuestas"?
   └─ ¿Headers presentes?
```

### Si falla TC-008 (Email)

```
1. Verificar inbox
   └─ ¿Está en spam?
   └─ ¿Llegó tarde?

2. Revisar Google Apps Script logs
   └─ ¿Error al enviar?
   └─ ¿Límite de emails superado?

3. Revisar datos del Sheet
   └─ ¿Email correcto?
   └─ ¿Datos guardados?

4. Reintentar
   └─ Esperar 5 minutos
   └─ Probar con otro email
```

### Si falla TC-005 (Score)

```
1. Revisar Google Sheet
   └─ ¿Score calculado?
   └─ ¿Valor correcto?

2. Revisar Apps Script
   └─ Función calculateScore()
   └─ ¿Fórmula correcta?

3. Crear test manual
   └─ Datos conocidos
   └─ Calcular score esperado
   └─ Comparar con real

4. Revisar logs
   └─ Logger.log() en calculateScore()
```

---

## 📈 PERFORMANCE BENCHMARKS

### Expected Times

```
Page Load: < 1 segundo
- HTML parse: 100ms
- CSS render: 150ms
- JS execution: 300ms
- Interactive: 250ms

Form Submit: 3-6 segundos
- Request: 10ms
- Server processing: 2000-3000ms
- Email send: 1000-2000ms
- Response: 500ms

Email Delivery: 1-5 minutos
- Gmail queue: Instant
- Delivery: 1-5 min
```

---

## 🐛 BUGS CONOCIDOS

```
❌ Si no hay bugsbug_1: "Failed to fetch"
   Causa: Webhook URL incorrecta
   Fix: Reemplazar con URL correcta
   Status: RESUELTO con CORS headers

No hay bugs conocidos en v1.0

Si encuentras algo, reportar:
- Descripción clara
- Pasos para reproducir
- Screenshot/logs
```

---

## 🎯 CRITERIOS DE ACEPTACIÓN

```
✅ FUNCIONAL si:
- TC-001 pasa (happy path)
- TC-002 pasa (validación)
- TC-005 pasa (scoring)
- TC-008 pasa (email)
- TC-009 pasa (Sheet sync)

✅ PRODUCCIÓN si:
- Todos los TC pasan
- No hay errores en console
- Responsive en 3 tamaños
- Email llega consistentemente
- Score siempre correcto

✅ LISTO PARA ESCALAR si:
- 10+ usuarios concurrent sin problemas
- 100+ respuestas sin lentitud
- Cero downtime
- Emails 100% delivery
```

---

**Versión:** 1.0
**Última actualización:** Mayo 16, 2026
**Status:** ✅ Todos los tests diseñados

Ejecutar estos tests antes de deployment.
