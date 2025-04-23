import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNavBarOrganizer from '../../../components/BottomNavbarForOrganizer';
import {api, BASE_URL} from '../../Api';
import {getCredential, logout} from '../../../../utils/Storage';

const ListEventScreen = ({navigation}) => {
  const [events, setEvents] = useState([]);
  const [userID, setUserID] = useState(null);
  const [userData, setUserData] = useState(null);
  const today = new Date().toLocaleDateString();

  const fetchEvents = async () => {
    try {
      const response = await api.get(
        `${BASE_URL}/api/Location/getallPinLocationEachEvent`,
      );
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const credential = await getCredential();
        setUserID(credential?.userid || null);
      } catch (error) {
        console.error('Error getting credential:', error);
      }
    };
    fetchUserID();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userID) return;

      try {
        const response = await api.get(
          `${BASE_URL}/api/event-manager/profile-details/${userID}`,
        );

        // تحقق من البيانات، وإذا كانت فارغة أو غير موجودة، تعيين القيم الافتراضية
        if (!response.data) {
          setUserData({
            firstName: 'Ali',
            lastName: 'Ahmad',
            city: 'Amman',
            age: 25,
            email: 'ali1@example.com',
            phoneNumber: '0790000001',
            profileImage: '../../../../src/assets/Images/person.jpg',
          });
        } else {
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userID]);

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Signin');
  };

  const handleDeleteEvent = eventID => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this event?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await api.delete(
                `${BASE_URL}/api/Event/DeleteEvent?ID=${eventID}`,
              );
              await fetchEvents();

              Alert.alert('Deleted', 'Event has been deleted successfully.');
            } catch (error) {
              console.error('Error deleting event:', error);
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const handleCreateEvent = () => {
    navigation.navigate('CreateEvent');
  };

  const renderEventCard = ({item}) => (
    <View style={styles.card}>
      <Image
        source={require('../../../../src/assets/Images/event.jpg')}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.eventName}</Text>
        <Text style={styles.type}>{item.eventType}</Text>
        <Text style={styles.label}>
          📅 Date:{' '}
          <Text style={styles.value}>
            {new Date(item.eventDate).toDateString()}
          </Text>
        </Text>
        <Text style={styles.label}>
          ⏰ Time:{' '}
          <Text style={styles.value}>
            {new Date(item.eventTime).toLocaleTimeString()}
          </Text>
        </Text>
        <Text style={styles.label}>
          📍 Address: <Text style={styles.value}>{item.location?.address}</Text>
        </Text>
        <Text style={styles.label}>
          🌍 Latitude:{' '}
          <Text style={styles.value}>{item.location?.latitude}</Text>
        </Text>
        <Text style={styles.label}>
          🌍 Longitude:{' '}
          <Text style={styles.value}>{item.location?.longitude}</Text>
        </Text>
        <Text style={styles.label}>📝 {item.description}</Text>
        <Text style={styles.label}>
          👥 Capacity: <Text style={styles.value}>{item.capacity}</Text>
        </Text>
        <Text style={styles.label}>
          💵 Price for ticket: <Text style={styles.value}>${item.price}</Text>
        </Text>
        <Text style={[styles.label, {color: '#007BFF'}]}>
          📊 Status: {item.eventStatus}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() =>
              navigation.navigate('EditEvent', {eventId: item.eventID})
            }>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => handleDeleteEvent(item.eventID)}>
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.organizerRow}>
          <Image
            source={
              userData?.profileImage
                ? {uri: userData.profileImage}
                : require('../../../../src/assets/Images/person.jpg')
            }
            style={styles.profileImage}
          />
          <View style={{flex: 1}}>
            <Text style={styles.organizerName}>
              Welcome, {userData?.firstName || 'Ali'}{' '}
              {userData?.lastName || 'Ahmad'}
            </Text>
            <Text style={styles.dateText}>{today}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* عنوان الصفحة في المنتصف */}
        <Text style={styles.pageTitle}>List Event</Text>
      </View>

      <FlatList
        data={events}
        renderItem={renderEventCard}
        keyExtractor={item =>
          item.eventID ? item.eventID.toString() : String(Math.random())
        }
        contentContainerStyle={{paddingBottom: 120}}
      />

      <TouchableOpacity style={styles.fab} onPress={handleCreateEvent}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <BottomNavBarOrganizer />
    </View>
  );
};

export default ListEventScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
  },
  header: {
    backgroundColor: '#5f6cff',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
  },
  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
  },
  organizerName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dateText: {
    color: '#ddd',
    fontSize: 12,
  },
  // تنسيق العنوان في المنتصف
  pageTitle: {
    paddingTop: 60,
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  card: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  type: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    marginTop: 4,
    color: '#444',
  },
  value: {
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  editBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteBtn: {
    backgroundColor: '#F44336',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#5f6cff',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
