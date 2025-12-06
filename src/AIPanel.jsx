import { Typography, Paper, Button } from "@mui/material";

export default function AIPanel() {
    return (
        <Paper sx={{ p: 2, borderRadius: 3 }} elevation={1}>
            <Typography variant="h6" fontWeight={700} marginBottom={"30px"}>
                AI - ассистент
            </Typography>

            <Paper
                sx={{
                    borderRadius: 2,
                    bgcolor: "#F3F8FF",
                    padding: "20px",
                    border: "1px solid #7EACE7",
                }}
                elevation={0}
            >
                <Typography>
                    Я нашёл у вас непредвиденные траты, давайте уточним вместе!
                </Typography>
            </Paper>

            <Button
                fullWidth
                variant="contained"
                sx={{ mt: "30px", bgcolor: "#4f46e5", borderRadius: 12 }}
            >
                Проверить
            </Button>

            <Button
                fullWidth
                variant="outlined"
                sx={{ mt: "20px", borderRadius: 12 }}
            >
                Отложить
            </Button>
        </Paper>
    );
}
