import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { TitulationProvider } from "./context/TitulationProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TitulationProvider>
      <RouterProvider router={router} />
    </TitulationProvider>
  </StrictMode>
);
