import { Box, Stack, Typography, Paper } from "@mui/material";
import React from "react";

const transactionsData = [
    {
        id: 1,
        date: "01 ДЕК 2026",
        category: "Одежда",
        amount: "-1500 руб",
        isExpense: true,
    },
    {
        id: 2,
        date: "29 НОЯ 2026",
        category: "Зарплата",
        amount: "1500 руб",
        isExpense: false,
    },
    {
        id: 3,
        date: "01 ДЕК 2026",
        category: "Одежда",
        amount: "-1500 руб",
        isExpense: true,
    },
    {
        id: 4,
        date: "29 НОЯ 2026",
        category: "Зарплата",
        amount: "1500 руб",
        isExpense: false,
    },
    {
        id: 5,
        date: "01 ДЕК 2026",
        category: "Одежда",
        amount: "-1500 руб",
        isExpense: true,
    },
    {
        id: 6,
        date: "29 НОЯ 2026",
        category: "Зарплата",
        amount: "1500 руб",
        isExpense: false,
    },
    {
        id: 7,
        date: "01 ДЕК 2026",
        category: "Одежда",
        amount: "-1500 руб",
        isExpense: true,
    },
    {
        id: 8,
        date: "29 НОЯ 2026",
        category: "Зарплата",
        amount: "1500 руб",
        isExpense: false,
    },
];

const categoryData = [
    { label: "Супермаркеты", amount: "2586 руб", color: "#ba7474" },
    { label: "Еда", amount: "499 руб", color: "#4d5e80" },
    { label: "Транспорт", amount: "128 руб", color: "#467b94" },
];

const ViewSubsection = () => {
    return (
        <Stack
            spacing="15px"
            sx={{
                pl: 2,
                pr: 2,
                mb: 4,
            }}
        >
            <Box>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                    {categoryData.slice(0, 3).map((category, index) => (
                        <Box
                            key={index}
                            sx={{
                                maxWidth: 310,
                                height: 40,
                                backgroundColor: category.color,
                                borderRadius: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                px: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "white",
                                    fontSize: "var(--mini-text-font-size)",
                                    fontWeight: "var(--mini-text-font-weight)",
                                    letterSpacing:
                                        "var(--mini-text-letter-spacing)",
                                    lineHeight: "var(--mini-text-line-height)",
                                    fontStyle: "var(--mini-text-font-style)",
                                    marginRight: "20px",
                                }}
                            >
                                {category.label}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "white",
                                    fontSize: "var(--mini-text-font-size)",
                                    fontWeight: "var(--mini-text-font-weight)",
                                    letterSpacing:
                                        "var(--mini-text-letter-spacing)",
                                    lineHeight: "var(--mini-text-line-height)",
                                    fontStyle: "var(--mini-text-font-style)",
                                    textAlign: "right",
                                }}
                            >
                                {category.amount}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>
            {transactionsData.map((transaction) => (
                <Paper
                    elevation={1}
                    sx={{
                        height: "auto",
                        borderRadius: 3,
                        position: "relative",
                        padding: 2.5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 500,
                                color: "text.primary",
                            }}
                        >
                            {transaction.category}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 500,
                                color: transaction.isExpense
                                    ? "#C10007"
                                    : "#259616",
                                textAlign: "right",
                            }}
                        >
                            {transaction.amount}
                        </Typography>
                    </Box>
                    <Typography
                        variant="caption"
                        sx={{
                            color: "text.secondary",
                            fontSize: "0.75rem",
                        }}
                    >
                        {transaction.date}
                    </Typography>
                </Paper>
            ))}
        </Stack>
    );
};

export default ViewSubsection;
