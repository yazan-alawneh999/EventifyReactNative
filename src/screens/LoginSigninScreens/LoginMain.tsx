import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/RootStackParamList';

const LoginMainRoleScreen = () => {
  const navigation = useNavigation<RootStackParamList>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your role</Text>

      <Image
        source={require('../../assets/Images/logo1.jpg')} // صورة اختيارية
        style={styles.image}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.buttonText}>Login as User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('OrganizerSigninScreen')}>
        <Text style={styles.buttonText}>Login as Organizer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginMainRoleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    color: '#333',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#5f6cff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
