import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../constants/theme";
import Header from "../../components/header";

const AVATAR_SIZE = 80;
const PADDING_H = 24;

export default function ChatDetails() {
  const route = useRoute();
  const { width } = useWindowDimensions();

  const name = route.params?.name ?? "Chat";
  const id = route.params?.id;

  const horizontalPadding = Math.max(PADDING_H, (width * 0.06) | 0);
  const avatarSize = Math.min(AVATAR_SIZE, (width * 0.22) | 0);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <SafeAreaView style={styles.container} >
      <Header
        title={name}
        showBackButton={true}
        showMenuIcon={true}
        transparent={false}
        showProfileIcon={true}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoider}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >

        <View style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
          <View
            style={[
              styles.avatar,
              {
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarSize / 2,
              },
            ]}
          >
            <Text
              style={[styles.avatarText, { fontSize: avatarSize * 0.4 }]}
              numberOfLines={1}
            >
              {initials}
            </Text>
          </View>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          {id && (
            <Text style={styles.meta}>Chat ID: {id}</Text>
          )}
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              Messages will appear here.
            </Text>
            <Text style={styles.placeholderSubtext}>
              Tap the input below to start the conversation.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoider: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: Platform.OS === "ios" ? 32 : 24,
    alignItems: "center",
  },
  avatar: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: colors.cardBackground,
    fontWeight: "600",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
    textAlign: "center",
  },
  meta: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 32,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  placeholderText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
    textAlign: "center",
  },
  placeholderSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    opacity: 0.8,
    textAlign: "center",
  },
});
