import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Widgets from './screens/Widgets';
import Notifiacation from './screens/Notifiacation';
import Forecast from './screens/Forcast';
import HomeDark from '../assets/images/home-dark.svg';
import WidgetsDark from '../assets/images/widget-dark.svg';
import NotificationDark from '../assets/images/notifications-dark.svg';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="ForecastScreen" component={Forecast} options={{ title: 'Forecast', headerShown: false }} />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let IconComponent;

          if (route.name === 'Home') {
            IconComponent = HomeDark;
          } else if (route.name === 'Widgets') {
            IconComponent = WidgetsDark;
          } else if (route.name === 'Notification') {
            IconComponent = NotificationDark;
          }

          return (
            <IconComponent
              width={size}
              height={size}
              fill={color}
              style={{ opacity: focused ? 1 : 0.5 }}
            />
          );
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: 'white',
        tabBarLabel: () => null,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Widgets" component={Widgets} />
      <Tab.Screen name="Notification" component={Notifiacation} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
}

export default AppNavigator;
