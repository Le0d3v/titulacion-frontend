import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { TitulationProvider } from "./context/TitulationProvider.jsx";
import { SWRConfig } from "swr";
import { registerSW } from "virtual:pwa-register";
import OfflinePage from "./views/layouts/OfflinePage";
import { useState, useEffect } from "react";

function AppRoot() {
  const [online, setOnlineStatus] = useState(true);

  useEffect(() => {
    registerSW();

    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data.type === "NETWORK_STATUS") {
        setOnlineStatus(event.data.isOnline);
      }
    });
  }, []);

  if (!online) {
    return <OfflinePage />;
  }

  return (
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
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>
);
