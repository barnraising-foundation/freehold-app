import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { FreeholdApp } from "./components/freehold-app";
import "./globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FreeholdApp />
  </StrictMode>,
);
