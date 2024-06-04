import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/components/screens/Home';
import Widgets from './src/components/screens/Widgets';
import Notifiacation from './src/components/screens/Notifiacation';
import AppNavigator from './src/components/AppNavigator';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return <Home />;
}

function WidgetScreen() {
  return <Widgets />;
}

function NotificationScreen() {
  return <Notifiacation />;
}

export default function App() {
  return (
    <AppNavigator />
  );
}
