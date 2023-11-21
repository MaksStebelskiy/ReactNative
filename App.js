import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/home/home.js';
import ViewScreen from './screens/view/view.js';
import ManageScreen from './screens/manage/manage.js';
import { View } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'green', // Колір фону для заголовка
          }
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ViewScreen" component={ViewScreen} />
        <Stack.Screen name='ManageScreen' component={ManageScreen} />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
};

export default App;
