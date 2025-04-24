import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    ScrollView,
    StyleSheet, TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { BASE_URL,api } from '../../Api';
import Icon from "react-native-vector-icons/Ionicons";

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

  useEffect(async () => {
    await fetchEventDetails();
  });

  const fetchEventDetails = async () => {
    try {
      const response = await api.get(
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
      await api.put(`${BASE_URL}/api/Event/UpdateEvent`, eventData);
      Alert.alert('Success', 'Event updated successfully.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update event.');
    }
  };

    const handleDateConfirm = date => {
        const formattedDate = date.toISOString().split('T')[0];
        setEventData({...eventData, eventDate: formattedDate});
        setDatePickerVisibility(false);
    };

    const handleTimeConfirm = time => {
        const formattedTime = time.toISOString().split('T')[1].slice(0, 5);
        setEventData({...eventData, eventTime: formattedTime});
        setTimePickerVisibility(false);
    };
    return (
        <View style={{flex: 1}}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Event</Text>
                <View style={{width: 24}} /> {/* Placeholder for centering title */}
            </View>

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
                <TouchableOpacity
                    style={styles.dateTimeButton}
                    onPress={() => setDatePickerVisibility(true)}>
                    <Text style={styles.dateTimeText}>
                        {eventData.eventDate ? eventData.eventDate : 'Select Date'}
                    </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={() => setDatePickerVisibility(false)}
                />

                <Text style={styles.label}>Event Time</Text>
                <TouchableOpacity
                    style={styles.dateTimeButton}
                    onPress={() => setTimePickerVisibility(true)}>
                    <Text style={styles.dateTimeText}>
                        {eventData.eventTime ? eventData.eventTime : 'Select Time'}
                    </Text>
                </TouchableOpacity>
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
        </View>
    );
};
  // return (
  //   <ScrollView contentContainerStyle={styles.container}>
  //     <Text style={styles.label}>Event Name</Text>
  //     <TextInput
  //       style={styles.input}
  //       value={eventData.eventName}
  //       onChangeText={text => setEventData({...eventData, eventName: text})}
  //     />
  //
  //     <Text style={styles.label}>Event Type</Text>
  //     <TextInput
  //       style={styles.input}
  //       value={eventData.eventType}
  //       onChangeText={text => setEventData({...eventData, eventType: text})}
  //     />
  //
  //     <Text style={styles.label}>Event Date</Text>
  //     <Button title="Pick Date" onPress={() => setDatePickerVisibility(true)} />
  //     <Text>{eventData.eventDate?.slice(0, 10)}</Text>
  //     <DateTimePickerModal
  //       isVisible={isDatePickerVisible}
  //       mode="date"
  //       onConfirm={handleDateConfirm}
  //       onCancel={() => setDatePickerVisibility(false)}
  //     />
  //
  //     <Text style={styles.label}>Event Time</Text>
  //     <Button title="Pick Time" onPress={() => setTimePickerVisibility(true)} />
  //     <Text>{eventData.eventTime?.slice(11, 16)}</Text>
  //     <DateTimePickerModal
  //       isVisible={isTimePickerVisible}
  //       mode="time"
  //       onConfirm={handleTimeConfirm}
  //       onCancel={() => setTimePickerVisibility(false)}
  //     />
  //
  //     <Text style={styles.label}>Event Status</Text>
  //     <Picker
  //       selectedValue={eventData.eventStatus}
  //       onValueChange={value =>
  //         setEventData({...eventData, eventStatus: value})
  //       }
  //       style={styles.input}>
  //       <Picker.Item label="Select Status" value="" />
  //       <Picker.Item label="Progressed" value="Progressed" />
  //       <Picker.Item label="Cancelled" value="Cancelled" />
  //       <Picker.Item label="Completed" value="Completed" />
  //     </Picker>
  //
  //     <Text style={styles.label}>Description</Text>
  //     <TextInput
  //       style={styles.input}
  //       multiline
  //       numberOfLines={3}
  //       value={eventData.description}
  //       onChangeText={text => setEventData({...eventData, description: text})}
  //     />
  //
  //     <Text style={styles.label}>Capacity</Text>
  //     <TextInput
  //       style={styles.input}
  //       keyboardType="numeric"
  //       value={eventData.capacity.toString()}
  //       onChangeText={text =>
  //         setEventData({...eventData, capacity: parseInt(text) || 0})
  //       }
  //     />
  //
  //     <Text style={styles.label}>Price</Text>
  //     <TextInput
  //       style={styles.input}
  //       keyboardType="numeric"
  //       placeholderTextColor={'black'}
  //       placeholder={eventData.price.toString()}
  //       onChangeText={text =>
  //         setEventData({...eventData, price: parseFloat(text) || 0})
  //       }
  //     />
  //
  //     <Button title="Update Event" onPress={handleUpdateEvent} />
  //   </ScrollView>
  // );


const styles = StyleSheet.create({
    dateTimeButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
    },

    dateTimeText: {
        fontSize: 16,
        color: '#333',
    },

    header: {
        height: 120, // تم زيادة ارتفاع الهيدر
        flexDirection: 'row',
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center', // تم تعديل المحاذاة للوسط
        paddingHorizontal: 16,
    },

    backButton: {
        marginTop: 20,
        position: 'absolute',
        left: 16,
        top: 24, // لضبط مكان الزر داخل الهيدر
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // دائرة شفافة حول السهم
        borderRadius: 50, // دائري
    },

    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
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
    borderColor: 'black',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default UpdateEventScreen;
