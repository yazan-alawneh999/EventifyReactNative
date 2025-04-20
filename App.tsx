import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import NavigatorForOrganizer from './src/navigation/NavigatorOrganizer';
import {UserProvider} from './src/components/UserContext';
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <UserProvider>
        {/* <AppNavigator /> */}
        <NavigatorForOrganizer />{' '}
      </UserProvider>
    </NavigationContainer>
  );
}

export default App;
