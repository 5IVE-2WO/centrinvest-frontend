import axios from "axios";

const api = axios.create({
    baseURL: "http://178.20.208.108:8000",
});

api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJkZW1vQGZpbmFuY2UuYXBwIiwiZXhwIjoxNzY1MDYzNDg1fQ._cW_Vgwzk93-pFVcMzGRCm-aES7btxZecG_5SySldyo`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
