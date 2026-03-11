import { useEffect } from "react";
import { checkForUpdate, downloadUpdate } from "../services/updateService";

/**
 * Hook that checks for OTA updates on app start and downloads if available.
 * Does not reload; update applies on next app restart.
 */
export function useAutoUpdate() {
  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const isAvailable = await checkForUpdate();
        if (cancelled) return;
        if (!isAvailable) return;

        const downloaded = await downloadUpdate();
        if (cancelled) return;
        if (downloaded) {
          console.log("Update downloaded, will apply on next restart");
        }
      } catch (e) {
        console.warn("useAutoUpdate error:", e);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);
}
