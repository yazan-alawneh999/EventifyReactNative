/* eslint-disable react-native/no-inline-styles */
// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, StyleSheet ,Image,Text, TextInput,TouchableOpacity} from 'react-native';



const LogoElement  = () =>{
    return(
        <View style={styles.logoContainer}>
            <Image source={require('../assets/images/logo.png')}
            style={styles.logoPic}/>
        </View>
    );
};

const SigninInputs = ({ navigation }) =>{
    const [userName, setUserName] = useState('');
    const [pass,setPass] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);


    const handleSignIn = () => {
        navigation.navigate('Signup');
    };

    return(
        <View style={styles.signinContainer}>
            <Text style={styles.titleFont}>Sign in</Text>
            <View style={styles.inputContainer}>
                <Image
                    source={require('../assets/images/emailIcon.png')}
                    style={styles.icon}
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

            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>

                    <Text style={styles.signInButtonText}>SIGN IN</Text>
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

const SignUpLink = ({ navigation }) => {

    return(
        <View style={styles.signUplinkContainer}>
            <Text style={styles.linkText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={[styles.linkText,{color:'#626df8'}]}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};



export default function SigninScreen ({ navigation }) {
    return (
        <View style={styles.container}>
            <LogoElement/>
            <SigninInputs navigation={navigation}/>
            <SignUpLink navigation={navigation}/>
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
signUplinkContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    height:'5%',
    widht:'100%',
    marginTop:'45%',
},
linkText:{
    fontWeight:'bold',
    fontSize:15,
},
});
