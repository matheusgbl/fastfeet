import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { createStackNavigator } from '@react-navigation/stack';

import { useNavigation } from '@react-navigation/native';
import Dashboard from './pages/Orders';
import Details from './pages/Orders/Details/OrderDetails';
import NewProblem from './pages/Orders/Details/NewProblem';

const Stack = createStackNavigator();

Icon.loadFont();

export default function DeliveryStack() {
  const navigation = useNavigation();

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
    </Stack.Navigator>
  );
}
