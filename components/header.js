import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../constants/theme";
import { APP_SCREENS } from "../navigation/routes";

const ICON_CONTAINER_SIZE = 44;

export default function Header({
  title,
  transparent = false,
  showBackButton = true,
  onBackPress,
  showMenuIcon = true,
  onMenuPress,
  showProfileIcon = false,
  onProfilePress: onProfilePressProp,
  containerStyle,
  titleStyle,
  rightContainerStyle,
}) {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const horizontalPadding = Math.max(14, Math.round(width * 0.035));
  const iconSize = Math.min(22, Math.round(width * 0.055));
  const backgroundColor = transparent ? "transparent" : colors.cardBackground;
  const overlayColor = transparent
    ? "rgba(255,255,255,0.15)"
    : "rgba(0,0,0,0.05)";

  const renderIconButton = (iconName, onPress, label, style) => (
    <Pressable
      style={({ pressed }) => [
        styles.iconButton,
        { backgroundColor: overlayColor },
        pressed && styles.iconPressed,
        style,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Feather name={iconName} size={iconSize} color={colors.textPrimary} />
    </Pressable>
  );

  const handleBackPress = onBackPress ?? (() => navigation.goBack());
  const handleProfilePress = showProfileIcon
    ? (onProfilePressProp ?? (() => navigation.navigate(APP_SCREENS.PROFILE)))
    : undefined;
  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor,
          borderBottomWidth: transparent ? 0 : StyleSheet.hairlineWidth,
          borderBottomColor: colors.border,
          paddingHorizontal: horizontalPadding,
          paddingTop: Platform.OS === "ios" ? 16 : 12,
          paddingBottom: Platform.OS === "ios" ? 8 : 12,
        },
        containerStyle,
      ]}
    >
      {showBackButton ? (
        renderIconButton("chevron-left", handleBackPress, "Back")
      ) : (
        <View style={styles.iconPlaceholder} />
      )}

      <View style={styles.titleContainer}>
        <Text numberOfLines={1} style={[styles.title, titleStyle]}>
          {title}
        </Text>
      </View>

      <View style={[styles.rightContainer, rightContainerStyle]}>
        {showProfileIcon && renderIconButton("user", handleProfilePress, "Profile")}
        {showMenuIcon &&
          renderIconButton("more-vertical", onMenuPress, "More options", {
            marginLeft: showProfileIcon ? 10 : 0,
          })}
        {!showMenuIcon && !showProfileIcon && (
          <View style={styles.iconPlaceholder} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconButton: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    borderRadius: ICON_CONTAINER_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  iconPressed: {
    opacity: 0.6,
  },
  iconPlaceholder: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
