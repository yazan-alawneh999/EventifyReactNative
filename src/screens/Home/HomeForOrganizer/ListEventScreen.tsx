import React from 'react';
import {Text, View} from 'react-native';
import BottomNavBarOrganizer from '../../../components/BottomNavbarForOrganizer';

const ListEventScreen = ({navigation}) => {
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>ListEventScreen</Text>
      </View>
      <BottomNavBarOrganizer />
    </>
  );
};
export default ListEventScreen;
