import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AppNavigator />
      {/* <NavigatorForOrganizer /> */}
    </NavigationContainer>
  );
}

export default App;
