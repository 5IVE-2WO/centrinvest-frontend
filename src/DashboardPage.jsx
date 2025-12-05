import { Box } from "@mui/material";
import { useState } from "react";
import MenuСomponent from "./MenuСomponent.jsx"
import MainComponent from "./MainComponent.jsx"
import AIPanel from "./AIPanel.jsx"

export default function DashboardPage() {
    const [active, setActive] = useState("Главная");

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                bgcolor: "#f6f7fb",
                // bgcolor: "#ea0000ff",
                p: { xs: 1, md: 2 },
            }}
        >
            <MenuСomponent
                active={active}
                setActive={setActive}
            />

            {/* Контент главной страницы */}
            {active == "Главная" ? (<MainComponent/>) : (<></>)}

            {/* Если мобилка AI внизу */}
            <Box 
                sx={{ 
                    display: { xs: "block", lg: "none" }, 
                    mt: 3
                }}
            >
                <AIPanel />
            </Box>

            {/* Если десктоп, то справа */}
            <Box
                sx={{
                    width: 260,
                    ml: 2,
                    display: { xs: "none", lg: "block" },
                }}
            >
                <AIPanel />
            </Box>
        </Box>
    );
}
