import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from './AuthContext';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

function RootNavigator() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <AppNavigator /> : <AuthNavigator />;
}

export default function NavigationRoot() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
