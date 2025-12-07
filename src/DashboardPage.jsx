import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import MenuСomponent from "./MenuСomponent.jsx";
import MainComponent from "./MainComponent.jsx";
import AIPanel from "./AIPanel.jsx";
import ViewSubsection from "./ViewSubsection.jsx";
import api from "../axios";
import { getExpensesLast3Month } from "./api.js";

export default function DashboardPage() {
    const [active, setActive] = useState("Главная");
    const [categoryMonth, setCategoryMonth] = useState({});
    const [allTransactions, setAllTransactions] = useState();

    const getAllTransactions = async () => {
        try {
            const response = await api.get("/transactions");
            return response.data;
        } catch (err) {
            console.error("Ошибка запроса:", err);
        }
    };

    useEffect(() => {
        getExpensesLast3Month().then((res) => setCategoryMonth(res));
        getAllTransactions().then((res) =>
            setAllTransactions(res.transactions)
        );
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                maxWidth: "99vw",
                bgcolor: "#f6f7fb",
                flexDirection: { xs: "column", sm: "column", md: "row" },
                // bgcolor: "#ea0000ff",
                p: { xs: 2, md: 2, lg: 2 },
            }}
        >
            <MenuСomponent active={active} setActive={setActive} />

            {/* Контент главной страницы */}
            <Box
                sx={{
                    pl: 2,
                    pr: 2,
                    mb: 4,
                }}
            >
                {active == "Главная" && allTransactions !== undefined ? (
                    <MainComponent
                        allTransactions={allTransactions}
                        setAllTransactions={setAllTransactions}
                    />
                ) : (
                    <></>
                )}
                {active == "Транзакции" ? (
                    <ViewSubsection
                        categoryMonth={categoryMonth}
                        allTransactions={allTransactions}
                        setAllTransactions={setAllTransactions}
                    />
                ) : (
                    <></>
                )}
            </Box>

            {/* Если мобилка AI внизу */}
            <Box
                sx={{
                    maxWidth: 250,
                    display: {
                        xs: "block",
                        sm: "block",
                        md: "none",
                        lg: "none",
                        xl: "none",
                    },
                    pl: 2,
                }}
            >
                <AIPanel />
            </Box>

            {/* Если десктоп, то справа */}
            <Box
                sx={{
                    maxWidth: 250,
                    display: {
                        xs: "none",
                        sm: "none",
                        md: "block",
                        lg: "block",
                        xl: "block",
                    },
                }}
            >
                <AIPanel />
            </Box>
        </Box>
    );
}
