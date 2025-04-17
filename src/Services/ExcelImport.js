// Services/ExcelImport.js
import * as XLSX from 'xlsx';

/**
 * Reads an Excel file and converts its first sheet to JSON.
 * @param {File} file - The Excel file to be parsed.
 * @returns {Promise<Object[]>} - Parsed JSON array of rows.
 */
export const importExcelFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

            resolve(jsonData);
        };

        reader.onerror = (err) => {
            reject(err);
        };

        reader.readAsArrayBuffer(file);
    });
};
