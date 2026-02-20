import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { useAuth } from "../../navigation/AuthContext";
import { colors } from "../../constants/theme";

export default function ProfileScreen() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>This is your profile tab.</Text>
      </View>

      <Pressable
        onPress={logout}
        style={styles.logoutButton}
        accessibilityRole="button"
        accessibilityLabel="Log out"
      >
        <Text style={styles.logoutLabel}>Logout</Text>
      </Pressable>
    </View>
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