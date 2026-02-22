import * as Updates from "expo-updates";

export async function checkForOTAUpdate() {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    console.log("OTA Update Error:", error);
  }
}
