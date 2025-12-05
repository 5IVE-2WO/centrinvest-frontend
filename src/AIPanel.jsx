import {
  Typography,
  Paper,
  Button,
} from "@mui/material";

export default function AIPanel() {
    return (
        <Paper sx={{ p: 2, borderRadius: 3 }} elevation={1}>
            <Typography variant="h6" fontWeight={700}>
                AI ассистент
            </Typography>

            <Paper sx={{ borderRadius: 2 }} elevation={0}>
                <Typography>Мы нашли подозрительное списание.</Typography>
            </Paper>

            <Button fullWidth variant="contained" sx={{ mt: 2, bgcolor: "#4f46e5", borderRadius: 2 }}>
                Проверить
            </Button>

            <Button fullWidth variant="outlined" sx={{ mt: 1, borderRadius: 2 }}>
                Отложить
            </Button>

            <Paper sx={{ pt: 2, borderRadius: 2 }} elevation={0}>
                <Typography variant="body2" color="text.secondary">
                Совет: сократите ненужные подписки на 10%.
                </Typography>
            </Paper>
        </Paper>
    );
}