import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Dashboard from './stack.routes';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

Icon.loadFont();

export default function createRouter(isSigned = false) {
  return !isSigned ? (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </>
  ) : (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: '#7d40e7',
        inactiveTintColor: '#ccc',
        labelStyle: {
          fontSize: 14,
        },
        style: {
          backgroundColor: '#fff',
          height: 65,
          paddingTop: 8,
          paddingBottom: 8,
        },
        keyboardHidesTabBar: true,
      }}
    >
      <Tabs.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <Icon name="reorder" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle" size={28} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
