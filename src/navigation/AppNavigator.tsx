import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStackParamList';
import SplashScreen from '../screens/onboradingScreenAndSplash/SplashScreen';
import React from 'react';
import OnboardingScreen1 from '../screens/onboradingScreenAndSplash/Onboarding1';
import OnboardingScreen2 from '../screens/onboradingScreenAndSplash/Onboarding2';
import OnboardingScreen3 from '../screens/onboradingScreenAndSplash/Onboarding3';
import SigninScreen from '../screens/LoginSigninScreens/signinScreen';
import SignupScreen from '../screens/LoginSigninScreens/signupScreen';
import {PayPal} from '../screens/PayPalScreen/PayPal';
import NavigatorForUser from './NavigatorOrganizer';

import ShowProfileScreen from '../screens/SharedScreens/ShowProfileScreen.js';
import EditProfileScreen from '../screens/SharedScreens/EditProfileScereen.js';
import CreateProfileScreen from '../screens/SharedScreens/CreateProfileScreen.js';

import AllEventAttendanceScreen from '../screens/OrganizerScreens/AllEventAttendanceScreen.js';
import AllDiscountsScreen from '../screens/OrganizerScreens/GetAllDiscountsScreen.js';
import AddNewDiscountScreen from '../screens/OrganizerScreens/AddNewDiscountScreen.js';

import BuyTicketScreen from '../screens/UserScreens/BuyticketScreen.js';
import TicketInfoScreen from '../screens/UserScreens/TicketInformationScreen.js';
import UserTicketScreen from '../screens/UserScreens/UserTicketsScreen.js';
import UserDiscountsScreen from '../screens/UserScreens/UserDiscountsScreen.js';

import LoginMainRoleScreen from '../screens/LoginSigninScreens/LoginMain';
import NavigatorForUser from './NavigatorUser';
import OrganizerSigninScreen from '../screens/LoginSigninScreens/loginForOrganizer';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="RootSplashScreen">
      <Stack.Screen
        name="RootSplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RootOnboardingScreen1"
        component={OnboardingScreen1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RootOnboardingScreen2"
        component={OnboardingScreen2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RootOnboardingScreen3"
        component={OnboardingScreen3}
        options={{headerShown: false}}
      />
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
        name="NavigatorForUser"
        component={NavigatorForUser}
        options={{headerShown: false}}
      />
      />
      <Stack.Screen
        name="PayPalScreen"
        component={PayPal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllEventAttendanceScreen"
        component={AllEventAttendanceScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllDiscountsScreen"
        component={AllDiscountsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddNewDiscountScreen"
        component={AddNewDiscountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShowProfile"
        component={ShowProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateProfile"
        component={CreateProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BuyTicket"
        component={BuyTicketScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TicketInfoScreen"
        component={TicketInfoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllTicktsScreen"
        component={UserTicketScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserDiscountsScreen"
        component={UserDiscountsScreen}
        options={{headerShown: false}}
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
}
