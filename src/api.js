import api from "../axios";

export const getExpensesLast3Month = async () => {
    try {
        const response = await api.get(
            "/analytics/expenses-last-3-months?email=demo@demo.com"
        );
        return response.data;
    } catch (err) {
        console.error("Ошибка запроса:", err);
    }
};

export const getForecastBalance = async () => {
    try {
        const response = await api.get("/forecast/balance");
        return response.data;
    } catch (err) {
        console.error("При запросе возникла ошибка: ", err);
    }
};

export const getBalance = async () => {
    try {
        const response = await api.get("/auth/balance");
        return response.data;
    } catch (err) {
        console.error("При запросе возникла ошибка: ", err);
    }
};

export const getBalanceHistory = async () => {
    try {
        const response = await api.get(
            "/analytics/balance-history?email=demo@demo.com"
        );
        return response.data;
    } catch (err) {
        console.error("При запросе возникла ошибка: ", err);
    }
};
