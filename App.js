import 'react-native-gesture-handler';
import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AppNavigator />
    </>
  );
}

export default App;
registerRootComponent(App);