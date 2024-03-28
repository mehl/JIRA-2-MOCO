import config from "../config";

const baseUrl = "https://fdce.mocoapp.com";

const endpoints = {
    projects: "/api/v1/projects",
    activities: "/api/v1/activities"
};

const mocoFetch = async (url, options) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + config.MOCO_API_KEY
    };
    const realOptions = { ...options, headers };

    return await fetch(url, realOptions);
};

export { mocoFetch, baseUrl, endpoints };