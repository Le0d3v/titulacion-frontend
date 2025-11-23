import { useEffect, useState } from "react";

export default function useOnlineStatus(onBackOnline) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function updateStatus() {
      const online = navigator.onLine;
      setIsOnline(online);

      // Si volvió online y hay callback
      if (online && typeof onBackOnline === "function") {
        onBackOnline();
      }
    }

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, [onBackOnline]);

  return isOnline;
}
