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

    const menu = [
        "Главная",
        "Транзакции",
        "Аналитика",
        "Подписки",
        "Безопасность",
        "Настройки",
    ];
  
    const MenuContent = (
        <Box sx={{ width: 250 }}>
            <Paper sx={{ p: 2, borderRadius: 3 }} elevation={1}>
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
                            bgcolor: isActive ? "#4f46e5" : "transparent",
                            color: isActive ? "white" : "inherit",
                            "&:hover": { bgcolor: isActive ? "#4f46e5" : "rgba(0,0,0,0.04)" },
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
                display: { xs: "none", md: "block" },
            }}
        >
            {MenuContent}
        </Box>

        {/* --------- MOBILE BURGER -------- */}
        <IconButton
            sx={{
                position: "fixed",
                top: 16,
                left: 16,
                zIndex: 10,
                display: { xs: "flex", md: "none" },
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