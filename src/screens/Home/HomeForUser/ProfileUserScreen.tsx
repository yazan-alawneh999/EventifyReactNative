import React from 'react';
import {Text, View} from 'react-native';
import BottomNavBar from '../../../components/BottomNavbarForUser';

const Profile = ({_navigation}: {_navigation: any}) => {
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Profile</Text>
      </View>
      <BottomNavBar />
    </>
  );
};
export default Profile;
