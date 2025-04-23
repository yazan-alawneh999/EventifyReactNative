// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const eventsData = [
//   {
//     id: '1',
//     title: 'Music Fiesta',
//     description: 'Join us for an unforgettable night of music.',
//     image: require('../../../assets/Images/event.jpg'),
//     category: 'Music',
//     date: '2025-04-20',
//     location: 'Amman',
//     type: 'Concert',
//     price: 0,
//   },
//   {
//     id: '2',
//     title: 'Food Carnival',
//     description: 'Taste dishes from around the world!',
//     image: require('../../../assets/Images/event.jpg'),
//     category: 'Food',
//     date: '2025-04-25',
//     location: 'Irbid',
//     type: 'Festival',
//     price: 25,
//   },
//   {
//     id: '3',
//     title: 'Tech Summit',
//     description: 'Explore the latest in tech and innovation.',
//     image: require('../../../assets/Images/event.jpg'),
//     category: 'Tech',
//     date: '2025-04-19',
//     location: 'Amman',
//     type: 'Conference',
//     price: 100,
//   },
// ];

// const isThisWeekend = (dateStr: string) => {
//   const eventDate = new Date(dateStr);
//   const today = new Date();
//   const day = today.getDay();
//   const saturday = new Date(today);
//   saturday.setDate(today.getDate() + (6 - day));
//   const sunday = new Date(saturday);
//   sunday.setDate(saturday.getDate() + 1);
//   return eventDate >= saturday && eventDate <= sunday;
// };

// const AllEventsScreen = ({navigation}: any) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeFilter, setActiveFilter] = useState('All');
//   const [selectedLocation, setSelectedLocation] = useState('All');
//   const [selectedType, setSelectedType] = useState('All');
//   const [selectedPrice, setSelectedPrice] = useState('All');
//   const [selectedDate, setSelectedDate] = useState('All');

//   const handleSearch = (text: string) => {
//     setSearchQuery(text);
//   };

//   const filteredEvents = eventsData.filter(event => {
//     const matchSearch = event.title
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchCategory =
//       activeFilter === 'All' || event.category === activeFilter;
//     const matchLocation =
//       selectedLocation === 'All' || event.location === selectedLocation;
//     const matchType = selectedType === 'All' || event.type === selectedType;
//     const matchPrice =
//       selectedPrice === 'All' ||
//       (selectedPrice === 'Free' && event.price === 0) ||
//       (selectedPrice === 'Under $50' && event.price > 0 && event.price <= 50) ||
//       (selectedPrice === 'Above $50' && event.price > 50);
//     const matchDate =
//       selectedDate === 'All' ||
//       (selectedDate === 'This Weekend' && isThisWeekend(event.date));

//     return (
//       matchSearch &&
//       matchCategory &&
//       matchLocation &&
//       matchType &&
//       matchPrice &&
//       matchDate
//     );
//   });

//   const renderFilterButtons = (
//     options: string[],
//     selected: string,
//     onSelect: (val: string) => void,
//   ) => (
//     <View style={styles.filterContainer}>
//       {options.map(option => (
//         <TouchableOpacity
//           key={option}
//           style={[
//             styles.filterButton,
//             selected === option && styles.activeFilterButton,
//           ]}
//           onPress={() => onSelect(option)}>
//           <Text
//             style={[
//               styles.filterText,
//               selected === option && styles.activeFilterText,
//             ]}>
//             {option}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );

//   const renderItem = ({item}: any) => (
//     <View style={styles.card}>
//       <Image source={item.image} style={styles.image} />
//       <View style={styles.content}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.description}>{item.description}</Text>
//         <Text style={styles.info}>
//           📍 {item.location} | 📅 {item.date} | 💵 ${item.price}
//         </Text>
//         <TouchableOpacity
//           style={styles.detailsBtn}
//           onPress={() => navigation.navigate('EventDetailsScreen')}>
//           <Text style={{color: '#fff'}}>More Details</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={{flex: 1, backgroundColor: '#f9f9f9', padding: 20}}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="balck" />
//         </TouchableOpacity>
//         <Text style={styles.header}>All Events</Text>
//       </View>
//       {/* Search */}
//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color="#ccc" />
//         <TextInput
//           placeholder="Search..."
//           value={searchQuery}
//           onChangeText={handleSearch}
//           placeholderTextColor="#ccc"
//           style={styles.searchInput}
//         />
//       </View>
//       {/* Category Filter */}
//       {renderFilterButtons(
//         ['All', 'Music', 'Food', 'Tech'],
//         activeFilter,
//         setActiveFilter,
//       )}

//       {/* Other Filters */}
//       {renderFilterButtons(
//         ['All', 'Amman', 'Irbid'],
//         selectedLocation,
//         setSelectedLocation,
//       )}
//       {renderFilterButtons(
//         ['All', 'Concert', 'Conference', 'Festival'],
//         selectedType,
//         setSelectedType,
//       )}
//       {renderFilterButtons(
//         ['All', 'Free', 'Under $50', 'Above $50'],
//         selectedPrice,
//         setSelectedPrice,
//       )}
//       {renderFilterButtons(
//         ['All', 'This Weekend'],
//         selectedDate,
//         setSelectedDate,
//       )}

//       {/* Event List */}
//       <FlatList
//         data={filteredEvents}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{paddingBottom: 100}}
//       />
//     </View>
//   );
// };

// export default AllEventsScreen;

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 10,
//     gap: 10,
//   },
//   backButton: {
//     color: '#5D50FE',
//     padding: 8,
//     borderRadius: 20,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//   },

//   searchContainer: {
//     margin: 20,
//     flexDirection: 'row',
//     backgroundColor: '#6D66FF',
//     borderRadius: 30,
//     paddingHorizontal: 15,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 10,
//     color: '#fff',
//     fontSize: 16,
//     paddingVertical: 10,
//   },
//   searchIcon: {
//     marginLeft: 8,
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 12,
//     gap: 8,
//   },
//   filterButton: {
//     paddingVertical: 6,
//     paddingHorizontal: 14,
//     backgroundColor: '#eee',
//     borderRadius: 20,
//   },
//   activeFilterButton: {
//     backgroundColor: '#5D50FE',
//   },
//   filterText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   activeFilterText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     marginBottom: 20,
//     overflow: 'hidden',
//     elevation: 2,
//   },
//   image: {
//     width: '100%',
//     height: 160,
//   },
//   content: {
//     padding: 15,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   description: {
//     marginVertical: 6,
//     color: '#777',
//   },
//   info: {
//     color: '#555',
//     fontSize: 13,
//     marginBottom: 8,
//   },
//   detailsBtn: {
//     backgroundColor: '#5D50FE',
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
// });
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

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const filteredEvents = events.filter((event: any) =>
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({item}: any) => (
    <View style={styles.card}>
      <Image
        source={{uri: '../../../assets/Images/event.jpg'}}
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

      {/* Search */}
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

      {loading ? (
        <ActivityIndicator size="large" color="#5D50FE" />
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item: any) => item.eventID.toString()}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 100}}
        />
      )}
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
