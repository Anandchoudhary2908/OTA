import React from "react";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { APP_SCREENS } from "./routes";
import { colors } from "../constants/theme";
import HomeScreen from "../screens/homescreen/HomeScreen";
import ProfileScreen from "../screens/profile/profile";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.cardBackground,
        },
        tabBarIcon: ({ color, size }) => {
          const iconMap = {
            [APP_SCREENS.HOME]: "home",
            [APP_SCREENS.PROFILE]: "user",
          };
          const iconName = iconMap[route.name] ?? "circle";
          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={APP_SCREENS.HOME}
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name={APP_SCREENS.PROFILE}
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}
