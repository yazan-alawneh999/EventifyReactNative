import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const BASE_URL = 'http://YOUR_BASE_URL_HERE';

const UpdateEventScreen = ({route}) => {
  const {eventId} = route.params;
  const [eventData, setEventData] = useState({
    eventID: 0,
    organizerID: 0,
    eventName: '',
    eventType: '',
    eventTime: '',
    eventDate: '',
    eventStatus: '',
    description: '',
    capacity: '',
    price: '',
    createdAt: '',
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/Event/getEventByID/${eventId}`,
      );
      setEventData(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load event data');
    }
  };

  const handleUpdateEvent = async () => {
    try {
      await axios.put(`${BASE_URL}/api/Event/UpdateEvent`, eventData);
      Alert.alert('Success', 'Event updated successfully.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update event.');
    }
  };

  const handleDateConfirm = date => {
    setEventData({...eventData, eventDate: date.toISOString()});
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = time => {
    setEventData({...eventData, eventTime: time.toISOString()});
    setTimePickerVisibility(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Event Name</Text>
      <TextInput
        style={styles.input}
        value={eventData.eventName}
        onChangeText={text => setEventData({...eventData, eventName: text})}
      />

      <Text style={styles.label}>Event Type</Text>
      <TextInput
        style={styles.input}
        value={eventData.eventType}
        onChangeText={text => setEventData({...eventData, eventType: text})}
      />

      <Text style={styles.label}>Event Date</Text>
      <Button title="Pick Date" onPress={() => setDatePickerVisibility(true)} />
      <Text>{eventData.eventDate?.slice(0, 10)}</Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <Text style={styles.label}>Event Time</Text>
      <Button title="Pick Time" onPress={() => setTimePickerVisibility(true)} />
      <Text>{eventData.eventTime?.slice(11, 16)}</Text>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisibility(false)}
      />

      <Text style={styles.label}>Event Status</Text>
      <Picker
        selectedValue={eventData.eventStatus}
        onValueChange={value =>
          setEventData({...eventData, eventStatus: value})
        }
        style={styles.input}>
        <Picker.Item label="Select Status" value="" />
        <Picker.Item label="Progressed" value="Progressed" />
        <Picker.Item label="Cancelled" value="Cancelled" />
        <Picker.Item label="Completed" value="Completed" />
      </Picker>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={3}
        value={eventData.description}
        onChangeText={text => setEventData({...eventData, description: text})}
      />

      <Text style={styles.label}>Capacity</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={eventData.capacity.toString()}
        onChangeText={text =>
          setEventData({...eventData, capacity: parseInt(text) || 0})
        }
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={eventData.price.toString()}
        onChangeText={text =>
          setEventData({...eventData, price: parseFloat(text) || 0})
        }
      />

      <Button title="Update Event" onPress={handleUpdateEvent} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 12,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default UpdateEventScreen;
