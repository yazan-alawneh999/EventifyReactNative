/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {

} from 'react-native';

const Stack = createNativeStackNavigator();
import SigninScreen from './screens/signinScreen.js';
import SignupScreen from './screens/signupScreen.js';
import HomeScreen from './screens/homeScreen.js';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Signin">
      <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>
);
}

export default App;
