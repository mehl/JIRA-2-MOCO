import React, { useState } from "react";
import { Box, Text, useInput } from "ink";

export default ({ question, choices, preSelected = 0, onSelect }) => {
    const [selected, setSelected] = useState(preSelected);
    useInput((input, key) => {
        if (key.upArrow) setSelected(selected <= 0 ? choices.length - 1 : selected - 1);
        if (key.downArrow) setSelected(selected >= choices.length - 1 ? 0 : selected + 1);
        if (key.return && onSelect) onSelect(choices[selected].value);
    });

    return <Box flexDirection="row" gap={2} borderStyle="bold" borderColor="blue" paddingX={2}>
        <Text color="white">
            {" " + question + " "}
        </Text>
        <Box flexDirection="column" gap={0}>
            {choices.map(({ title, value }, index) => {
                return <Box key={index} gap={1}>
                    <Text color="blue">
                        {index == selected ? "➤" : " "}
                    </Text>
                    <Text color="white" dimColor={index != selected}>
                        {title}
                    </Text>
                </Box>;
            })}
        </Box>
    </Box>;
};