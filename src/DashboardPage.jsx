import { Box } from "@mui/material";
import { useState } from "react";
import MenuСomponent from "./MenuСomponent.jsx";
import MainComponent from "./MainComponent.jsx";
import AIPanel from "./AIPanel.jsx";
import ViewSubsection from "./ViewSubsection.jsx";

export default function DashboardPage() {
    const [active, setActive] = useState("Главная");

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                maxWidth: "99vw",
                bgcolor: "#f6f7fb",
                flexDirection: { xs: "column", sm: "column", md: "row" },
                // bgcolor: "#ea0000ff",
                p: { xs: 2, md: 2, lg: 2},
            }}
        >
            <MenuСomponent active={active} setActive={setActive} />

            {/* Контент главной страницы */}
            <Box sx={{
                pl: 2,
                pr: 2,
                mb: 4,
            }}>
                {active == "Главная" ? <MainComponent /> : <></>}
                {active == "Транзакции" ? <ViewSubsection amount={3} /> : <></>}
            </Box>

            {/* Если мобилка AI внизу */}
            <Box
                sx={{
                    maxWidth: 250,
                    display: { xs: "block", sm: "block", md: "none", lg: "none", xl: "none" },
                    pl: 2,
                }}
            >
                <AIPanel />
            </Box>

            {/* Если десктоп, то справа */}
            <Box
                sx={{
                    maxWidth: 250,
                    display: { xs: "none", sm: "none", md: "block", lg: "block", xl: "block" },
                }}
            >
                <AIPanel />
            </Box>
        </Box>
    );
}
