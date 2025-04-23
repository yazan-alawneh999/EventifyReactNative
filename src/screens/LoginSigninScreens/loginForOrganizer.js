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
import {storeCredential} from '../../../utils/Storage';

const LogoElement = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('../../assets/Images/logo1.jpg')}
        style={styles.logoPic}
      />
    </View>
  );
};

const SignUpLink = ({navigation}) => {
  return (
    <View style={styles.signUplinkContainer}>
      <Text style={styles.linkText}>Don't have an account? </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={[styles.linkText, {color: '#626df8'}]}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const OrganizerSigninScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateInputs = () => {
    let error = {};
    if (!userName) {
      error.username = 'Username is required';
    }
    if (!pass) {
      error.password = 'Password is required';
    }

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

      const userData = response.data;

      if (userData.role !== 2) {
        setErrorLogin('This account is not for organizer');
        setIsLoading(false);
        return;
      }

      console.log('✅ Organizer Login Success', userData);
      await storeCredential(userData);
      navigation.popToTop();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'list'}],
          ة,
        }),
      );
    } catch (error) {
      console.log('❌ Axios Error', error.message);
      if (error.response) {
        console.log('Server Response', error.response.data);
      }

      if (!error.response) {
        setErrorLogin('Network error or no response from server');
        return;
      }

      switch (error.response.status) {
        case 401:
          setErrorLogin('Invalid username or password');
          break;
        default:
          setErrorLogin('Unknown error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (errorLogin) {
      Alert.alert('Login Error', errorLogin, [
        {
          text: 'Ok',
          onPress: () => {
            setErrorLogin('');
          },
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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#626df8" />
      </TouchableOpacity>

      <LogoElement />

      <TextInput
        label={'User Name'}
        variant="outlined"
        value={userName}
        onChangeText={setUserName}
        leading={props => <Icon name="person-outline" {...props} />}
      />
      {errors.username ? (
        <Text style={styles.errorText}>{errors.username}</Text>
      ) : null}

      <TextInput
        label={'Password'}
        variant="outlined"
        value={pass}
        onChangeText={setPass}
        secureTextEntry={!showPassword}
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
        leading={props => <Icon name="lock-closed-outline" {...props} />}
      />
      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}

      <Button
        style={styles.signInButton}
        title={'Login as Organizer'}
        onPress={handleLogin}
      />

      <SignUpLink navigation={navigation} />
    </View>
  );
};

export default OrganizerSigninScreen;

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
    display: 'flex',
    alignSelf: 'center',
    marginTop: 80,
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
    flexDirection: 'row',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '5%',
    width: '100%',
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
});
