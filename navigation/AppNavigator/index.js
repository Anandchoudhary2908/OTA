import React from "react";

import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { APP_SCREENS } from "../routes";
import { colors } from "../../constants/theme";
import HomeScreen from "../../screens/homescreen/HomeScreen";
import ProfileScreen from "../../screens/profile/profile";
import ChatsScreen from "../../screens/chats/chats";

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={APP_SCREENS.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

function MainTabs() {
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
          let iconName = "circle";

          switch (route.name) {
            case APP_SCREENS.HOME_TAB:
              iconName = "home";
              break;
            case APP_SCREENS.PROFILE:
              iconName = "user";
              break;
            default:
              break;
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={APP_SCREENS.HOME_TAB}
        component={HomeStackNavigator}
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

export default function AppNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={APP_SCREENS.ROOT}
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={APP_SCREENS.CHATS}
        component={ChatsScreen}
        options={{ title: "Chats" }}
      />
    </RootStack.Navigator>
  );
}
