import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {CommonActions} from '@react-navigation/native';
import TextInput from '@react-native-material/core/src/TextInput';
import IconButton from '@react-native-material/core/src/IconButton';
import Button from '@react-native-material/core/src/Button';
import {api, BASE_URL} from '../Api';
import {
  getCredential,
  getRole,
  isOrganizer,
  storeCredential,
} from '../../../utils/Storage';
import axios from 'axios';

const LogoElement = () => (
  <View style={styles.logoContainer}>
    <Image
      source={require('../../assets/Images/logo1.jpg')}
      style={styles.logoPic}
    />
  </View>
);

const SignUpLink = ({navigation}) => (
  <View style={styles.signUplinkContainer}>
    <Text style={styles.linkText}>Don't have an account? </Text>
    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
      <Text style={[styles.linkText, {color: '#626df8'}]}>Sign Up</Text>
    </TouchableOpacity>
  </View>
);

const SigninScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateInputs = () => {
    let error = {};
    if (!userName) error.username = 'Username is required';
    if (!pass) error.password = 'Password is required';

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleLogin = async () => {
    setIsLoading(true);
    if (!validateInputs()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post(
        `${BASE_URL}/api/event-manager/auth/login`,
        {
          username: userName,
          password: pass,
        },
      );

      // const response = await axios.post(`https://18b9-109-107-251-55.ngrok-free.app/api/event-manager/auth/login`, {
      //   username: userName,
      //   password: pass,
      // });

      console.log('✅ Login Success', response.data);
      await storeCredential(response.data);

      console.log('isOrganizer', await isOrganizer());
      console.log('role', await getRole());

      const creds = await getCredential();
      if (creds?.token) {
        const isOrg = await isOrganizer();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: isOrg ? 'OrgnizerScreens' : 'UserScreens'}],
          }),
        ); // <-- this closing bracket was missing!
      }
    } catch (error) {
      console.log('❌ Axios Error', error.message);
      if (error.response) {
        console.log('Server Response', error.response.data);
        switch (error.response.status) {
          case 401:
            setErrorLogin('Unauthorized');
            break;
          default:
            setErrorLogin('Unknown error');
        }
      } else {
        setErrorLogin('Network error or no response from server');
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const checkLogin = async () => {
      const creds = await getCredential();
      if (creds?.token) {
        const isOrg = await isOrganizer();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: isOrg ? 'OrgnizerScreens' : 'UserScreens'}],
          }),
        );
      }
    };

    checkLogin();
  }, []);
  useEffect(() => {
    if (errorLogin) {
      Alert.alert('Login Error', errorLogin, [
        {
          text: 'Ok',
          onPress: () => setErrorLogin(''),
          style: 'cancel',
        },
      ]);
    }
  }, [errorLogin]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#626df8" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <LogoElement />
      <TextInput
        label="User Name"
        variant="outlined"
        value={userName}
        onChangeText={setUserName}
        leading={props => <Icon name="person-outline" {...props} />}
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}

      <TextInput
        label="Password"
        variant="outlined"
        value={pass}
        onChangeText={setPass}
        secureTextEntry={!showPassword}
        leading={props => <Icon name="lock-closed-outline" {...props} />}
        trailing={props => (
          <IconButton
            onPress={() => setShowPassword(!showPassword)}
            icon={iconProps => (
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color={iconProps.color}
              />
            )}
            {...props}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <Button style={styles.signInButton} title="Login" onPress={handleLogin} />

      <SignUpLink navigation={navigation} />
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 8,
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  logoContainer: {
    alignSelf: 'center',
    marginTop: 100,
    width: 200,
    height: 120,
  },
  logoPic: {
    width: '100%',
    height: 50,
    alignSelf: 'center',
    marginTop: 40,
  },
  signInButton: {
    backgroundColor: '#626df8',
    borderRadius: 16,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
    marginTop: '15%',
  },
  signUplinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '45%',
  },
  linkText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight,
  },
});
