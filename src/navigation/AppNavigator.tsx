import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStackParamList';
import SplashScreen from '../screens/onboradingScreenAndSplash/SplashScreen';
import React from 'react';
import OnboardingScreen1 from '../screens/onboradingScreenAndSplash/Onboarding1';
import OnboardingScreen2 from '../screens/onboradingScreenAndSplash/Onboarding2';
import OnboardingScreen3 from '../screens/onboradingScreenAndSplash/Onboarding3';
import SignupScreen from '../screens/LoginSigninScreens/signupScreen';
import {PayPal} from '../screens/PayPalScreen/PayPal';
import LoginMainRoleScreen from '../screens/LoginSigninScreens/LoginMain';
import NavigatorForUser from './NavigatorUser';
import OrganizerSigninScreen from '../screens/LoginSigninScreens/loginForOrganizer';
import SigninScreen from '../../screens/signinScreen';
import UserDiscountsScreen from '../screens/UserScreens/UserDiscountsScreen';
import UserTicketScreen from '../screens/UserScreens/UserTicketsScreen';
import TicketInfoScreen from '../screens/UserScreens/BuyticketScreen';
import EditProfileScreen from '../screens/SharedScreens/EditProfileScereen';
import ShowProfileScreen from '../screens/SharedScreens/ShowProfileScreen';
import AddNewDiscountScreen from '../screens/OrganizerScreens/AddNewDiscountScreen';
import AllDiscountsScreen from '../screens/OrganizerScreens/GetAllDiscountsScreen';
import AllEventAttendanceScreen from '../screens/OrganizerScreens/AllEventAttendanceScreen';
import CreateProfileScreen from '../screens/SharedScreens/CreateProfileScreen';
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
        component={UserTicketScreen}
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
