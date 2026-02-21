import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Platform,
  useWindowDimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { APP_SCREENS } from "../../navigation/routes";
import { colors } from "../../constants/theme";

const SAMPLE_CHATS = [
  { id: "1", name: "Alex Johnson", lastMessage: "See you tomorrow!", time: "2m", unread: 2 },
  { id: "2", name: "Sam Williams", lastMessage: "Thanks for the update", time: "15m", unread: 0 },
  { id: "3", name: "Jordan Lee", lastMessage: "Can we reschedule?", time: "1h", unread: 1 },
  { id: "4", name: "Morgan Taylor", lastMessage: "Sounds good to me", time: "2h", unread: 0 },
  { id: "5", name: "Casey Davis", lastMessage: "I'll send it over soon", time: "Yesterday", unread: 0 },
  { id: "6", name: "Riley Martinez", lastMessage: "Meeting at 3pm", time: "Yesterday", unread: 0 },
  { id: "7", name: "Quinn Anderson", lastMessage: "Got it, thanks!", time: "Mon", unread: 0 },
  { id: "8", name: "Avery Clark", lastMessage: "Let me check and get back", time: "Mon", unread: 0 },
  { id: "9", name: "Skyler White", lastMessage: "Perfect, talk later", time: "Sun", unread: 0 },
  { id: "10", name: "Drew Brown", lastMessage: "Are you free this weekend?", time: "Sun", unread: 1 },
];

const HORIZONTAL_PADDING = 16;
const ITEM_PADDING_V = 12;
const AVATAR_SIZE = 48;
const GAP = 12;

function ChatListItem({ item, onPress, horizontalPadding, avatarSize }) {
  const initials = item.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [
        styles.listItem,
        {
          paddingHorizontal: horizontalPadding,
          paddingVertical: ITEM_PADDING_V,
        },
        pressed && styles.listItemPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Chat with ${item.name}`}
    >
      <View style={[styles.avatar, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]}>
        <Text style={[styles.avatarText, { fontSize: avatarSize * 0.4 }]} numberOfLines={1}>
          {initials}
        </Text>
      </View>
      <View style={styles.listItemContent}>
        <View style={styles.listItemRow}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.listItemRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unread > 99 ? "99+" : item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export default function ChatsScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const horizontalPadding = Math.max(HORIZONTAL_PADDING, (width * 0.04) | 0);
  const avatarSize = Math.min(AVATAR_SIZE, (width * 0.12) | 0);

  const handleChatPress = useCallback(
    (chat) => {
      navigation.navigate(APP_SCREENS.CHAT_DETAILS, {
        id: chat.id,
        name: chat.name,
      });
    },
    [navigation]
  );

  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(
    ({ item }) => (
      <ChatListItem
        item={item}
        onPress={handleChatPress}
        horizontalPadding={horizontalPadding}
        avatarSize={avatarSize}
      />
    ),
    [handleChatPress, horizontalPadding, avatarSize]
  );

  const itemSeparator = useCallback(
    () => <View style={[styles.separator, { marginLeft: horizontalPadding + avatarSize + GAP }]} />,
    [horizontalPadding, avatarSize]
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={SAMPLE_CHATS}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeparator}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: Platform.OS === "ios" ? 24 : 16 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingTop: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
  },
  listItemPressed: {
    opacity: 0.7,
  },
  avatar: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: GAP,
  },
  avatarText: {
    color: colors.cardBackground,
    fontWeight: "600",
  },
  listItemContent: {
    flex: 1,
    minWidth: 0,
  },
  listItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.cardBackground,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
});
