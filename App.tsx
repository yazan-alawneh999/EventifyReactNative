/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import HomeScreen from './src/screens/Home/HomeForUser/HomeScreen';
function App(): React.JSX.Element {
  return (
    // <NavigationContainer>
    //   <AppNavigator />
    // </NavigationContainer>]

    <HomeScreen />
  );
}

export default App;
