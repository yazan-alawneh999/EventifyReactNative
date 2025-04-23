import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import UserBottomNavBar from '../../components/BottomNavbarForUser.tsx';
import OrgBottomNavBar from '../../components/BottomNavbarForOrganizer.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BASE_URL} from '../Api';
import {getCredential, logout,isOrganizer} from '../../../utils/Storage.js';

const ProfilNotExists = ({navigation}) => {
  return (
    <View style={styles.NotFountcontainer}>
      <Ionicons name="alert-circle" size={150} color="#546cfc" />
      <Text style={styles.notFountText}>Don't have an account yet?</Text>

      <TouchableOpacity
        style={styles.EditProfileButton}
        onPress={() => navigation.navigate('CreateProfile')}>
        <View style={styles.NotFoundbuttonContainer}>
          <Text style={styles.NotFoundButtonText}>Create your profile</Text>
          <View style={styles.ArrowIconContainer}>
            <Ionicons name="arrow-forward" size={24} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ProfilExists = ({
  navigation,
  fName,
  LNaem,
  proilePic,
  age,
  location,
  phone,
  emailaddress,
  isOrgan,
}) => {

  return (
    <View style={styles.container}>
      <Image
        source={
          proilePic === '../../assets/Images/imagesError.png'
            ? '../../assets/Images/imagesError.png'
            : {uri: proilePic}
        }
        style={styles.avatar}
      />

      <Text style={styles.name}>{`${fName} ${LNaem}`}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile')}>
        <Ionicons name="create" size={24} color="#546cfc" />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About Me</Text>

        <View style={styles.userInfo}>
          <Ionicons name="person" size={23} color="#546cfc" />
          <Text style={styles.aboutText}>Age: {age}</Text>
        </View>

        <View style={styles.userInfo}>
          <Ionicons name="location" size={23} color="red" />
          <Text style={styles.aboutText}>City: {location}</Text>
        </View>

        <View style={styles.userInfo}>
          <Ionicons name="call" size={23} color="#00c703" />
          <Text style={styles.aboutText}>Phone: {phone}</Text>
        </View>

        <View style={styles.userInfo}>
          <Ionicons name="mail" size={23} color="#f06f05" />
          <Text style={styles.aboutText}>Email: {emailaddress}</Text>
        </View>
      </View>

      {isOrgan ? (
        <></>
      ) : (
        <>
          <TouchableOpacity
            style={styles.EditProfileButton}
            onPress={() => {
              navigation.navigate('AllTicktsScreen');
            }}>
            <View style={styles.buttonContainer}>
              <Text style={styles.EditProfileButtonText}>Your Tickets</Text>
              <View style={styles.ArrowIconContainer}>
                <Ionicons name="arrow-forward" size={24} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.EditProfileButton}
            onPress={() => {
              navigation.navigate('UserDiscountsScreen');
            }}>
            <View style={styles.buttonContainer}>
              <Text style={styles.EditProfileButtonText}>Your Discount</Text>
              <View style={styles.ArrowIconContainer}>
                <Ionicons name="arrow-forward" size={24} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>
      </>
      )}


{/* 
      <TouchableOpacity
        style={styles.EditProfileButton}
        onPress={() => {
          navigation.navigate('AllTicktsScreen');
        }}>
        <View style={styles.buttonContainer}>
          <Text style={styles.EditProfileButtonText}>Your Tickets</Text>
          <View style={styles.ArrowIconContainer}>
            <Ionicons name="arrow-forward" size={24} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.EditProfileButton}
        onPress={() => {
          navigation.navigate('UserDiscountsScreen');
        }}>
        <View style={styles.buttonContainer}>
          <Text style={styles.EditProfileButtonText}>Your Discount</Text>
          <View style={styles.ArrowIconContainer}>
            <Ionicons name="arrow-forward" size={24} color="#fff" />
          </View>
        </View>
      </TouchableOpacity> */}


    </View>
  );
};

const ProfileScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('User');
  const [lastName, setLastName] = useState('User');
  const [city, setCity] = useState('Location');
  const [userAge, setUserAge] = useState(0);
  const [email, setEmail] = useState('User@Example.com');
  const [phoneNumber, setphoneNumber] = useState('+962 *********');
  const [profileImage, setProfileImage] = useState(
    '../../assets/Images/imagesError.png',
  );
  const [accountExists, setAccountExists] = useState(true);
  const [userId, setUserId] = useState();
  const [isOrg,setIsOrg] = useState(false);

  const getUserIdAndData = async () => {
    const credentials = await getCredential();
    const result = await isOrganizer();
    setIsOrg(result);
    setUserId(credentials.userId);
  };
  useEffect(() => {
    getUserIdAndData();
  }, []);

  const getProfileData = async UserID => {
    try {
      const token = (await getCredential()).token;
      const response = await axios.get(
        `${BASE_URL}/api/event-manager/profile-details/${UserID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data;
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setCity(data.city);
      setUserAge(data.age);
      setEmail(data.email);
      setphoneNumber(data.phoneNumber);
      setProfileImage(
        data.profileImage != null
          ? data.profileImage.replace(`${BASE_URL}/images/`, '')
          : '../../assets/Images/imagesError.png',
      );

      if (response.status === 200 || response.status === 201) {
        setAccountExists(true);
      }
    } catch (error) {
      setAccountExists(false);
    }
  };

  useEffect(() => {
    getProfileData(userId);
  }, [userId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Profile</Text>
          </View>

          {accountExists ? (
            <ProfilExists
              navigation={navigation}
              fName={firstName}
              LNaem={lastName}
              proilePic={profileImage}
              age={userAge}
              location={city}
              phone={phoneNumber}
              emailaddress={email}
              isOrgan={isOrg}
            />
          ) : (
            <ProfilNotExists navigation={navigation} />
          )}
        </ScrollView>
        {isOrg ? (
          <OrgBottomNavBar navigation={navigation} />
        ) : (
          <UserBottomNavBar navigation={navigation} />
        )}
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
    height: '100%',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  headerText: {
    fontSize: 18,
    marginLeft: '36%',
  },

  avatar: {
    width: '55%',
    height: '23%',
    borderRadius: 999,
    alignSelf: 'center',
    marginVertical: '5%',
  },
  name: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '600',
    marginBottom: 10,
  },
  aboutSection: {
    marginTop: '3%',
    height: '25%',
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 17,
    marginBottom: 8,
  },
  aboutText: {
    color: '#4A5568',
    fontSize: 15,
    marginVertical: '1%',
    marginInline: '2%',
  },
  editButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#546cfc',
    borderRadius: 12,
    width: '60%',
    height: '7%',
  },
  editText: {
    color: '#546cfc',
    fontWeight: '500',
  },

  userInfo: {
    display: 'flex',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
  },

  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#546cfc',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  EditProfileButton: {
    width: '60%',
    height: '7%',
    alignSelf: 'center',
    marginBottom: '2%',
  },
  EditProfileButtonText: {
    width: '50%',
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    marginStart: '15%',
    fontWeight: '500',
  },
  ArrowIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '16%',
    height: '62%',
    backgroundColor: '#495eed',
    borderRadius: '50%',
  },

  NotFountcontainer: {
    padding: 16,
    paddingTop: '30%',
    height: '100%',
    alignItems: 'center',
  },
  notFountText: {
    color: '#546cfc',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  NotFoundButtonText: {
    width: '50%',
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    marginRight: '2%',
  },
  NotFoundbuttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#546cfc',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginTop: '50%',
  },

  logoutButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 12,
    width: '40%',
    height: '7%',
  },
  LogoutText: {
    color: '#ed1c00',
    fontWeight: '500',
  },
});

export default ProfileScreen;
