import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AUTH_SCREENS } from "../routes";
import LoginScreen from "../../screens/loginscreen/LoginScreen";

const Stack = createNativeStackNavigator();

const AUTH_NAVIGATOR_OPTIONS = {
  headerShown: false,
};

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={AUTH_NAVIGATOR_OPTIONS}>
      <Stack.Screen name={AUTH_SCREENS.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
}
