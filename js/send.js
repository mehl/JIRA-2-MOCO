const config = require("./config");
const Canvas = require("drawille-canvas");
const colors = require("ansi-colors");

const baseUrl = "https://fdce.mocoapp.com";

const endpoints = {
    projects: "/api/v1/projects",
    activities: "/api/v1/activities"
};

const renderProgress = (progress, hasError = false) => {
    if (progress > 0) {
        console.log("\u001b[6A")
    }
    const c = new Canvas(20, 20);
    for (var i = 0; i < 5; i++) {
        c.beginPath()
        c.arc(9, 9, 9 - i / 2, -Math.PI / 2, Math.PI * 2 * 1 - Math.PI / 2);
        c.closePath();
        c.stroke();

    }
    const circle = c.toString();
    console.log((hasError ? colors.red : colors.blue)(circle));
    const percent = Math.floor(progress * 100) + "%";
    console.log("\u001b[4A\u001b[2C" + percent.padStart(5) + "\n\n");

}


const sendit = async (item) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + config.MOCO_API_KEY
    }

    const payload = {
        'project_id': config.MOCO_PROJECT_ID,
        'task_id': config.MOCO_TASK_ID,
        'hours': item.hours,
        'description': item.description,
        'date': item.date
    };

    const url = baseUrl + endpoints.activities;
    const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
    });
    // const json = await response.json();
    if (!response.ok) throw new Error(response.statusText);
}

const sendAll = async (items) => {
    let lastI = 0;
    try {
        for (var i = 0; i < items.length; i++) {
            lastI = i;
            await sendit(items[i]);
            renderProgress(i / items.length);
        }
        renderProgress(i / items.length);
    } catch (e) {
        renderProgress(lastI / items.length, true);
        console.log(e);
    }
}

module.exports = sendAll;
