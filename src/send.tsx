import React, { useState } from "react";
import { render, Box, Text } from "ink";
import config from "./config";
import Progress from "./components/Progress";
import { Table } from "./components/Table";

import { endpoints, baseUrl, mocoFetch } from "./api/endpoints";

const sendit = async (item) => {
    const payload = {
        'project_id': config.MOCO_PROJECT_ID,
        'task_id': config.MOCO_TASK_ID,
        'hours': item.hours,
        'description': item.description,
        'date': item.date
    };

    const url = baseUrl + endpoints.activities;
    const response = await mocoFetch(url, {
        method: "POST",
        body: JSON.stringify(payload)
    });
    // const json = await response.json();
    if (!response.ok) throw new Error(response.statusText);
};

let setCurrentIndex = undefined;
let setCurrentError = undefined;

const RenderProgressView = ({ items, length }) => {
    const [index, setIndex] = useState(0);
    const [error, setError] = useState(undefined);
    setCurrentIndex = setIndex;
    setCurrentError = setError;
    return <>
        <Box flexDirection="column" padding={2} gap={2}>
            <Box justifyContent="center">
                <Progress progress={index / items.length} hasError={error} />
            </Box>
            <Table items={items} offset={index} limit={1} />
            {error &&
                <Box borderStyle="single" borderColor="red">
                    <Text>
                        {error.message}
                    </Text>
                </Box>}
        </Box>
    </>;
};

const sendAll = async (render, items) => {
    render(<RenderProgressView items={items} />);
    try {
        for (var i = 0; i < items.length; i++) {
            setCurrentIndex(i);
            await sendit(items[i]);
            //await new Promise(accept => setTimeout(accept, 100));
        }
        setCurrentIndex(items.length);
    } catch (e) {
        setCurrentError(e);
    }
};

export default sendAll;
