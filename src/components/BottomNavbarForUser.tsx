// BottomNavBar.tsx
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');

const BottomNavBar = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();

  const icons = [
    {name: 'home', screen: 'UserScreens'},
    // {name: 'calendar', screen: 'BuyTicket'},
    {name: 'map-pin', screen: 'Map'},
    {name: 'user', screen: 'ShowProfile'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {icons.map(icon => {
          const isSelected = route.name === icon.screen;

          return (
            <TouchableOpacity
              key={icon.name}
              style={isSelected ? styles.centerButton : styles.iconContainer}
              onPress={() => navigation.navigate(icon.screen)}>
              <Icon
                name={icon.name}
                size={24}
                style={
                  isSelected ? styles.CurrentIconButton : styles.iconButton
                }
              />
              <Text
                style={isSelected ? styles.SelectedSubtitle : styles.subtitle}>
                {icon.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: '100%',
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: width,
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 7,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    color: '#666',
  },
  CurrentIconButton: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
  },
  SelectedSubtitle: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
  },
  centerButton: {
    backgroundColor: '#546cfc',
    borderRadius: 50,
    padding: 10,
    marginTop: -40,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
});

export default BottomNavBar;
