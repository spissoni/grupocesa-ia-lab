const SHEET_RESPONSES = "Respuestas";
const ADMIN_TOKEN = "GRUPOCESA2026";

function setupAdmin() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  createSheetIfNotExists(ss, SHEET_RESPONSES);
  const responsesSheet = ss.getSheetByName(SHEET_RESPONSES);
  responsesSheet.clear();
  responsesSheet.appendRow(['Timestamp','Nombre','Email','Área','Puesto','Antigüedad','Proximidad','Herramientas','Tareas','Tarea Repetitiva','Intereses','Barreras','Disponibilidad','Horario','Comentarios','Score','Nivel','Sentimiento','SentimientoScore']);
  Logger.log('✅ Setup completado - 19 columnas creadas');
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

function analyzeSentiment(text) {
  if (!text || text.trim().length === 0) {
    return { label: 'Neutral', score: 0 };
  }
  const lower = text.toLowerCase();
  const positivos = ['excelente', 'bueno', 'buena', 'interesante', 'útil', 'util','aprender', 'crecer', 'mejorar', 'entusiasmado', 'ganas', 'oportunidad','innovación', 'innovacion', 'ansioso', 'feliz', 'contento', 'avanzar','positivo', 'entusiasmo', 'emocionado', 'éxito', 'exito', 'motivado','inspirado', 'potencial', 'efectivo', 'eficiente', 'rápido', 'rapido','facilidad', 'fácil', 'facil'];
  const negativos = ['miedo', 'difícil', 'dificil', 'complicado', 'problema', 'preocupación','preocupación', 'perder', 'prohibido', 'no sé', 'no se', 'barrera','frena', 'bloqueado', 'resistencia', 'inseguro', 'complejo', 'imposible','malo', 'mala', 'peor', 'fracaso', 'fracasa', 'lento', 'lentitud','incompetencia', 'confusión', 'confusión', 'frustración', 'frustración','desmoralizado', 'abrumado', 'atrapado', 'estancado'];
  let pos = 0, neg = 0;
  positivos.forEach(w => { if (lower.includes(w)) pos++; });
  negativos.forEach(w => { if (lower.includes(w)) neg++; });
  const total = pos + neg;
  if (total === 0) {
    return { label: 'Neutral', score: 0 };
  }
  const score = (pos - neg) / total;
  if (score > 0.1) {
    return { label: 'Positivo', score: parseFloat(score.toFixed(2)) };
  }
  if (score < -0.1) {
    return { label: 'Negativo', score: parseFloat(score.toFixed(2)) };
  }
  return { label: 'Neutral', score: parseFloat(score.toFixed(2)) };
}

function doOptions(e) {
  return HtmlService.createHtmlOutput().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doGet(e) {
  try {
    if (!e || !e.parameter || e.parameter.token !== ADMIN_TOKEN) {
      return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Unauthorized - Token inválido'})).setMimeType(ContentService.MimeType.JSON);
    }
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_RESPONSES);
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Sheet not found'})).setMimeType(ContentService.MimeType.JSON);
    }
    const rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({success: true, data: [], headers: rows[0] || [], total: 0})).setMimeType(ContentService.MimeType.JSON);
    }
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => { obj[h] = row[i]; });
      return obj;
    });
    return ContentService.createTextOutput(JSON.stringify({success: true, data: data, headers: headers, total: data.length})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('❌ Error en doGet: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_RESPONSES);
    let score = 0;
    score += 15;
    score += parseInt(data.proximidad || 0) * 12;
    const herramientasCount = data.herramientas ? data.herramientas.length : 0;
    score += Math.min(herramientasCount * 5, 25);
    const tareasCount = data.tareas ? data.tareas.length : 0;
    score += Math.min(tareasCount * 4, 20);
    const tareaLength = data.tareaRepetitiva ? data.tareaRepetitiva.length : 0;
    if (tareaLength > 50) {
      score += 10;
    } else if (tareaLength > 20) {
      score += 5;
    }
    const interesCount = data.interes ? data.interes.length : 0;
    score += Math.min(interesCount * 3, 15);
    score = Math.min(Math.max(score, 0), 100);
    let level = '';
    if (score >= 67) {
      level = '🟢 Avanzado';
    } else if (score >= 34) {
      level = '🟡 Intermedio';
    } else {
      level = '🔴 Principiante';
    }
    const fullText = (data.comentarios || '') + ' ' + (data.tareaRepetitiva || '');
    const sentiment = analyzeSentiment(fullText);
    sheet.appendRow([new Date().toLocaleString('es-AR'),data.nombre || '',data.email || '',data.area || '',data.puesto || '',data.antiguedad || '',data.proximidad || '',data.herramientas ? data.herramientas.join('|') : '',data.tareas ? data.tareas.join('|') : '',data.tareaRepetitiva || '',data.interes ? data.interes.join('|') : '',data.barreras ? data.barreras.join('|') : '',data.disponibilidad || '',data.horario || '',data.comentarios || '',score,level,sentiment.label,sentiment.score]);
    sendConfirmationEmail(data.nombre, data.email, score, level);
    return ContentService.createTextOutput(JSON.stringify({success: true, message: 'Respuesta guardada correctamente', nombre: data.nombre, score: score, level: level, sentimiento: sentiment.label})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

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

function getWebhookUrl() {
  const scriptId = ScriptApp.getScriptId();
  const webAppUrl = 'https://script.google.com/macros/d/' + scriptId + '/exec';
  Logger.log('═════════════════════════════════════════════');
  Logger.log('🔗 WEBHOOK URL:');
  Logger.log(webAppUrl);
  Logger.log('═════════════════════════════════════════════');
  return webAppUrl;
}
