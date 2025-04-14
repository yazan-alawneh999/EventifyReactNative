/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */

// screens/ProfileScreen.js
import React, { useState } from 'react';
import axios from 'axios';
import { View, StyleSheet ,Image,Text, TextInput,TouchableOpacity} from 'react-native';


const TopBar = ({ navigation }) => {
    return(
    <View style={styles.topBar}>
        <TouchableOpacity
                onPress={() => navigation.navigate('Signin')}
                style={styles.backArrowContainer}
        >
        <Image source={require('../assets/images/backArrow.png')}
            style={styles.backArrowIcon}
        />
        </TouchableOpacity>
    </View>
    );
};

const SignupInputs = ({ navigation }) =>{
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [pass,setPass] = useState('');
    const [confirmPass,setconfirmPass] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [isConfirmed,setIsConfirmed] = useState(false);




    const handleSignup = async () => {
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
            }
        );

        if (response.status === 200 || response.status === 201) {
            navigation.navigate('Home');
        } else {
            throw new Error(`Signup failed with status: ${response.status}`);
        }
        } catch (error) {
            console.error('Signup Error:', error.response?.data || error.message);
            alert('Signup failed. See console for details.');
        }
    };


    const checkConfirmPassword = (val) =>{
        setconfirmPass(val);
        if(pass === confirmPass){
            setIsConfirmed(true);
        }else{
            setIsConfirmed(false);
        }
    };

    const showAlert = () =>{
        alert('Password missmatch');
    };

    return(
        <View style={styles.signinContainer}>
            <Text style={styles.titleFont}>Sign Up</Text>

            <View style={styles.inputContainer}>
                <Image
                    source={require('../assets/images/userIcon.png')}
                    style={styles.userNameIcon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="User Name"
                    placeholderTextColor="#888"
                    value={userName}
                    onChangeText={(value) =>setUserName(value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>


            <View style={styles.inputContainer}>
                <Image
                    source={require('../assets/images/emailIcon.png')}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={(value) =>setEmail(value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>


            <View style={styles.inputContainer}>
                <Image
                    source={require('../assets/images/lockIcon.png')}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Your password"
                    placeholderTextColor="#888"
                    value={pass}
                    onChangeText={(val)=>setPass(val)}
                    secureTextEntry={!passwordVisible}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.toggleIconContainer}
                >
                    <Image
                        source={passwordVisible
                            ? require('../assets/images/showPassIcon.png')
                            : require('../assets/images/hideIcon.png')}
                            style={styles.toggleIcon}
                    />
                </TouchableOpacity>
            </View>



            <View style={styles.inputContainer}>
                <Image
                    source={require('../assets/images/lockIcon.png')}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor="#888"
                    value={confirmPass}
                    onChangeText={(val)=>checkConfirmPassword(val)}
                    secureTextEntry={!confirmVisible}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                onPress={() => setConfirmVisible(!confirmVisible)}
                style={styles.toggleIconContainer}
                >
                    <Image
                        source={confirmVisible
                            ? require('../assets/images/showPassIcon.png')
                            : require('../assets/images/hideIcon.png')}
                            style={styles.toggleIcon}
                    />
                </TouchableOpacity>
            </View>



            <TouchableOpacity
            style={styles.signInButton}
            onPress={isConfirmed ? showAlert : handleSignup}>
                    <Text style={styles.signInButtonText}>SIGN UP</Text>
                    <View style={styles.ArrowIconContainer}>
                        <Image
                            source={
                            require('../assets/images/ArrowIcon.png')
                            }
                        style={styles.ArrowIcon}
                        />
                    </View>
            </TouchableOpacity>

        </View>
    );
};

const SigninLink = ({ navigation }) => {

    return(
        <View style={styles.signinlinkContainer}>
            <Text style={styles.linkText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Text style={[styles.linkText,{color:'#626df8'}]}>Sign in</Text>
            </TouchableOpacity>
        </View>
    );
};




export default function SignUpScreen ({ navigation }) {
    return (
        <View style={styles.container}>
            <TopBar navigation={navigation}/>
            <SignupInputs navigation={navigation}/>
            <SigninLink navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
container: {
    backgroundColor:'white',
    height:'100%',
    width:'100%',
},
logoContainer:{
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'25%',
    width:'100%',
    height:'20%',
},
logoPic:{
    width:'70%',
    height:'100%',
},
signinContainer:{
marginHorizontal:'5%',
height:'30%',
marginTop:'20%',
},
titleFont:{
    fontSize:25,
    fontWeight:'bold',
    marginBottom:'2%',
},
inputContainer:{
    display:'flex',
    flexDirection:'row',
    alignContent:'center',
    borderWidth:2,
    borderColor:'lightgray',
    borderRadius:16,
    height:'25%',
    marginBlock:'2%',
},
input: {
    fontSize: 16,
    color: '#333',
    width:'75%',
},
icon: {
    width: '10%',
    height: '75%',
    marginTop:'2%',
    marginStart: '2%',
},
toggleIconContainer:{
    display:'flex',
    justifyContent:'center',
    width:'10%',
},
toggleIcon:{
    width:'80%',
    height:'30%',
},
signInButton: {
    flexDirection: 'row',
    backgroundColor:'#626df8',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width:'80%',
    marginStart:'10%',
    height:'25%',
    marginTop:'15%',
},
signInButtonText: {
    width:'50%',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center',
    marginStart:'15%',
},
ArrowIconContainer:{
display:'flex',
justifyContent:'center',
alignItems:'center',
width:'14%',
height:'60%',
backgroundColor:'#495eed',
borderRadius:'50%',
},
ArrowIcon:{
    width:'65%',
    height:'50%',
},
topBar:{
  width:'100%',
  height:'10%',
  display:'flex',
  justifyContent:'center',
  elevation:1,
},
backArrowContainer:{
height:'100%',
width:'20%',
marginStart:'5%',
display:'flex',
justifyContent:'center',
},
backArrowIcon:{
height:'50%',
width:'40%',
resizeMode: 'contain',
},
userNameIcon:{
  width: '10%',
  height: '55%',
  marginTop:'3%',
  marginStart: '2%',
  resizeMode: 'contain',
},
signinlinkContainer:{
  display:'flex',
  flexDirection:'row',
  justifyContent:'center',
  height:'5%',
  widht:'100%',
  marginTop:'92%',
},
linkText:{
  fontWeight:'bold',
  fontSize:15,
},
});
