import React, { useState } from "react";
import { Alert, Button } from "react-native";
import {
  checkForUpdate,
  downloadUpdate,
  applyUpdate,
} from "../services/updateService";

export default function UpdateButton() {
  const [loading, setLoading] = useState(false);

  async function handlePress() {
    if (loading) return;
    setLoading(true);
    try {
      const isAvailable = await checkForUpdate();
      setLoading(false);

      if (!isAvailable) {
        Alert.alert("App is up to date");
        return;
      }

      Alert.alert("Update Available", undefined, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Update",
          onPress: async () => {
            setLoading(true);
            try {
              const downloaded = await downloadUpdate();
              if (downloaded) {
                await applyUpdate();
              }
            } catch (e) {
              console.warn("Update failed:", e);
              setLoading(false);
            }
            // If applyUpdate succeeds, app reloads so we never reach here
          },
        },
      ]);
    } catch (e) {
      console.warn("Check for update failed:", e);
      setLoading(false);
    }
  }

  return (
    <Button
      title="Check for Update"
      onPress={handlePress}
      disabled={loading}
    />
  );
}
