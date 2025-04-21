// import React from 'react';
import React from 'react';
import {Text, View} from 'react-native';
import BottomNavBarOrganizer from '../../../components/BottomNavbarForOrganizer';

const ProfileScreen = ({navigation}) => {
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>ProfileScreen</Text>
      </View>
      <BottomNavBarOrganizer />
    </>
  );
};
export default ProfileScreen;
