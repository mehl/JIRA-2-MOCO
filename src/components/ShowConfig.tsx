import React, { useState, useEffect } from "react";
import Canvas from "drawille-canvas";
import colors from "ansi-colors";
import { Text, Box } from "ink";
import config from "../config";
import { baseUrl, endpoints, mocoFetch } from "../api/endpoints";

export default ({ }) => {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        (async () => {
            const url = baseUrl + endpoints.projects + "/assigned";
            const response = await mocoFetch(url);
            const json = await response.json();
            setProjects(json);
        })();
    }, []);

    return <>
        <Box flexDirection="column" padding={1}>
            <Text color="blue">Current Configuration</Text>
            <Box>
                <Box width="25">
                    <Text>MOCO Project</Text>
                </Box>
                <Text>
                    {config.MOCO_PROJECT_ID}
                </Text>
            </Box>
            <Box>
                <Box width="25">
                    <Text>MOCO Task</Text>
                </Box>
                <Text>
                    {config.MOCO_TASK_ID}
                </Text>
            </Box>
        </Box>
        <Box flexDirection="column" padding={1}>
            <Text color="blue">Assigned projects</Text>
            {projects.map((project) => {
                return <>
                    <Box gap={1}>
                        <Box width="15">
                            <Text>{project.id}</Text>
                        </Box>
                        <Text>
                            {project.name}
                        </Text>
                    </Box>
                    {project.tasks.map((task) => {
                        return <Box gap={1}>
                            <Box width="15" paddingLeft={3}>
                                <Text>{task.id}</Text>
                            </Box>
                            <Text>
                                {task.name}
                            </Text>
                        </Box>;
                    })}
                </>;
            })}
        </Box>
    </>;
};