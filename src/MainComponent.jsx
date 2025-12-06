import { Box, Typography, Paper, Alert, Button } from "@mui/material";
import ViewSubsection from "./ViewSubsection.jsx";

export default function MainComponent() {
    return (
        <>
            <Box
                sx={{
                    mb: 4,
                    maxWidth: 530,
                }}
            >
                <Alert
                    severity="error"
                    sx={{ border: "1px solid #E22C2C", borderRadius: 3 }}
                >
                    <strong>Внимание:</strong> возможно мошенническое списание.
                </Alert>

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
                                € 3140.02
                            </Typography>
                        </Box>

                        <Box>
                            <Typography color="text.secondary">
                                Прогноз на 7 дней
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                                € 3020.02
                            </Typography>
                        </Box>
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
                        <Typography color="text.secondary">
                            Потенц. мошен.
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600} mt={0}>
                            1 подозрительная транзакция
                        </Typography>
                        <Button> Подробнее </Button>
                    </Paper>

                    <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                        <Typography color="text.secondary">Экономия</Typography>
                        <Typography variant="subtitle1" fontWeight={600} mt={0}>
                            Рекомендация: отложить 15%
                        </Typography>
                    </Paper>
                </Box>

                {/* Транзакции */}
                <Typography variant="h6" fontWeight={600} sx={{ mt: 3, pb: 1 }}>
                    Транзакции
                </Typography>

                <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                    <Typography color="text.secondary"><ViewSubsection /></Typography>
                </Paper>
            </Box>
        </>
    );
}
