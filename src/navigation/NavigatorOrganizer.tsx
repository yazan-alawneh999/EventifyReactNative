// AppNavigator.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreatNowEventScreen from '../screens/Home/HomeForOrganizer/CreateNowEventScreen';
import ProfileScreen from '../screens/Home/HomeForOrganizer/profileScreen';
import ListEventScreen from '../screens/Home/HomeForOrganizer/ListEventScreen';

const Stack = createNativeStackNavigator();

const NavigatorForOrganizer = () => {
  return (
    <Stack.Navigator
      initialRouteName="list"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="list" component={ListEventScreen} />
      <Stack.Screen name="CreateEvent" component={CreatNowEventScreen} />
      <Stack.Screen name="file-plus" component={CreatNowEventScreen} />
      <Stack.Screen name="Map" component={ProfileScreen} />
      <Stack.Screen name="user" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default NavigatorForOrganizer;
