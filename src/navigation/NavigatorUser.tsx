// AppNavigator.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeForUser/HomeScreen';
import AllEventsScreen from '../screens/Home/HomeForUser/AllEventScreen';
import EventDetailsScreen from '../screens/Home/HomeForUser/EventDetailsScreen';
import MapIntreactiveScreen from '../screens/Home/HomeForUser/MapScreen';
import Profile from '../screens/Home/HomeForUser/ProfileUserScreen';

const Stack = createNativeStackNavigator();

const NavigatorForUser = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Events" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapIntreactiveScreen} />
      <Stack.Screen name="user" component={Profile} />
      <Stack.Screen name="AllEventsScreen" component={AllEventsScreen} />
      <Stack.Screen name="EventDetailsScreen" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
};

export default NavigatorForUser;
