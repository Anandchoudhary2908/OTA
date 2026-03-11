import * as Updates from "expo-updates";

/**
 * Check if an OTA update is available.
 * @returns {Promise<boolean>} Whether an update is available.
 */
export async function checkForUpdate() {
  try {
    console.log("Checking OTA update...");
    const result = await Updates.checkForUpdateAsync();
    console.log("Check result:", result);
    console.log("runtimeVersion:", Updates.runtimeVersion);
    console.log("channel:", Updates.channel);
    return result?.isAvailable ?? false;
  } catch (e) {
    console.warn("OTA check error:", e);
    return false;
  }
}

/**
 * Download the available OTA update.
 * @returns {Promise<boolean>} Whether the download succeeded.
 */
export async function downloadUpdate() {
  try {
    await Updates.fetchUpdateAsync();
    console.log("OTA update downloaded successfully.");
    return true;
  } catch (e) {
    console.warn("OTA download error:", e);
    return false;
  }
}

/**
 * Apply the downloaded update by reloading the app.
 */
export async function applyUpdate() {
  try {
    await Updates.reloadAsync();
  } catch (e) {
    console.warn("OTA apply/reload error:", e);
  }
}
