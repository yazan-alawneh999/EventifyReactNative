// AppNavigator.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeForUser/HomeScreen';
import AllEventsScreen from '../screens/Home/HomeForUser/AllEventScreen';
import EventDetailsScreen from '../screens/Home/HomeForUser/EventDetailsScreen';
import MapIntreactiveScreen from '../screens/Home/HomeForUser/MapScreen';
import Profile from '../screens/Home/HomeForUser/ProfileUserScreen';
import BuyTicketScreen from '../screens/UserScreens/BuyticketScreen.js';
import ShowProfileScreen from '../screens/SharedScreens/ShowProfileScreen.js';
import EditProfileScreen from '../screens/SharedScreens/EditProfileScereen.js';
import CreateProfileScreen from '../screens/SharedScreens/CreateProfileScreen.js';
import UserTicketScreen from '../screens/UserScreens/UserTicketsScreen.js';
import AllEventAttendanceScreen from '../screens/OrganizerScreens/AllEventAttendanceScreen.js';

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
      <Stack.Screen name="BuyTicket" component={BuyTicketScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ShowProfile" component={ShowProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateProfile" component={CreateProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="AllTicktsScreen" component={UserTicketScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="AllEventAttendanceScreen" component={AllEventAttendanceScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default NavigatorForUser;
