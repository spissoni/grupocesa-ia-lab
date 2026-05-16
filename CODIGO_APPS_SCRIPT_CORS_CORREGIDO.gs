// ============================================================
// CÓDIGO GOOGLE APPS SCRIPT - VERSIÓN CON CORS
// ============================================================
// Este código RECIBE datos del formulario y los guarda en Google Sheet
// ¡CORS HABILITADO! Funciona desde cualquier origen
// ============================================================

const SHEET_RESPONSES = "Respuestas";

// ============================================================
// 1. SETUP INICIAL
// ============================================================

function setupAdmin() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Crear sheet si no existe
  createSheetIfNotExists(ss, SHEET_RESPONSES);
  
  // Headers en Respuestas
  const responsesSheet = ss.getSheetByName(SHEET_RESPONSES);
  responsesSheet.clear();
  responsesSheet.appendRow([
    'Timestamp',
    'Nombre',
    'Email',
    'Área',
    'Puesto',
    'Antigüedad',
    'Proximidad',
    'Herramientas',
    'Tareas',
    'Tarea Repetitiva',
    'Intereses',
    'Barreras',
    'Disponibilidad',
    'Horario',
    'Comentarios',
    'Score',
    'Nivel'
  ]);
  
  Logger.log('✅ Setup completado correctamente');
  return 'Setup completado';
}

function createSheetIfNotExists(ss, name) {
  const sheets = ss.getSheets();
  const sheetNames = sheets.map(s => s.getName());
  
  if (!sheetNames.includes(name)) {
    ss.insertSheet(name);
    Logger.log('✓ Sheet creada: ' + name);
  }
}

// ============================================================
// 2. HANDLE OPTIONS (Para CORS preflight)
// ============================================================

function doOptions(e) {
  return HtmlService.createHtmlOutput()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ============================================================
// 3. RECIBIR DATOS (Lo más importante)
// ============================================================

function doPost(e) {
  try {
    // Parsear datos JSON
    const data = JSON.parse(e.postData.contents);
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_RESPONSES);
    
    // ========== CALCULAR SCORE ==========
    let score = 0;
    
    // Área: +15 pts
    score += 15;
    
    // Proximidad: ×12 (0-5 × 12 = 0-60 pts)
    score += parseInt(data.proximidad || 0) * 12;
    
    // Herramientas: ×5 (max 25 pts)
    const herramientasCount = data.herramientas ? data.herramientas.length : 0;
    score += Math.min(herramientasCount * 5, 25);
    
    // Tareas: ×4 (max 20 pts)
    const tareasCount = data.tareas ? data.tareas.length : 0;
    score += Math.min(tareasCount * 4, 20);
    
    // Tarea repetitiva: 10 pts si > 50 caracteres, 5 si > 20
    const tareaLength = data.tareaRepetitiva ? data.tareaRepetitiva.length : 0;
    if (tareaLength > 50) {
      score += 10;
    } else if (tareaLength > 20) {
      score += 5;
    }
    
    // Intereses: ×3 (max 15 pts)
    const interesCount = data.interes ? data.interes.length : 0;
    score += Math.min(interesCount * 3, 15);
    
    // Asegurar que score esté entre 0-100
    score = Math.min(Math.max(score, 0), 100);
    
    // ========== DETERMINAR NIVEL ==========
    let level = '';
    if (score >= 67) {
      level = '🟢 Avanzado';
    } else if (score >= 34) {
      level = '🟡 Intermedio';
    } else {
      level = '🔴 Principiante';
    }
    
    // ========== GUARDAR EN SHEET ==========
    sheet.appendRow([
      new Date().toLocaleString('es-AR'),           // Timestamp
      data.nombre || '',                            // Nombre
      data.email || '',                             // Email
      data.area || '',                              // Área
      data.puesto || '',                            // Puesto
      data.antiguedad || '',                        // Antigüedad
      data.proximidad || '',                        // Proximidad
      data.herramientas ? data.herramientas.join('|') : '',  // Herramientas
      data.tareas ? data.tareas.join('|') : '',    // Tareas
      data.tareaRepetitiva || '',                   // Tarea repetitiva
      data.interes ? data.interes.join('|') : '',  // Intereses
      data.barreras ? data.barreras.join('|') : '',// Barreras
      data.disponibilidad || '',                    // Disponibilidad
      data.horario || '',                           // Horario
      data.comentarios || '',                       // Comentarios
      score,                                        // Score (calculado)
      level                                         // Nivel (calculado)
    ]);
    
    // ========== ENVIAR EMAIL AL PARTICIPANTE ==========
    sendConfirmationEmail(data.nombre, data.email, score, level);
    
    // ========== RETORNAR RESPUESTA CON HEADERS CORS ==========
    const output = ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Respuesta guardada correctamente en Google Sheet',
      nombre: data.nombre,
      score: score,
      level: level
    })).setMimeType(ContentService.MimeType.JSON);
    
    // Agregar headers CORS
    output.addHeader('Access-Control-Allow-Origin', '*');
    output.addHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    output.addHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    return output;
    
  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
    
    const output = ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
    
    output.addHeader('Access-Control-Allow-Origin', '*');
    output.addHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    output.addHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    return output;
  }
}

// ============================================================
// 4. ENVIAR EMAIL DE CONFIRMACIÓN
// ============================================================

function sendConfirmationEmail(nombre, email, score, level) {
  try {
    const asunto = '✅ Respuestas recibidas - Relevamiento IA LAB';
    
    const mensaje = `Hola ${nombre},

¡Gracias por completar el formulario de Relevamiento IA LAB!

Tus respuestas han sido procesadas correctamente.

Estado: ${level}
Puntuación: ${score}/100

Próximamente recibirás información sobre el taller personalizado para tu grupo.

Si tienes preguntas, no dudes en contactarnos.

Saludos,
Equipo GrupoCESA`;

    GmailApp.sendEmail(email, asunto, mensaje);
    Logger.log('✓ Email enviado a: ' + email);
  } catch (error) {
    Logger.log('⚠️ Error al enviar email: ' + error);
  }
}

// ============================================================
// 5. OBTENER WEBHOOK URL
// ============================================================

function getWebhookUrl() {
  const scriptId = ScriptApp.getScriptId();
  const webAppUrl = 'https://script.google.com/macros/d/' + scriptId + '/useTriggerSource';
  Logger.log('');
  Logger.log('═════════════════════════════════════════════');
  Logger.log('🔗 WEBHOOK URL (COPIA ESTO):');
  Logger.log('═════════════════════════════════════════════');
  Logger.log(webAppUrl);
  Logger.log('═════════════════════════════════════════════');
  Logger.log('');
  return webAppUrl;
}

// ============================================================
// FIN DEL CÓDIGO
// ============================================================
