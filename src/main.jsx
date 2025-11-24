import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { TitulationProvider } from "./context/TitulationProvider.jsx";
import { SWRConfig } from "swr";
import { registerSW } from "virtual:pwa-register";
import useOnlineStatus from "./hooks/useOnlineStatus";
import OfflinePage from "./views/layouts/OfflinePage";

registerSW();

function AppRoot() {
  const online = useOnlineStatus(() => {
    console.log("Conexión a internet reestablecida");
  });

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
