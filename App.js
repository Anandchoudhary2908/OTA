import { StatusBar } from 'expo-status-bar';

import { useAutoUpdate } from './hooks/useAutoUpdate';
import NavigationRoot from './navigation';

export default function App() {
  useAutoUpdate();
  return (
    <>
      <StatusBar  />
      <NavigationRoot />
    </>
  );
}
