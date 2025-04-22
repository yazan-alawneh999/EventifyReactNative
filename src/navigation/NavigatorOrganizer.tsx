// AppNavigator.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreatNowEventScreen from '../screens/Home/HomeForOrganizer/CreateNowEventScreen';
import ProfileScreen from '../screens/Home/HomeForOrganizer/profileScreen';
import ListEventScreen from '../screens/Home/HomeForOrganizer/ListEventScreen';
import SigninScreen from '../screens/LoginSigninScreens/signinScreen';
import SignupScreen from '../screens/LoginSigninScreens/signupScreen';
import {RootStackParamList} from './RootStackParamList';
import UpdateEventScreen from '../screens/Home/HomeForOrganizer/EditEvent';
import LoginMainRoleScreen from '../screens/LoginSigninScreens/LoginMain';
import OrganizerSigninScreen from '../screens/LoginSigninScreens/loginForOrganizer';

<<<<<<< HEAD
// const Stack = createNativeStackNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
=======

import ShowProfileScreen from '../screens/SharedScreens/ShowProfileScreen.js';
import EditProfileScreen from '../screens/SharedScreens/EditProfileScereen.js';
import CreateProfileScreen from '../screens/SharedScreens/CreateProfileScreen.js';

import AllEventAttendanceScreen from '../screens/OrganizerScreens/AllEventAttendanceScreen.js';
import AllDiscountsScreen from '../screens/OrganizerScreens/GetAllDiscountsScreen.js';
import AddNewDiscountScreen from '../screens/OrganizerScreens/AddNewDiscountScreen.js';



const Stack = createNativeStackNavigator();
>>>>>>> 20b2db6842d14de03a8289620cb7389938da733b

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
<<<<<<< HEAD
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
=======


      <Stack.Screen name="AllEventAttendanceScreen" component={AllEventAttendanceScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="AllDiscountsScreen" component={AllDiscountsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="AddNewDiscountScreen" component={AddNewDiscountScreen} options={{ headerShown: false }}/>


      <Stack.Screen name="ShowProfile" component={ShowProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateProfile" component={CreateProfileScreen} options={{ headerShown: false }}/>



>>>>>>> 20b2db6842d14de03a8289620cb7389938da733b
    </Stack.Navigator>
  );
};

export default NavigatorForOrganizer;
