import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {UserProvider} from './src/components/UserContext';
import {navigationRef} from './src/screens/Api.tsx';
function App(): React.JSX.Element {
  return (
    <NavigationContainer ref={navigationRef}>
      <UserProvider>
        <AppNavigator />
        {/*<NavigatorForOrganizer />{' '}*/}
      </UserProvider>
    </NavigationContainer>
  );
}

export default App;
