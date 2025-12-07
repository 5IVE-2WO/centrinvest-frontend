import {
    Box,
    Stack,
    Typography,
    Paper,
    Button,
    TextField,
    IconButton,
    InputAdornment,
    RadioGroup,
    Radio,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import PieChartt from "./PieChart";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import api from "../axios";

const COLORS = [
    "#6366F1",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#3B82F6",
    "#A855F7",
];

const ListTransaction = ({ amount, allTransactions, setAllTransactions }) => {
    const [editingId, setEditingId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [loading, setLoading] = useState({});

    const categories = [
        "Прочие расходы",
        "Продукты",
        "Коммунальные услуги",
        "Транспорт",
    ];

    const handleEditClick = (id, currentCategory) => {
        setEditingId(id);
        setSelectedCategory((prev) => ({
            ...prev,
            [id]: currentCategory,
        }));
    };

    const handleSelectChange = (id, event) => {
        const newCategory = event.target.value;
        setSelectedCategory((prev) => ({
            ...prev,
            [id]: newCategory,
        }));
    };

    const handleSave = async (id) => {
        const newCategory = selectedCategory[id];
        if (!newCategory) return;

        setLoading((prev) => ({ ...prev, [id]: true }));

        try {
            const response = await api.put(
                `/transactions/${id}`,
                {
                    category: newCategory,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        // Добавьте, если нужно: 'Authorization': `Bearer ${token}`
                    },
                }
            );

            setAllTransactions((prev) => {
                return {
                    ...prev,
                    transactions: prev.transactions.map((transaction) =>
                        transaction.id === id
                            ? { ...transaction, category: newCategory }
                            : transaction
                    ),
                };
            });
            setEditingId(null); // Сбрасываем состояние редактирования
        } catch (error) {
            console.error("Ошибка при обновлении транзакции:", error);
            if (error.response) {
                console.error("Ответ сервера:", error.response.data);
                console.error("Статус:", error.response.status);
                console.error("Заголовки:", error.response.headers);
            } else if (error.request) {
                console.error(
                    "Запрос был отправлен, но не получен ответ:",
                    error.request
                );
            } else {
                console.error("Ошибка при настройке запроса:", error.message);
            }
            // Уведомление об ошибке можно заменить на Snackbar или другой UI-компонент
            console.warn(
                "Не удалось обновить транзакцию. Проверьте консоль для подробностей."
            );
        } finally {
            setLoading((prev) => ({ ...prev, [id]: false }));
        }
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    return (
        <Stack
            spacing="15px"
            sx={{
                // pl: 2,
                // pr: 2,
                // mb: 4,
                maxWidth: 600,
            }}
        >
            {(amount === 0
                ? allTransactions
                : allTransactions.slice(0, amount)
            ).map((transaction) => {
                const transactionId = transaction.id;
                return (
                    <Paper
                        key={`transaction-${transactionId}`}
                        elevation={0}
                        sx={{
                            height: "auto",
                            borderRadius: 2,
                            position: "relative",
                            p: 2,
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
                            {/* Левая часть: название категории + иконка редактирования */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flex: 1,
                                    mr: 1, // отступ справа
                                }}
                            >
                                {editingId === transactionId ? (
                                    <FormControl size="small" sx={{ flex: 1 }}>
                                        <Select
                                            value={
                                                selectedCategory[
                                                    transactionId
                                                ] || transaction.category
                                            }
                                            onChange={(event) =>
                                                handleSelectChange(
                                                    transactionId,
                                                    event
                                                )
                                            }
                                            displayEmpty
                                            disabled={loading[transactionId]}
                                        >
                                            {categories.map((cat) => (
                                                <MenuItem key={cat} value={cat}>
                                                    {cat}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 500,
                                                color: "text.primary",
                                                mr: 0.5, // минимальный отступ справа от текста
                                            }}
                                        >
                                            {transaction.category}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                handleEditClick(
                                                    transactionId,
                                                    transaction.category
                                                )
                                            }
                                            sx={{
                                                color: "text.secondary",
                                                padding: 0.5, // уменьшаем внутренний отступ иконки
                                                width: 28,
                                                height: 28,
                                            }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </>
                                )}
                            </Box>

                            {/* Правая часть: сумма */}
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 500,
                                    color: !transaction.is_income
                                        ? "#C10007"
                                        : "#259616",
                                    textAlign: "right",
                                    minWidth: 80, // фиксированная ширина для выравнивания
                                }}
                            >
                                {!transaction.is_income
                                    ? `- ${transaction.amount}`
                                    : transaction.amount}
                            </Typography>

                            {/* Кнопки сохранения/отмены (только при редактировании) */}
                            {editingId === transactionId && (
                                <>
                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            handleSave(transactionId)
                                        }
                                        sx={{ color: "success.main", ml: 1 }}
                                        disabled={loading[transactionId]}
                                    >
                                        {loading[transactionId] ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        )}
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={handleCancel}
                                        sx={{ color: "error.main", ml: 1 }}
                                        disabled={loading[transactionId]}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </>
                            )}
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
                );
            })}
        </Stack>
    );
};

export default ListTransaction;
