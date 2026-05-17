const SHEET_RESPONSES = "Respuestas";

function doPost(e) {
  try {
    const data = e.parameter;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_RESPONSES);

    let score = 15 + parseInt(data.proximidad || 0) * 12;
    const herramientas = (data.herramientas || '').split('|').filter(x => x).length;
    const tareas = (data.tareas || '').split('|').filter(x => x).length;
    const interes = (data.interes || '').split('|').filter(x => x).length;
    const tareaLen = (data.tareaRepetitiva || '').length;

    score += Math.min(herramientas * 5, 25);
    score += Math.min(tareas * 4, 20);
    score += (tareaLen > 50 ? 10 : tareaLen > 20 ? 5 : 0);
    score += Math.min(interes * 3, 15);
    score = Math.min(Math.max(score, 0), 100);

    const level = score >= 67 ? '🟢 Avanzado' : score >= 34 ? '🟡 Intermedio' : '🔴 Principiante';

    sheet.appendRow([
      new Date().toLocaleString('es-AR'),
      data.nombre || '',
      data.email || '',
      data.area || '',
      data.puesto || '',
      data.antiguedad || '',
      data.proximidad || '',
      data.herramientas || '',
      data.tareas || '',
      data.tareaRepetitiva || '',
      data.interes || '',
      data.barreras || '',
      data.disponibilidad || '',
      data.horario || '',
      data.comentarios || '',
      score,
      level,
      'Neutral',
      0
    ]);

    Logger.log('✅ Datos guardados: ' + data.nombre);
    return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({error: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_RESPONSES);
  const data = sheet.getDataRange().getValues();
  return ContentService.createTextOutput(JSON.stringify({data: data})).setMimeType(ContentService.MimeType.JSON);
}

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  let sheet = null;

  for (let s of sheets) {
    if (s.getName() === SHEET_RESPONSES) {
      sheet = s;
      break;
    }
  }

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_RESPONSES);
  }

  sheet.clear();
  sheet.appendRow(['Timestamp','Nombre','Email','Área','Puesto','Antigüedad','Proximidad','Herramientas','Tareas','Tarea Repetitiva','Intereses','Barreras','Disponibilidad','Horario','Comentarios','Score','Nivel','Sentimiento','SentimientoScore']);
  Logger.log('✅ Sheet listo');
}
