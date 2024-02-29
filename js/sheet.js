const XLSX = require("xlsx");
const { decode_range, encode_cell } = XLSX.utils;
const config = require("./config");

const namesConfig = {
    sheetName: "Zeitnachweise",
    cells: {
        ticketNumber: "Vorgangsschlüssel",
        ticketTitle: "Vorgangszusammenfassung",
        hours: "Stunden",
        date: "Arbeitsdatum"
    }
};

module.exports = (file) => {
    const workbook = XLSX.readFile(file);
    const currentSheet = workbook.Sheets[namesConfig.sheetName];
    if (!currentSheet) throw new Error("No sheet found");
    const sheetRange = decode_range(currentSheet["!ref"]);
    const indices = getColumnsIndices(currentSheet, sheetRange.e.c);
    return createItems(currentSheet, indices, sheetRange);
}

function createItems(sheet, indices, range) {

    const result = [];

    for (var i = 1; i <= range.e.r; i++) {
        const date = sheet[encode_cell({ r: i, c: indices.date })];
        const ticketNumber = sheet[encode_cell({ r: i, c: indices.ticketNumber })];
        const ticketTitle = sheet[encode_cell({ r: i, c: indices.ticketTitle })];
        const hours = sheet[encode_cell({ r: i, c: indices.hours })];

        const payload = {
            'project_id': config.MOCO_PROJECT_ID,
            'task_id': config.MOCO_TASK_ID,
            'hours': hours.v,
            'description': ticketNumber.v + " " + ticketTitle.v,
            'date': new Date(date.w).toISOString().substr(0, 10)  // item.date.strftime('%Y-%m-%d')
        };

        result.push(payload);
    }
    return result;
}

function getColumnsIndices(sheet, maxColumn) {
    const indices = {};

    for (var column = 0; column <= maxColumn; column++) {
        const cell = sheet[encode_cell({ r: 0, c: column })];
        if (!cell) break;
        const value = cell.v;
        Object.entries(namesConfig.cells).forEach(([handle, name]) => {
            if (value && value.toLowerCase() == name.toLowerCase()) {
                indices[handle] = column;
            }
        });
    }
    return indices;
}