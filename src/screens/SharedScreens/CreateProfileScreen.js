/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
import {launchImageLibrary} from 'react-native-image-picker';
import UserBottomNavBar from '../../components/BottomNavbarForUser.tsx';
import OrgBottomNavBar from '../../components/BottomNavbarForOrganizer.tsx';
import BottomNavBar from '../../components/BottomNavBarScreen.js';
import SuccessDialog from '../../components/SucesssPopupDialog';
import FailedDialog from '../../components/FailedPopupDialog.js';
import {getCredential} from '../../../utils/Storage.js';
import {BASE_URL, api} from '../Api';

const {width, height} = Dimensions.get('window');
const CreateProfileScreen = ({navigation}) => {
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [city, setCity] = useState(null);
  const [userAge, setUserAge] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setphoneNumber] = useState(null);
  const [savedSuccessfuly, setSavedSuccessfuly] = useState(false);
  const [savedFailed, setSavedFailed] = useState(false);
  const [RoleID, setRoleID] = useState();
  const [userNamr, setUserName] = useState();
  const [userId, setUserId] = useState();
  const isFormValid = () => {
    return (
      firstName?.trim() &&
      lastName?.trim() &&
      city?.trim() &&
      userAge?.trim() &&
      email?.trim() &&
      phoneNumber?.trim() &&
      RoleID &&
      userNamr
    );
  };

  const getUserIdAndData = async () => {
    const credentials = await getCredential();
    setUserId(credentials.userId);
  };

  useEffect(() => {
    getUserIdAndData();
  }, []);

  useEffect(() => {
    if (userId) {
      getUserinfo(userId);
    }
  }, [userId]);

  const getUserinfo = async uID => {
    try {
      const token = (await getCredential()).token;

      const response = await api.get(
        `${BASE_URL}/api/event-manager/profile-details/${uID}`,
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

      const data = response.data;
      setRoleID(data.roleID);
      setUserName(data.username);
    } catch (error) {
      alert('Failed to get user information');
      console.error(error);
    }
  };

  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets[0];
        const imageFile = {
          uri: asset.uri,
          name: asset.fileName || 'photo.jpg',
          type: asset.type || 'image/jpeg',
        };
        setProfileImage(imageFile);
      }
    });
  };

  const createProfile = async () => {
    try {
      const token = (await getCredential()).token;
      const formData = new FormData();
      formData.append('FirstName', firstName);
      formData.append('LastName', lastName);
      formData.append('City', city);
      formData.append('Age', parseInt(userAge, 10).toString());
      formData.append('Email', email);
      formData.append('PhoneNumber', phoneNumber);

      formData.append('RoleID', RoleID);
      formData.append('Username', userNamr);

      if (profileImage) {
        formData.append('ImageFile', {
          uri: profileImage.uri,
          name: profileImage.name,
          type: profileImage.type,
        });
      } else {
        formData.append('ImageFile', '');
      }

      const response = await axios.post(
        `${BASE_URL}/api/event-manager/create-profile/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        setSavedSuccessfuly(true);
        console.log('Profile saved successfully');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error details:', error.response.data);
      } else {
        console.error('Profile save failed:', error.message);
      }
      setSavedFailed(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Create Profile</Text>
          </View>

          <View style={styles.profileImageContainer}>
            {/* <Image
  // source={
  //   profileImage
  //     ? { uri: profileImage }
  //     : '../../assets/Images/SmallLogo.png'
  // }
  style={styles.profileImage}
/> */}
            <TouchableOpacity
              style={styles.editIcon}
              onPress={handleSelectImage}>
              <Ionicons name="add" size={35} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileImageContainer}>
            <Image
              source={
                profileImage?.uri
                  ? {uri: profileImage.uri}
                  : '../../assets/images/SmallLogo.png'
              }
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.editIcon}
              onPress={handleSelectImage}>
              <Ionicons name="add" size={35} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="User"
              placeholderTextColor={'#546cfc'}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Family"
              placeholderTextColor={'#546cfc'}
              onChangeText={setLastName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Your age"
              placeholderTextColor={'#546cfc'}
              keyboardType="numeric"
              maxLength={2}
              onChangeText={setUserAge}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your Address</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#546cfc'}
              placeholder="city,jordan"
              onChangeText={setCity}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#546cfc'}
              placeholder="A12@ex.com"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(text)) {
                  setEmail(text);
                }
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.phoneContainer}>
              <Text style={styles.phoneCode}>+962</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="78999999"
                placeholderTextColor={'#546cfc'}
                keyboardType="phone-pad"
                maxLength={9}
                onChangeText={setphoneNumber}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.saveButton,
              {backgroundColor: isFormValid() ? '#546cfc' : '#ccc'},
            ]}
            onPress={createProfile}
            disabled={!isFormValid()}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>

        {userId === 2 ? (
          <UserBottomNavBar navigation={navigation} />
        ) : (
          <OrgBottomNavBar navigation={navigation} />
        )}
      </KeyboardAvoidingView>
      <BottomNavBar navigation={navigation} />
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
    paddingBottom: height * 0.1,
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
  profileImageContainer: {
    width: width * 0.4,
    height: height * 0.19,
    borderRadius: 999,
    alignSelf: 'center',
    marginVertical: height * 0.03,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    elevation: 5,
  },
  editIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.11,
    height: height * 0.054,
    position: 'absolute',
    bottom: 0,
    right: width * 0.03,
    backgroundColor: '#546cfc',
    borderRadius: 999,
    elevation: 3,
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
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.06,
  },
  phoneCode: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#fff',
    color: '#546cfc',
    fontWeight: 'bold',
    height: height * 0.065,
  },
  phoneInput: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderLeftWidth: 0,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: '#fff',
    height: height * 0.065,
    color: '#546cfc',
  },
  saveButton: {
    marginTop: height * 0.02,
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
