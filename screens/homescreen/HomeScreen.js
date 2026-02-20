import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../navigation/AuthContext";
import { APP_SCREENS } from "../../navigation/routes";
import { colors } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circleGrid: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 32,
  },
  circleButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  circleLabel: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: "600",
  },
});

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleOpenChats = () => {
    navigation.navigate(APP_SCREENS.CHATS);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>You&apos;re logged in</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.circleGrid}>
          <Pressable
            onPress={handleOpenChats}
            style={styles.circleButton}
            accessibilityRole="button"
            accessibilityLabel="Open chats"
          >
            <View style={styles.circle}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>C</Text>
            </View>
            <Text style={styles.circleLabel}>Chats</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
