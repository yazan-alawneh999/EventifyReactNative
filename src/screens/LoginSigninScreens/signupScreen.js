/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */

// screens/ProfileScreen.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  View,
  StyleSheet,
  Image,
  Text,
  // TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert, StatusBar,
} from 'react-native';
import TextInput from '@react-native-material/core/src/TextInput';
import IconButton from '@react-native-material/core/src/IconButton';
import Button from '@react-native-material/core/src/Button';
import Icon from 'react-native-vector-icons/Ionicons';


const TopBar = ({navigation}) => {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signin')}
        style={styles.backArrowContainer}>
        <Image
          source={require('../../assets/Images/backArrow.png')}
          style={styles.backArrowIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const SignupInputs = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSignup = async () => {
    if (!validateInputs()) return;
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://2921-109-107-225-45.ngrok-free.app/api/event-manager/auth/register',
        {
          username: userName,
          password: pass,
          roleID: 3,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        setIsLoading(false);
        navigation.navigate('Signin');
      } else {
        setErrorSignUp(`Signup failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message);
      setErrorSignUp(`Unknown error`);
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    let error = {};
    if (!userName) error.username = 'Username is required';
    if (!pass) error.password = 'Password is required';
    if (!confirmPass) error.confirmPass = 'Confirm password is required';
    if (pass !== confirmPass) error.confirmPass = 'Passwords do not match';

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  useEffect(() => {
    if (errorSignUp) {
      console.log('⚠️ Showing alert with error:', errorSignUp); // Debug log
      Alert.alert('SingUp Error', errorSignUp, [
        {
          text: 'Ok',
          onPress: () => {
            setErrorSignUp('');
          },
          style: 'cancel',
        },
      ]);
    }
  }, [errorSignUp]);

  if (isLoading) {
    return (
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#626df8" />
          <Text>Signing Up...</Text>
        </SafeAreaView>
    );
  }

  return (
    <View style={styles.signinContainer}>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>Sign Up</Text>

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
        // style={styles.input}
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

      <TextInput
        // style={styles.input}
        label={'Confirm Password'}
        variant="outlined"
        value={confirmPass}
        onChangeText={setconfirmPass}
        secureTextEntry={!showConfirmPassword}
        trailing={props => (
          <IconButton
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            icon={iconProps => (
              <Icon
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={24}
                color={iconProps.color}
              />
            )}
            {...props}
          />
        )}
        leading={props => <Icon name="lock-closed-outline" {...props} />}
      />
      {errors.confirmPass ? (
        <Text style={styles.errorText}>{errors.confirmPass}</Text>
      ) : null}
      <Button
        style={styles.signInButton}
        title={'Sign Up'}
        onPress={() => {
          handleSignup();
        }}
      />
    </View>
  );
};

const SigninLink = ({navigation}) => {
  return (
    <View style={styles.signinlinkContainer}>
      <Text style={styles.linkText}>Already have an account? </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Text style={[styles.linkText, {color: '#626df8'}]}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function SignUpScreen({navigation}) {


  return (
    <View
      style={{flex: 1, alignContent: 'space-between', backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <SignupInputs navigation={navigation} />
      </View>
      <SigninLink navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 8,
    display: 'flex',
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: '20%',
  },
  logoPic: {
    width: '70%',
    height: '100%',
  },
  signinContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 18,
  },
  titleFont: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: '2%',
  },
  signInButton: {
    flexDirection: 'row',
    backgroundColor: '#626df8',
    borderRadius: 16,
    padding: 6,
    width: '100%',
    justifyContent: 'center',

    marginEnd: '10%',
  },
  signInButtonText: {
    width: '50%',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginStart: '15%',
  },
  ArrowIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '14%',
    height: '60%',
    backgroundColor: '#495eed',
    borderRadius: '50%',
  },
  ArrowIcon: {
    width: '65%',
    height: '50%',
  },
  topBar: {
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'center',
    elevation: 1,
  },
  backArrowContainer: {
    height: '100%',
    width: '20%',
    marginStart: '5%',
    display: 'flex',
    justifyContent: 'center',
  },
  backArrowIcon: {
    height: '50%',
    width: '40%',
    resizeMode: 'contain',
  },

  signinlinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '5%',
    width: '100%',
  },
  linkText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
