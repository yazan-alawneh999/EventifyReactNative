import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {WebView} from 'react-native-webview';
import BottomNavBarOrganizer from '../../../components/BottomNavbarForOrganizer';
import {UserContext} from '../../../components/UserContext';

const CreatNowEventScreen = ({navigation}) => {
  const {userInfo} = useContext(UserContext);

  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventPrice, setEventPrice] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventCapacity, setEventCapacity] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationName, setLocationName] = useState('');

  const [isStartDateVisible, setIsStartDateVisible] = useState(false);
  const [isStartTimeVisible, setIsStartTimeVisible] = useState(false);
  const [isEndDateVisible, setIsEndDateVisible] = useState(false);

  const today = new Date().toLocaleDateString();

  const handleStartDateConfirm = date => {
    setEventDate(date.toISOString().split('T')[0]);
    setIsStartDateVisible(false);
    setIsStartTimeVisible(true);
  };

  const handleStartTimeConfirm = time => {
    const timeStr = time.toTimeString().split(' ')[0].substring(0, 5); // hh:mm
    setEventTime(timeStr);
    setIsStartTimeVisible(false);
  };

  const handleEndDateConfirm = date => {
    setEventEndDate(date.toISOString().split('T')[0]);
    setIsEndDateVisible(false);
  };

  const handleMapMessage = event => {
    const data = JSON.parse(event.nativeEvent.data);
    setSelectedLocation({latitude: data.latitude, longitude: data.longitude});
    setLocationName(data.areaName || '');
  };

  const handleCreateEvent = async () => {
    if (
      !eventName ||
      !eventType ||
      !eventDate ||
      !eventTime ||
      !eventEndDate ||
      !eventPrice ||
      !eventDescription ||
      !eventCapacity ||
      !selectedLocation
    ) {
      Alert.alert('Error', 'Please fill in all fields and select a location');
      return;
    }

    const eventData = {
      eventID: 0,
      organizerID: userInfo.userid,
      eventName,
      eventType,
      eventTime: eventTime,
      eventDate: eventDate,
      eventStatus: 'Progressed',
      description: eventDescription,
      capacity: eventCapacity,
      price: eventPrice,
      createdAt: new Date().toISOString(),
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      locationName: locationName,
    };

    try {
      const response = await fetch(
        'http://192.168.1.100:7065/api/Event/CreateEvent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        },
      );
      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Event Created Successfully');
        navigation.navigate('EventDetails');
      } else {
        Alert.alert('Error', 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const leafletHtml = `...`; // Keep the leafletHtml unchanged as in your original code

  const profileImageUri =
    userInfo.profileImage && userInfo.profileImage !== ''
      ? {uri: userInfo.profileImage}
      : require('../../../assets/Images/person.jpg');

  return (
    <>
      <View style={styles.header}>
        <View style={styles.organizerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>

          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.pageTitle}>Create New Event</Text>
          </View>

          <Image source={profileImageUri} style={styles.profileImage} />
        </View>

        <View style={{marginTop: 8}}>
          <Text style={styles.organizerName}>{userInfo.username}</Text>
          <Text style={styles.dateText}>{today}</Text>
        </View>
      </View>

      <ScrollView
        style={{backgroundColor: '#f2f4f7'}}
        contentContainerStyle={{padding: 16}}>
        <TextInput
          style={styles.input}
          placeholder="Event Name"
          value={eventName}
          onChangeText={setEventName}
        />
        <TextInput
          style={styles.input}
          placeholder="Event Type"
          value={eventType}
          onChangeText={setEventType}
        />

        <View style={styles.dateInputContainer}>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setIsStartDateVisible(true)}>
            <Text>
              {eventDate
                ? eventDate + ' ' + eventTime
                : 'Select Start Date & Time'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setIsStartDateVisible(true)}>
            <Text style={styles.buttonText}>Add Date</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dateInputContainer}>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setIsEndDateVisible(true)}>
            <Text>{eventEndDate || 'Select End Date'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setIsEndDateVisible(true)}>
            <Text style={styles.buttonText}>Add Date</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Event Price"
          value={eventPrice}
          keyboardType="numeric"
          onChangeText={setEventPrice}
        />
        <TextInput
          style={styles.input}
          placeholder="Event Description"
          value={eventDescription}
          onChangeText={setEventDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Event Capacity"
          value={eventCapacity}
          keyboardType="numeric"
          onChangeText={setEventCapacity}
        />

        <View style={{width: '100%', height: 250, marginVertical: 10}}>
          <WebView
            source={{html: leafletHtml}}
            onMessage={handleMapMessage}
            javaScriptEnabled={true}
            originWhitelist={['*']}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Latitude"
          value={selectedLocation?.latitude?.toString() || ''}
          onChangeText={text =>
            setSelectedLocation(prev => ({
              ...prev,
              latitude: parseFloat(text) || '',
            }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          value={selectedLocation?.longitude?.toString() || ''}
          onChangeText={text =>
            setSelectedLocation(prev => ({
              ...prev,
              longitude: parseFloat(text) || '',
            }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Area Name"
          value={locationName}
          onChangeText={setLocationName}
        />
        <TouchableOpacity style={styles.submitBtn} onPress={handleCreateEvent}>
          <Text style={styles.submitText}>Create Event</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavBarOrganizer />

      <DateTimePickerModal
        isVisible={isStartDateVisible}
        mode="date"
        onConfirm={handleStartDateConfirm}
        onCancel={() => setIsStartDateVisible(false)}
      />
      <DateTimePickerModal
        isVisible={isStartTimeVisible}
        mode="time"
        onConfirm={handleStartTimeConfirm}
        onCancel={() => setIsStartTimeVisible(false)}
      />
      <DateTimePickerModal
        isVisible={isEndDateVisible}
        mode="date"
        onConfirm={handleEndDateConfirm}
        onCancel={() => setIsEndDateVisible(false)}
      />
    </>
  );
};

export default CreatNowEventScreen;

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
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
  pageTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f4f7',
    padding: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
  },
  dateInputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  dateInput: {
    width: '75%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
  },
  dateButton: {
    width: '20%',
    backgroundColor: '#5f6cff',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  submitBtn: {
    backgroundColor: '#5f6cff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 40,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
