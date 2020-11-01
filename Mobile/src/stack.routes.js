import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from './pages/Orders';
import Confirm from './pages/Orders/Confirm';
import Details from './pages/Orders/Details';
import NewProblem from './pages/Orders/NewProblem';

const Stack = createStackNavigator();

Icon.loadFont();

export default function DeliveryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerTitle: 'Delivery details',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTitleStyle: { fontWeight: 'bold' },
          headerTintColor: '#fff',
          headerLeftContainerStyle: {
            left: 10,
          },
        }}
      />

      <Stack.Screen
        name="NewProblem"
        component={NewProblem}
        options={{
          headerTitle: 'Report problem',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeftContainerStyle: {
            left: 10,
          },
        }}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          headerTitle: 'Confirm Delivery',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeftContainerStyle: {
            left: 10,
          },
        }}
      />
    </Stack.Navigator>
  );
}
