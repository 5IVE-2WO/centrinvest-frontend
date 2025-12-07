import { Box, Typography, Paper, Alert, Button } from "@mui/material";
import ViewSubsection from "./ViewSubsection.jsx";
import SimpleLineChart from "./SimpleLineChart.jsx";
import ListTransaction from "./ListTransaction.jsx";
import { getBalance, getForecastBalance, getBalanceHistory } from "./api.js";
import { useEffect, useState } from "react";

export default function MainComponent({ allTransactions, setAllTransactions }) {
    const [balance, setBalance] = useState(0);
    const [forecastBalance, setForecastBalance] = useState(0);
    const [recommendations, setRecommendations] = useState(0);
    const [balanceHistory, setBalanceHistory] = useState(0);

    useEffect(() => {
        getBalance().then((balance) => setBalance(balance.balance));
        getForecastBalance().then((forecastBalance) => {
            setForecastBalance(forecastBalance.summary.forecast_end_of_month);
            setRecommendations(forecastBalance.recommendations);
        });
        getBalanceHistory().then((balanceHistory) =>
            setBalanceHistory(balanceHistory.balance_history)
        );
    }, []);
    if (recommendations) {
        console.log(
            recommendations.filter((recom) => {
                if (recom[0] === "0") return recom;
            })
        );
    }
    return (
        <>
            <Box
                sx={{
                    mb: 4,
                    maxWidth: 530,
                }}
            >
                {recommendations !== 0 &&
                recommendations.filter((recom) => {
                    if (recom[0] === "0") return recom;
                }) ? (
                    <Alert
                        severity="error"
                        sx={{ border: "1px solid #E22C2C", borderRadius: 3 }}
                    >
                        <strong>Внимание:</strong>
                        {recommendations !== 0 &&
                            recommendations.filter((recom) => {
                                if (recom[0] === "0") return recom;
                            })}
                    </Alert>
                ) : (
                    <Alert
                        severity="info"
                        sx={{ border: "1px solid #7EACE7", borderRadius: 3 }}
                    >
                        С вашими финансами всё хорошо!
                    </Alert>
                )}

                {/* Баланс */}
                <Paper
                    elevation={1}
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        mt: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                        }}
                    >
                        <Box sx={{ pr: 8 }}>
                            <Typography color="text.secondary">
                                Текущий баланс
                            </Typography>
                            <Typography variant="h4" fontWeight={700}>
                                € {balance}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography color="text.secondary">
                                Прогноз на 30 дней
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                                € {forecastBalance}
                            </Typography>
                        </Box>
                        {balanceHistory ? (
                            <SimpleLineChart data={balanceHistory} />
                        ) : (
                            <></>
                        )}
                    </Box>

                    {/* TODO: найти готовый компонент графика если он вообще нужен */}
                    {/* <Box sx={{ mt: 2, height: 80, bgcolor: "#ecebff", borderRadius: 2 }} /> */}
                </Paper>

                {/* Инсайты */}
                <Typography variant="h6" fontWeight={600} sx={{ mt: 3, pb: 1 }}>
                    Инсайты
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gap: 2,
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    }}
                >
                    <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                        <Typography variant="subtitle1" fontWeight={600} mt={0}>
                            {recommendations !== 0 &&
                                recommendations.filter((recom) => {
                                    if (recom[0] !== "0") return recom;
                                })[0]}
                        </Typography>
                        <Button
                            sx={{
                                textDecoration: "underline",
                                p: 0,
                                color: "#00000099",
                                fontSize: "12px",
                            }}
                        >
                            Подробнее
                        </Button>
                    </Paper>

                    <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                        <Typography variant="subtitle1" fontWeight={600} mt={0}>
                            {recommendations !== 0 &&
                                recommendations.filter((recom) => {
                                    if (recom[0] !== "0") return recom;
                                })[1]}
                        </Typography>
                        <Button
                            sx={{
                                textDecoration: "underline",
                                p: 0,
                                color: "#00000099",
                                fontSize: "12px",
                            }}
                        >
                            Подробнее
                        </Button>
                    </Paper>
                </Box>

                {/* Транзакции */}
                <Typography variant="h6" fontWeight={600} sx={{ mt: 3, pb: 1 }}>
                    Транзакции
                </Typography>

                <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                    <ListTransaction
                        amount={5}
                        allTransactions={allTransactions}
                        setAllTransactions={setAllTransactions}
                    />
                </Paper>
            </Box>
        </>
    );
}
