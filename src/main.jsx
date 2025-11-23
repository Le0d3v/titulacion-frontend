import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { TitulationProvider } from "./context/TitulationProvider.jsx";
import { SWRConfig } from "swr";

import { registerSW } from "virtual:pwa-register";
registerSW();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SWRConfig
      value={{
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        errorRetryInterval: 5000,
        errorRetryCount: 1,
      }}
    >
      <TitulationProvider>
        <RouterProvider router={router} />
      </TitulationProvider>
    </SWRConfig>
  </StrictMode>
);
