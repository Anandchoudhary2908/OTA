import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import NavigationRoot from './navigation';
import { checkForOTAUpdate } from './updateService';

export default function App() {
  useEffect(() => {
    checkForOTAUpdate();
  }, []);
  return (
    <>
      <StatusBar style="auto" />
      <NavigationRoot />
    </>
  );
}
