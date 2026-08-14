// =====================================================
// GOOGLE APPS SCRIPT — DiyahQA Hub Kuesioner
// Deploy sebagai Web App, akses: Anyone
// Paste script ini di Extensions > Apps Script
// =====================================================

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);
    const role = data.role || 'Unknown';

    // Cari atau buat sheet sesuai role
    let sheetName = role.replace(/[^a-zA-Z0-9 ]/g, '').trim().substring(0, 30);
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // Tambah header jika sheet kosong
    if (sheet.getLastRow() === 0) {
      const headers = ['Timestamp', 'Role'].concat(Object.keys(data).filter(k => k !== 'role' && k !== 'waktu'));
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#1a73e8').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    // Tambah data baru
    const row = [new Date(), role].concat(Object.keys(data).filter(k => k !== 'role' && k !== 'waktu').map(k => data[k] || ''));
    sheet.appendRow(row);

    // Auto-resize kolom
    sheet.autoResizeColumns(1, sheet.getLastColumn());

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', message: 'Data berhasil disimpan' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'DiyahQA Hub Kuesioner API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
