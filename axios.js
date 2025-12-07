import axios from "axios";

const api = axios.create({
    baseURL: "http://178.20.208.108:8000",
});

api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1IiwiZW1haWwiOiJkZW1vQGRlbW8uY29tIn0.DNA9QZq8b7jpbChjxG8SQ_bUMN-Jp6s_MvH2SFkpJiA`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
