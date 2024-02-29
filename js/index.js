const prompts = require("prompts");

const loadSheet = require("./sheet.js");
const render = require("./render.js");
const sendAll = require("./send.js");

const { argv } = process;
const file = argv[2];


(async () => {
    const result = loadSheet(file);
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

