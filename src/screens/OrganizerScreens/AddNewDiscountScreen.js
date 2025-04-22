/* eslint-disable react-native/no-inline-styles */
import React,{ useState,useEffect} from 'react';
import axios from 'axios';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNavBar from '../../components/BottomNavbarForOrganizer.tsx';
import SuccessDialog from '../../components/SucesssPopupDialog';
import FailedDialog from '../../components/FailedPopupDialog.js';
import {BASE_URL} from '../Api.tsx';
import {getCredential}   from '../../../utils/Storage.js';

const { width, height } = Dimensions.get('window');
const CreateProfileScreen = ({navigation}) => {
    const [savedSuccessfuly,setSavedSuccessfuly] = useState(false);
    const [savedFailed,setSavedFailed] = useState(false);
    const [DiscountCode,setDiscountCode] = useState();
    const [DiscountAmount,setDiscountAmount] = useState();
    const [userId,setUserId] = useState();

    const isFormValid = () => {
        return (
            DiscountCode?.trim() &&
            DiscountAmount?.trim()
        );
      };


      const getUserIdAndData = async () => {
          const credentials = await getCredential();
          setUserId(credentials.userId);
        };
        useEffect(() => {
          getUserIdAndData();
        }, []);

const createDiscount = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/Discount/AddDiscount`,
        {
            userid: 22,
            discountcode: DiscountCode,
            discountamount:DiscountAmount,
          }
      );

      if (response.status === 200 || response.status === 201) {
        setSavedSuccessfuly(true);
        navigation.navigate('AllDiscountsScreen');
        console.log('Discount saved successfully');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error details:', error.response.data);
      } else {
        console.error('Discount save failed:', error.message);
      }
      setSavedFailed(true);
    }
  };

return (
    <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">


            <SuccessDialog
                visible={savedSuccessfuly}
                setVisible={setSavedSuccessfuly}
                title="Success!"
                message="Successfully Created"
            />

            <FailedDialog
                visible={savedFailed}
                setVisible={setSavedFailed}
                title="Failed to Create!"
                message="Make sure you fill in all required fields"
            />
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black"/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Create Discount</Text>
            </View>

            <Image
                // source={require('../../assets/Images/SmallLogo.png')}
                style={styles.profileImage}
            />

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Discount Code</Text>
                <TextInput style={styles.input} placeholder="Code" placeholderTextColor={'#546cfc'} onChangeText={setDiscountCode}/>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Discount Amount</Text>
                <TextInput style={styles.input} placeholder="Amount" placeholderTextColor={'#546cfc'} onChangeText={ setDiscountAmount}/>
            </View>


            <TouchableOpacity style={[styles.saveButton , { backgroundColor: isFormValid() ? '#546cfc' : '#ccc' }]}  onPress={createDiscount} disabled={!isFormValid()}>
                <Text style={styles.saveButtonText}>Save Discount</Text>
            </TouchableOpacity>
        </ScrollView>
        <BottomNavBar navigation={navigation}/>
    </KeyboardAvoidingView>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  safeArea: {
      flex: 1,
      backgroundColor: '#fff',
  },
  flex: {
      flex: 1,
  },
  container: {
      padding: 16,
      paddingBottom: height * 0.10,
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
  },
  headerText: {
      fontSize: 18,
      marginLeft: width * 0.25,
  },
  profileImage: {
    marginVertical: height * 0.03,
    width: width * 0.4,
    height: height * 0.19,
    alignSelf:'center',
      borderRadius: 999,
      elevation: 5,
  },
  inputContainer: {
      width: '100%',
      height: height * 0.08,
      marginBottom: height * 0.04,
  },
  label: {
      marginLeft: width * 0.01,
      marginBottom: height * 0.01,
      fontWeight: '600',
      fontSize: 14,
      color: '#546cfc',
  },
  input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 12,
      padding: 12,
      fontSize: 14,
      backgroundColor: '#fff',
      color: '#546cfc',
      height: height * 0.065,
  },
  saveButton: {
      marginTop: height * 0.15,
      backgroundColor: '#546cfc',
      height: height * 0.07,
      width: width * 0.9,
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 12,
      justifyContent: 'center',
  },
  saveButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
  },
});

export default CreateProfileScreen;
