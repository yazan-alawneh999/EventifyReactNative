// AppNavigator.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreatNowEventScreen from '../screens/Home/HomeForOrganizer/CreateNowEventScreen';
import ProfileScreen from '../screens/Home/HomeForOrganizer/profileScreen';
import ListEventScreen from '../screens/Home/HomeForOrganizer/ListEventScreen';
import SignupScreen from '../screens/LoginSigninScreens/signupScreen';
import {RootStackParamList} from './RootStackParamList';
import UpdateEventScreen from '../screens/Home/HomeForOrganizer/EditEvent';
import LoginMainRoleScreen from '../screens/LoginSigninScreens/LoginMain';
import OrganizerSigninScreen from '../screens/LoginSigninScreens/loginForOrganizer';
import SigninScreen from '../../screens/signinScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigatorForOrganizer = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginMainRole"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="list" component={ListEventScreen} />
      <Stack.Screen name="CreateEvent" component={CreatNowEventScreen} />
      <Stack.Screen name="fileplus" component={CreatNowEventScreen} />
      <Stack.Screen name="Map" component={ProfileScreen} />
      <Stack.Screen name="user" component={ProfileScreen} />
      <Stack.Screen name="EditEvent" component={UpdateEventScreen} />
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false, title: 'Signup'}}
      />
      <Stack.Screen
        name="LoginMainRole"
        component={LoginMainRoleScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrganizerSigninScreen"
        component={OrganizerSigninScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default NavigatorForOrganizer;
