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
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import PieChartt from "./PieChart";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import api from "../axios";
import ListTransaction from "./ListTransaction";
import { getExpensesLast3Month } from "./api";

const COLORS = [
    "#6366F1",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#3B82F6",
    "#A855F7",
];

const ViewSubsection = ({
    amount = 0,
    categoryMonth,
    allTransactions,
    setAllTransactions,
}) => {
    const [isActiveAdd, setIsActiveAdd] = useState(false);
    const [amountAdd, setAmountAdd] = useState("");
    const [dateAdd, setDateAdd] = useState(dayjs("2025-12-01"));
    const [typeNote, setTypeNote] = useState(false);
    const [expensiveCategory, setExpensiveCategory] = useState([]);

    useEffect(() => {
        getExpensesLast3Month().then((data) => setExpensiveCategory(data));
    }, []);
    const noIsActiveAdd = () => {
        setIsActiveAdd(!isActiveAdd);
    };
    const editTypeNote = (e) => {
        switch (e.target.value) {
            case "Расход":
                setTypeNote(false);
                break;
            case "Доход":
                setTypeNote(true);
                break;
            default:
                break;
        }
    };
    const sendTransaction = async () => {
        try {
            const res = await api.post(
                "/transactions",
                {
                    date: dateAdd.$d
                        .toLocaleDateString()
                        .split(".")
                        .reverse()
                        .join("-"),

                    isIncome: typeNote,
                    value: parseInt(amountAdd),
                },
                { headers: { "Content-Type": "application/json" } }
            );
            setAllTransactions([res.data, ...allTransactions]);
            getExpensesLast3Month().then((data) => setExpensiveCategory(data));
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Stack
            spacing="15px"
            sx={{
                // pl: 2,
                // pr: 2,
                // mb: 4,
                maxWidth: 530,
            }}
        >
            {amount === 0 && (
                <Box>
                    <PieChartt data={expensiveCategory["2025-12"]} />
                    <Stack
                        direction="row"
                        spacing={2}
                        flexWrap="wrap"
                        useFlexGap
                    >
                        {categoryMonth["2025-12"].map((category, index) => (
                            <Box
                                key={index}
                                sx={{
                                    maxWidth: 310,
                                    height: 40,
                                    backgroundColor: COLORS[index],
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
                                        fontWeight:
                                            "var(--mini-text-font-weight)",
                                        letterSpacing:
                                            "var(--mini-text-letter-spacing)",
                                        lineHeight:
                                            "var(--mini-text-line-height)",
                                        fontStyle:
                                            "var(--mini-text-font-style)",
                                        marginRight: "4vw",
                                    }}
                                >
                                    {category.category}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "white",
                                        fontSize: "var(--mini-text-font-size)",
                                        fontWeight:
                                            "var(--mini-text-font-weight)",
                                        letterSpacing:
                                            "var(--mini-text-letter-spacing)",
                                        lineHeight:
                                            "var(--mini-text-line-height)",
                                        fontStyle:
                                            "var(--mini-text-font-style)",
                                        textAlign: "right",
                                    }}
                                >
                                    {category.amount}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            )}
            {isActiveAdd ? (
                <Box
                    sx={{
                        height: "auto",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "white",
                        borderRadius: 2,
                        p: 2,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "right" }}>
                        <IconButton
                            sx={{
                                width: 30,
                                height: 30,
                                pr: 1,
                                pt: 1,
                            }}
                            onClick={noIsActiveAdd}
                        >
                            <CloseIcon sx={{ width: 30, height: 30 }} />
                        </IconButton>
                    </Box>

                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Расход"
                        name="radio-buttons-group"
                        row
                        onChange={editTypeNote}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <FormControlLabel
                            value="Доход"
                            control={<Radio />}
                            label="Доход"
                        />
                        <FormControlLabel
                            value="Расход"
                            control={<Radio />}
                            label="Расход"
                        />
                    </RadioGroup>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            px: 1,
                            mt: 2,
                            fontFamily: `"Roboto","Helvetica","Arial", "sans-serif"`,
                            fontSize: "1rem",
                            fontWeight: "500",
                        }}
                    >
                        <Box>Сумма:</Box>
                        <TextField
                            value={amountAdd}
                            onChange={(e) => setAmountAdd(e.target.value)}
                            variant="outlined"
                            sx={{
                                ml: "auto",
                                width: 180,
                                "& .MuiOutlinedInput-root": {
                                    height: 35,
                                    borderRadius: "12px",
                                    bgcolor: "#E3F2FD",
                                    "& fieldset": {
                                        borderColor: "#90CAF9",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#90CAF9",
                                    },
                                },
                                "& .MuiOutlinedInput-input": {
                                    padding: "8px 12px",
                                },
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            px: 1,
                            mt: 1,
                            fontFamily: `"Roboto","Helvetica","Arial", "sans-serif"`,
                            fontSize: "1rem",
                            fontWeight: "500",
                        }}
                    >
                        <Box>Дата:</Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Controlled picker"
                                value={dateAdd}
                                onChange={(newValue) => {
                                    setDateAdd(newValue);
                                }}
                                sx={{
                                    ml: "auto",
                                    width: 180,
                                    "& .MuiOutlinedInput-root": {
                                        height: 35,
                                        borderRadius: "12px",
                                        bgcolor: "#E3F2FD",
                                        "& fieldset": {
                                            borderColor: "#90CAF9",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#90CAF9",
                                        },
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            width: "100%",
                            borderRadius: 2,
                            mx: "auto",
                            display: "block",
                            pl: 8,
                            pr: 8,
                            mt: 2,
                            backgroundColor: "#4f46e5",
                        }}
                        onClick={sendTransaction}
                    >
                        Добавить
                    </Button>
                </Box>
            ) : (
                <Button
                    variant="contained"
                    sx={{ ml: 4, mr: 4, bgcolor: "#4f46e5", borderRadius: 2 }}
                    onClick={noIsActiveAdd}
                >
                    Добавить транзакцию
                </Button>
            )}

            {allTransactions ? (
                <ListTransaction
                    amount={0}
                    allTransactions={allTransactions}
                    setAllTransactions={setAllTransactions}
                />
            ) : (
                <></>
            )}
        </Stack>
    );
};

export default ViewSubsection;
