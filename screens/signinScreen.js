/* eslint-disable react-native/no-inline-styles */
// screens/ProfileScreen.js
import React, {useState} from 'react';
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
import {
  TextInput,
  Button, IconButton,
} from '@react-native-material/core';
import axios from 'axios';
import {getCredential,storeCredential} from "../utils/Storage";
// import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Icon from 'react-native-vector-icons/Ionicons';



const LogoElement = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logoPic}
      />
    </View>
  );
};
const myIcon = <Icon name="rocket" size={30} color="#900" />;


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

export default function SigninScreen({navigation}) {
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
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
    const response = await axios.post(
        "https://7130-5-45-132-73.ngrok-free.app/api/event-manager/auth/login",
        {
          username: userName,
          password: pass,
        }
    );

    console.log("Username:", userName, "Password:", pass);
    console.log("✅ Login Success", response.data);
    await storeCredential(response.data);

  } catch (error) {
    console.log("❌ Axios Error", error.message);
    if (error.response) {
      console.log("Server Response", error.response.data);
    }

    // Fix: error.status doesn't exist — should be error.response?.status
    switch (error.response.status) {
      case 401:
        setErrorLogin(
            `UnAuthorized`
        );
        break;
        default:
          setErrorLogin(
              error.response.data
          );
    }

  } finally {
    setIsLoading(false);
  }
};


if(errorLogin){
  Alert.alert('Login Error', errorLogin, [
    {
      text: 'Ok',
      onPress: () => {
        console.log('Cancel Pressed')},
      style: 'cancel',
    },
    // {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
}

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
        trailing={(props) => (
            <IconButton
                onPress={() => setShowPassword(!showPassword)}
                icon={(iconProps) => (
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
        title={'Login'}
        onPress={() => handleLogin()}
      />

      <SignUpLink navigation={navigation} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 8,

    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  logoContainer: {
    display: 'flex',
    alignSelf: 'center',
    // marginHorizontal: 'auto',
    marginTop: 100,

    width: 200,
    height: 120,
  },
  logoPic: {
    width: '70%',
    height: '100%',
  },
  signinContainer: {
    marginHorizontal: '5%',
    height: '30%',
    marginTop: '20%',
  },
  titleFont: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: '2%',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 16,
    height: '25%',
    marginBlock: '2%',
  },
  input: {
    fontSize: 16,
    color: '#333',
    width: '75%',
  },
  icon: {
    width: '10%',
    height: '75%',
    marginTop: '2%',
    marginStart: '2%',
  },
  toggleIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '10%',
  },
  toggleIcon: {
    width: '80%',
    height: '30%',
  },
  signInButton: {
    flexDirection: 'row',
    backgroundColor: '#626df8',
    borderRadius: 16,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginStart: '10%',
    height: 'auto',
    marginTop: '15%',
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
  signUplinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '5%',
    widht: '100%',
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
