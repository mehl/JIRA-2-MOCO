const Canvas = require("drawille-canvas");
const colors = require("ansi-colors");

const terminalCols = process.stdout.columns;
const colConfig = [15, 15, 10, terminalCols - 60, 15];

const padChar = (() => {
    const c = new Canvas(2, 4);
    c.beginPath();
    c.moveTo(0, 3);
    c.lineTo(1, 3);
    c.closePath();
    c.stroke();
    return c.toString().substr(0, 1);
})();

const sepChar = (() => {
    const c = new Canvas(2, 4);
    c.beginPath();
    c.moveTo(0, 3);
    c.lineTo(1, 3);
    c.closePath();
    c.stroke();
    c.beginPath();
    c.moveTo(1, 0);
    c.lineTo(1, 3);
    c.closePath();
    c.stroke();
    return c.toString().substr(0, 1);

})();

const sepOnlyChar = (() => {
    const c = new Canvas(2, 4);
    c.beginPath();
    c.moveTo(1, 0);
    c.lineTo(1, 3);
    c.closePath();
    c.stroke();
    return c.toString().substr(0, 1);
})();


module.exports = (result) => {

    console.log(colors.blueBright.bold(table(["Projekt ID", "Task ID", "Stunden", "Beschreibung", "Datum"], " ", sepOnlyChar)));

    console.log(table(["", "", "", "", ""], padChar, sepChar));

    let sum = 0;
    for (var item of result) {
        console.log(table([item.project_id, item.task_id, item.hours, item.description, item.date], padChar, sepChar));
        sum += item.hours;
    }
    console.log(table(["", "", "", "", ""], padChar, sepChar));
    console.log(colors.blueBright.bold(table(["", "", sum, "", ""], " ", sepOnlyChar)));
}

function table(cols, padChar = " ", sepChar = " ") {
    let result = "";
    for (var i = 0; i < cols.length; i++) {
        const s = cols[i] + "";
        const pad = colConfig[i];
        result += colors.blackBright(padChar);
        result += (cols[i] + "");
        if ((s.length + 2) < pad) result += colors.blackBright(padChar.repeat(pad - s.length - 2));
        result += colors.blackBright(sepChar);
    }
    return result;
}