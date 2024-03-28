import React from "react";

import loadSheet from "./sheet.js";
import sendAll from "./send.tsx";
import ansiColors from "ansi-colors";
import { render, Box } from "ink";
import { Table } from "./components/Table.js";
import Prompt from "./components/Prompt.js";
import ShowConfig from "./components/ShowConfig.js";

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
    const { rerender, clear } = render(<></>);

    const promptSend = async (render) => {
        return new Promise((accept) => {
            const select = (selected) => {
                accept(selected);
            };
            render(<>
                <Table items={result} />
                <Box flexDirection="row" gap={3}>
                    <Prompt question="Fertig zum Senden?" choices={[
                        { title: 'Jetzt senden', value: true },
                        { title: 'Abbrechen', value: false }
                    ]}
                        preSelected={1}
                        onSelect={select}
                    />
                    <ShowConfig />
                </Box>
            </>);
        });
    };

    const doSend = await promptSend(rerender);
    if (!doSend) return;

    await sendAll(rerender, result);
})();

