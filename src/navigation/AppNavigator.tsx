import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStackParamList';
import SplashScreen from '../screens/onboradingScreenAndSplash/SplashScreen';
import React from 'react';
import OnboardingScreen1 from '../screens/onboradingScreenAndSplash/Onboarding1';
import OnboardingScreen2 from '../screens/onboradingScreenAndSplash/Onboarding2';
import OnboardingScreen3 from '../screens/onboradingScreenAndSplash/Onboarding3';
import SigninScreen from '../screens/LoginSigninScreens/signinScreen';
import SignupScreen from '../screens/LoginSigninScreens/signupScreen';
import NavigatorForUser from './NavigatorOrganizer';
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
        name="RootHomeScreen"
        component={NavigatorForUser}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
