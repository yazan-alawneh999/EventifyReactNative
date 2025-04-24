import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {api, BASE_URL} from '../../Api';

const AllEventsScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getAllEvents = async () => {
    try {
      const response = await api.get(`${BASE_URL}/api/Event/GetAllEvent`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getAllEvents();
    setRefreshing(false);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const filteredEvents = events.filter((event: any) =>
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({item}: any) => (
    <View style={styles.card}>
      <Image
        source={require('../../../assets/Images/event.jpg')} // استخدم URI صالح أو من الـ API
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.eventName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.info}>
          📅 {new Date(item.eventDate).toLocaleDateString()} | 🕒{' '}
          {new Date(item.eventTime).toLocaleTimeString()} | 💵 ${item.price}
        </Text>
        <TouchableOpacity
          style={styles.detailsBtn}
          onPress={() =>
            navigation.navigate('EventDetailsScreen', {eventId: item.eventID})
          }>
          <Text style={{color: '#fff'}}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#5D50FE" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#f9f9f9', padding: 20}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>All Events</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#ccc" />
        <TextInput
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#ccc"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.eventID.toString()}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 100}}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default AllEventsScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    gap: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    margin: 20,
    flexDirection: 'row',
    backgroundColor: '#6D66FF',
    borderRadius: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 6,
    color: '#777',
  },
  info: {
    color: '#555',
    fontSize: 13,
    marginBottom: 8,
  },
  detailsBtn: {
    backgroundColor: '#5D50FE',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
