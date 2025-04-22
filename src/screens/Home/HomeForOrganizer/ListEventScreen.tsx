import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNavBarOrganizer from '../../../components/BottomNavbarForOrganizer';
import {useContext} from 'react';
import {UserContext} from '../../../components/UserContext';
import {logout} from "../../../../utils/Storage";

const events = [
  {
    eventID: 1,
    eventName: 'Tech Conference',
    eventType: 'Conference',
    eventTime: '2025-03-01T10:00:00',
    eventDate: '2025-05-01T00:00:00',
    eventStatus: 'Progressed',
    description: 'Technology trends in AI & Cloud.',
    capacity: 100,
    price: 50,
    location: {
      address: 'The Boulevard Arjaan by Rotana',
      latitude: 31.958,
      longitude: 35.9101,
    },
  },
  {
    eventID: 2,
    eventName: 'Music Festival',
    eventType: 'Music',
    eventTime: '2025-04-01T18:00:00',
    eventDate: '2025-06-10T00:00:00',
    eventStatus: 'Upcoming',
    description: 'A celebration of sound and rhythm.',
    capacity: 500,
    price: 80,
    location: {
      address: 'Amman Amphitheatre',
      latitude: 31.958,
      longitude: 35.9101,
    },
  },
];

const ListEventScreen = ({navigation}) => {
  const {userInfo} = useContext(UserContext); // 2️⃣ استخدم السياق لاستخراج بيانات المستخدم
  const [selectedType, setSelectedType] = useState('All');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const today = new Date().toLocaleDateString();


  const handleLogout =  async () => {

    await logout()
    navigation.navigate('Signin');
  };

  const handleCreateEvent = () => {
    navigation.navigate('CreateEvent');
  };

  const filteredEvents =
    selectedType === 'All'
      ? events
      : events.filter(event => event.eventType === selectedType);

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
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn}>
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
            source={{uri: userInfo.profileImage}} // 3️⃣ استخدم صورة المنظم من السياق
            style={styles.profileImage}
          />
          <View style={{flex: 1}}>
            <Text style={styles.organizerName}>
              Welcome, {userInfo.username}
            </Text>
            {/* 4️⃣ استخدم اسم المنظم من السياق */}
            <Text style={styles.dateText}>{today}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsModalVisible(true)}>
          <Text style={styles.filterButtonText}>Sort By: {selectedType}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredEvents}
        renderItem={renderEventCard}
        keyExtractor={item => item.eventID.toString()}
        contentContainerStyle={{paddingBottom: 120}}
      />

      <TouchableOpacity style={styles.fab} onPress={handleCreateEvent}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <BottomNavBarOrganizer />

      {/* Modal for Filter Selection */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Type</Text>
            {['All', 'Conference', 'Music'].map(type => (
              <TouchableOpacity
                key={type}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedType(type);
                  setIsModalVisible(false);
                }}>
                <Text style={styles.modalOptionText}>{type}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.closeModalBtn}>
              <Text style={styles.closeModalText}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  filterButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  filterButtonText: {
    color: '#5f6cff',
    fontWeight: '600',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalOptionText: {
    fontSize: 16,
  },
  closeModalBtn: {
    marginTop: 15,
    backgroundColor: '#5f6cff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeModalText: {
    color: 'white',
    fontWeight: '600',
  },
});
