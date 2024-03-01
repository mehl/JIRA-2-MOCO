const prompts = require("prompts");

const loadSheet = require("./sheet.js");
const render = require("./render.js");
const sendAll = require("./send.js");
const ansiColors = require("ansi-colors");

const { argv } = process;
const file = argv[2];

(async () => {
    let result;
    try {
        if (!file) throw new Error("Keine Datei angegeben");
        result = loadSheet(file);
    } catch (e) {
        console.log(ansiColors.red.inverse(" Datei konnte nicht geladen werden ") + "\n " + e.message);
        return;
    }

    render(result);

    const response = await prompts([
        {
            type: 'select',
            name: 'doSend',
            message: 'Fertig zum Senden',
            choices: [
                { title: 'Jetzt senden', value: true },
                { title: 'Abbrechen', value: false }
            ]
        }
    ]);
    if (!response.doSend) return;
    await sendAll(result);
})();

