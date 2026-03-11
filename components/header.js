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
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // Responsive values
  const horizontalPadding = Math.max(14, Math.round(width * 0.035));
  const iconSize = Math.min(22, Math.round(width * 0.055));
  const backgroundColor = transparent ? "transparent" : colors.cardBackground;
  
  // Safe navigation logic
  const canGoBack = navigation.canGoBack();
  const handleBackPress = onBackPress ?? (() => {
    if (canGoBack) navigation.goBack();
  });

  const handleProfilePress = onProfilePressProp ?? (() => {
    navigation.navigate(APP_SCREENS.PROFILE);
  });

  const renderIconButton = (iconName, onPress, label, style) => (
    <Pressable
      style={({ pressed }) => [
        styles.iconButton,
        pressed && styles.iconPressed,
        style,
      ]}
      onPress={onPress}
      // Native Android Ripple
      android_ripple={{ color: colors.border, borderless: true, radius: 22 }}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8} // Makes it easier to tap
    >
      <Feather name={iconName} size={iconSize} color={colors.textPrimary} />
    </Pressable>
  );

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor,
          borderBottomWidth: transparent ? 0 : StyleSheet.hairlineWidth,
          borderBottomColor: colors.border,
          paddingHorizontal: horizontalPadding,
          // Dynamic padding for iPhone Notches & Android Status Bars
          // paddingTop: insets.top + (Platform.OS === "ios" ? 8 : 1),
          // paddingBottom: 12,
        },
        containerStyle,
      ]}
    >
      <View style={styles.leftContainer}>
        {showBackButton && canGoBack ? (
          renderIconButton("chevron-left", handleBackPress, "Back")
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </View>

      <View style={styles.titleContainer}>
        <Text numberOfLines={1} style={[styles.title, titleStyle]}>
          {title}
        </Text>
      </View>

      <View style={[styles.rightContainer, rightContainerStyle]}>
        {showProfileIcon &&
          renderIconButton("user", handleProfilePress, "Profile")}
        {showMenuIcon &&
          renderIconButton("more-vertical", onMenuPress, "More options", {
            marginLeft: showProfileIcon ? 8 : 0,
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
  },
  leftContainer: {
    width: ICON_CONTAINER_SIZE,
    alignItems: "flex-start",
  },
  iconButton: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    borderRadius: ICON_CONTAINER_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    // Light background circle for visibility
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  iconPressed: {
    opacity: 0.7,
    scale: 0.96, // Slight visual feedback on tap
  },
  iconPlaceholder: {
    width: ICON_CONTAINER_SIZE,
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    minWidth: ICON_CONTAINER_SIZE,
  },
});
