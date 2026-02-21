import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AUTH_SCREENS } from "./routes";
import LoginScreen from "../screens/loginscreen/LoginScreen";
import ForgetPassword from "../screens/loginscreen/forgetpassword";

const Stack = createNativeStackNavigator();

const AUTH_NAVIGATOR_OPTIONS = {
  headerShown: false,
};

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={AUTH_NAVIGATOR_OPTIONS}>
      <Stack.Screen name={AUTH_SCREENS.LOGIN} component={LoginScreen} />
      <Stack.Screen
        name={AUTH_SCREENS.FORGOT_PASSWORD}
        component={ForgetPassword}
      />
    </Stack.Navigator>
  );
}
