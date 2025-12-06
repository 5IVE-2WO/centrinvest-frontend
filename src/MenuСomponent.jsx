import {
    Box,
    Typography,
    Paper,
    List,
    ListItemButton,
    ListItemText,
    IconButton,
    Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function MenuСomponent({ active, setActive }) {
    const [open, setOpen] = useState(false);

    const menu = ["Главная", "AI - ассистент", "Подписки", "Транзакции"];

    const MenuContent = (
        <Box 
            sx={{
                width: { xs: 500, sm: 400, md: 250, lg: 250, xl: 250 },
            }}
        >
            <Paper
                sx={{ 
                    p: 2, 
                    borderRadius: 3,
                }} 
                elevation={1}
            >
                <Typography variant="h5" fontWeight={700}>
                    Финансы
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                    Безопасность и рекомендации
                </Typography>
            </Paper>

            <Paper sx={{ p: 2, borderRadius: 3, mt: 3 }} elevation={1}>
                <List disablePadding>
                    {menu.map((item) => {
                        const isActive = active === item;

                        return (
                            <ListItemButton
                                key={item}
                                onClick={() => setActive(item)}
                                sx={{
                                    borderRadius: 2,
                                    mb: 0.8,
                                    bgcolor: isActive
                                        ? "#4f46e5"
                                        : "transparent",
                                    color: isActive ? "white" : "inherit",
                                    "&:hover": {
                                        bgcolor: isActive
                                            ? "#4f46e5"
                                            : "rgba(0,0,0,0.04)",
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={item}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 400,
                                    }}
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Paper>
        </Box>
    );

    return (
        <>
            {/* --------- DESKTOP MENU -------- */}
            <Box
                sx={{
                    display: { xs: "none", sm: "none", md: "block", lg: "block", xl: "block" },
                    width: 250,
                }}
            >
                {MenuContent}
            </Box>

            {/* --------- MOBILE BURGER -------- */}
            <IconButton
                sx={{
                    justifyContent: 'flex-start',
                    pl: 2,
                    mb: 2,
                    display: { xs: "flex", sm: "flex", md: "none", lg: "none", xl: "none" },
                }}
                onClick={() => setOpen(true)}
            >
                <MenuIcon fontSize="large" />
            </IconButton>

            <Drawer open={open} onClose={() => setOpen(false)}>
                {MenuContent}
            </Drawer>
        </>
    );
}
