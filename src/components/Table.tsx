import React from "react";
import Canvas from "drawille-canvas";
import colors from "ansi-colors";
import { Box, Text } from "ink";

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


export const Table = ({ items, offset = 0, limit = 500 }) => {
    let sum = 0;
    for (var item of items) {
        sum += item.hours;
    }

    return <Box height={Math.min(limit, items.length) + 4}>
        <Text>
            {colors.blueBright.bold(table_row(["Projekt ID", "Task ID", "Stunden", "Beschreibung", "Datum"], " ", sepOnlyChar))}
            {"\n"}
            {table_row(["", "", "", "", ""], padChar, sepChar)}
            {"\n"}
            {items.map((item, index) => {
                if (index < offset || index >= (offset + limit)) return <React.Fragment key={index}></React.Fragment>;
                return <React.Fragment key={index}>
                    {table_row([item.project_id, item.task_id, item.hours, item.description, item.date], padChar, sepChar)}
                    {"\n"}
                </React.Fragment>;
            })}
            {table_row(["", "", "", "", ""], padChar, sepChar)}
            {"\n"}
            {colors.blueBright.bold(table_row(["", "", sum, "", ""], " ", sepOnlyChar))}
        </Text>
    </Box>;
};

function table_row(cols, padChar = " ", sepChar = " ") {
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