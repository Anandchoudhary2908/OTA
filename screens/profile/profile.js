import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../navigation/AuthContext";
import { APP_SCREENS } from "../../navigation/routes";
import { colors } from "../../constants/theme";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>This is your profile tab.</Text>

        <Pressable
          onPress={() => navigation.navigate(APP_SCREENS.NOTIFICATION)}
          style={styles.notificationButton}
          accessibilityRole="button"
          accessibilityLabel="Open notification settings"
        >
          <Text style={styles.notificationButtonLabel}>Notification</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={logout}
        style={styles.logoutButton}
        accessibilityRole="button"
        accessibilityLabel="Log out"
      >
        <Text style={styles.logoutLabel}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  notificationButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  notificationButtonLabel: {
    color: colors.cardBackground,
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  logoutLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});