// utils/excelExport.js

import * as XLSX from 'xlsx';

// Function to format current date and time for filename
const formatDate = () => {
    const now = new Date();
    const date = now.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    return date.replace(/ /g, '_').replace(/:/g, '-');
};

export const exportToExcel = (columns, data, moduleName) => {
    // Generate the Excel filename as current date and module name
    const filename = `${moduleName}_${formatDate()}.xlsx`;

    // Get column names for the header
    const columnNames = columns.map(col => col.title);

    // Convert the data into a format that Excel can understand
    const formattedData = data.map(item => {
        let row = {};
        columns.forEach((col, index) => {
            row[columnNames[index]] = item[col.dataIndex];
        });
        return row;
    });

    // Create a worksheet from the formatted data
    const ws = XLSX.utils.json_to_sheet(formattedData, { header: columnNames });

    // Create a new workbook and append the sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Write the file
    XLSX.writeFile(wb, filename);
};
