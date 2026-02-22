import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { APP_SCREENS } from "./routes";
import TabNavigator from "./tabnavigator";
import ChatsScreen from "../screens/chats/chats";
import ChatDetails from "../screens/chats/chatdetails";
import NotificationScreen from "../screens/notification/notification";
import ProfileScreen from "../screens/profile/profile";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={APP_SCREENS.MAIN_TABS} component={TabNavigator} />
      <Stack.Screen
        name={APP_SCREENS.NOTIFICATION}
        component={NotificationScreen}
      />
      <Stack.Screen name={APP_SCREENS.CHATS} component={ChatsScreen} />
      <Stack.Screen
        name={APP_SCREENS.CHAT_DETAILS}
        component={ChatDetails}
      />
      <Stack.Screen name={APP_SCREENS.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
}