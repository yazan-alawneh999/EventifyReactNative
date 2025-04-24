import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavBar from '../../../components/BottomNavbarForUser';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getCredential, logout} from '../../../../utils/Storage';
import {api, BASE_URL} from '../../Api';
import {useFocusEffect} from '@react-navigation/native';

const categories = [
  {title: 'Sports', color: '#F8634C', icon: 'basketball-outline'},
  {title: 'Music', color: '#FFA655', icon: 'musical-notes-outline'},
  {title: 'Food', color: '#27C083', icon: 'restaurant-outline'},
];

const HomeScreen = ({navigation}) => {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [userID, setUserID] = useState(null);
  const [userData, setUserData] = useState<User | null>(null);

  {
    /*todo : use these types */
  }
  type User = {
    firstName: string | null;
    lastName: string | null;
    city: string | null;
    age: number;
    email: string | null;
    phoneNumber: string | null;
    roleID: number;
    roleName: string;
    profileID: string | null;
    createdAt: string;
    username: string;
    profileImage: string | null;
  };

  type Event = {
    eventID: number;
    organizerID: number;
    eventName: string;
    eventType: string;
    eventTime: string; // ISO datetime string
    eventDate: string; // ISO datetime string
    eventStatus: string;
    description: string;
    capacity: number;
    price: number;
    createdAt: string; // ISO datetime string
  };

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const credential = await getCredential();
        setUserID(credential.userid || null);
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
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userID]);

  // جلب البيانات من API
  const fetchEvents = async () => {
    try {
      const response = await api.get(`${BASE_URL}/api/Event/GetAllEvent`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchEvents(); // عند كل مرة يرجع المستخدم للشاشة
    }, []),
  );

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Signin');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f9f9f9'}}>
      <ScrollView contentContainerStyle={{paddingBottom: 80}}>
        {/* ✅ Header Section */}
        <LinearGradient colors={['#5D50FE', '#6C63FF']} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.locationLabel}>Welcome</Text>
              <Text style={styles.locationValue}>
                {userData?.firstName || 'Guest'} {userData?.lastName || ' '}
              </Text>
            </View>
            <TouchableOpacity onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Wrap the search input with TouchableOpacity */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              navigation.navigate('AllEventsScreen');
            }}>
            <Icon
              name="search-outline"
              size={20}
              color="#fff"
              style={{marginRight: 8}}
            />
            <Text style={styles.searchButtonText}>To Search Click Here</Text>
          </TouchableOpacity>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categories}>
            {categories.map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.category, {backgroundColor: cat.color}]}>
                <Icon name={cat.icon} size={18} color="#fff" />
                <Text style={styles.categoryText}>{cat.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </LinearGradient>

        {/* ✅ Upcoming Events Section */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AllEventsScreen')}>
              <Text style={styles.showAll}>Show All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}>
            {/*{[1, 2, 3, 4].map((event, index) => (
              <View key={index} style={styles.eventCardNew}>
                <Text style={styles.eventTitle}>{event.eventName}</Text>
                <Image
                  source={require('../../../assets/Images/event.jpg')}
                  style={styles.eventImageNew}
                />
                <Text style={styles.eventDescription}>{event.description}</Text>
                <TouchableOpacity
                  style={styles.detailsBtn}
                  onPress={() =>
                    navigation.navigate('EventDetailsScreen', {
                      eventID: event.eventID,
                    })
                  }>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    More Details
                  </Text>
                </TouchableOpacity>
              </View>
            ))}*/}
            {/*todo: use this map  */}
            {events?.map((event, index) => (
              <View key={index} style={styles.eventCardNew}>
                <Text style={styles.eventTitle}>{event.eventName}</Text>
                <Image
                  source={require('../../../assets/Images/event.jpg')}
                  style={styles.eventImageNew}
                />
                <Text style={styles.eventDescription}>{event.description}</Text>
                <TouchableOpacity
                  style={styles.detailsBtn}
                  onPress={() =>
                    navigation.navigate('EventDetailsScreen', {
                      eventID: event.eventID,
                    })
                  }>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    More Details
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/*todo: remove this code or fix it */}

        {/* ✅ Event About You Section */}
        {/*      <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Event About You</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EventDetailsScreen', {
                  eventID: event.eventID,
                })
              }>
              <Text style={styles.showAll}>Show All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}>
            {[1, 2, 3].map((event, index) => (
              <View key={index} style={styles.eventCardNew}>
                <Text style={styles.eventTitle}>
                  Exclusive Meetup {event.eventName}
                </Text>
                <Image
                  source={require('../../../assets/Images/event.jpg')}
                  style={styles.eventImageNew}
                />
                <Text style={styles.eventDescription}>{event.description}</Text>
                <TouchableOpacity
                  style={styles.detailsBtn}
                  onPress={() => navigation.navigate('EventDetailsScreen')}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    More Details
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>*/}
      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationLabel: {
    color: '#ddd',
    fontSize: 12,
  },
  locationValue: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchBar: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#6D66FF',
    borderRadius: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#fff',
  },
  filterBtn: {
    flexDirection: 'row',
    backgroundColor: '#7B75FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: 10,
  },
  categories: {
    marginTop: 20,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: '#fff',
    marginLeft: 5,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  showAll: {
    color: '#5D50FE',
    fontWeight: '600',
    fontSize: 14,
  },
  horizontalScroll: {
    paddingRight: 20,
    paddingLeft: 5,
    paddingBottom: 20,
  },
  eventCardNew: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 20,
    elevation: 4,
    padding: 15,
    paddingBottom: 20,
    minHeight: 360,
  },
  eventImageNew: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    marginVertical: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
  },
  detailsBtn: {
    backgroundColor: '#5D50FE',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
});
