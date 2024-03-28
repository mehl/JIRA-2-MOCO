import React from "react";
import Canvas from "drawille-canvas";
import colors from "ansi-colors";
import { Text } from "ink";

const addMidString = (s, m) => {
    const l = s.length;
    const ll = m.length;
    const p1 = Math.floor((l - ll) / 2);
    return s.substr(0, p1) + colors.white(m) + s.substr(p1 + ll);
};
export default ({ progress, hasError = false }) => {
    const size = 7 * 4;
    const r = Math.floor(size / 2) - 1;
    const c = new Canvas(size, size);
    for (var i = 0; i < 5; i++) {
        c.beginPath();
        c.arc(r, r, r - i / 2, -Math.PI / 2, Math.PI * 2 * progress - Math.PI / 2);
        c.closePath();
        c.stroke();
    }
    const circle = c.toString().split("\n");
    const h = Math.floor((circle.length - 1) / 2);
    const percent = Math.floor(progress * 100) + "%";
    circle[h] = addMidString(circle[h], percent);
    return <Text color={hasError ? "red" : "gray"}>
        {circle.join("\n")}
    </Text>;
};