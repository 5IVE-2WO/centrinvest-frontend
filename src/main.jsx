import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import DashboardPage from "./DashboardPage.jsx";
import ViewSubsection from "./ViewSubsection.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <DashboardPage />
    </StrictMode>
);
