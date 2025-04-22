import React, {useEffect, useState} from 'react';
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
import {WebView} from 'react-native-webview';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {getCredential} from '../../../../utils/Storage';
import {api, BASE_URL} from '../../Api';

const UpdateEventScreen = ({navigation, route}) => {
  const {eventId} = route.params;
  const [userID, setUserID] = useState(null);
  const [userData, setUserData] = useState(null);
  const [eventData, setEventData] = useState({});
  const [locationData, setLocationData] = useState({});
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchUserID = async () => {
      const credential = await getCredential();
      setUserID(credential?.userid || 3);
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

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(
          `${BASE_URL}/api/Event/getEventByID?${eventId}`,
        );
        setEventData(response.data);
        setLocationData({
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          areaName: response.data.locationName,
        });
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const response = await api.get(
          `${BASE_URL}/api/Location/getLocationByEventID/${eventId}`,
        );
        setLocationData({
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          areaName: response.data.locationName,
        });
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };
    fetchLocationDetails();
  }, [eventId]);

  const today = new Date().toLocaleDateString();

  const handleMapMessage = event => {
    const data = JSON.parse(event.nativeEvent.data);
    setLocationData({
      latitude: data.latitude,
      longitude: data.longitude,
      areaName: data.areaName || '',
    });
  };

  const handleUpdateEvent = async () => {
    try {
      const res = await api.put(`${BASE_URL}/api/Event/UpdateEvent`, {
        ...eventData,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        locationName: locationData.areaName,
        eventDate: selectedDate,
      });
      Alert.alert('Success', 'Event updated successfully.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update event.');
    }
  };

  const handleUpdateLocation = async () => {
    try {
      const res = await api.put(`${BASE_URL}/api/Location/UpdateLocation`, {
        eventID: eventId,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        locationName: locationData.areaName,
      });
      Alert.alert('Success', 'Location updated successfully.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update location.');
    }
  };

  const leafletHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
    <style>
      html, body, #map { height: 100%; margin: 0; padding: 0; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
    <script>
      var map = L.map('map').setView([31.963158, 35.930359], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      var marker;
      map.on('click', function(e) {
        if (marker) map.removeLayer(marker);
        marker = L.marker(e.latlng).addTo(map);
        fetch('https://nominatim.openstreetmap.org/reverse?lat=' + e.latlng.lat + '&lon=' + e.latlng.lng + '&format=json')
          .then(res => res.json())
          .then(data => {
            const areaName = data.address.city || data.address.town || data.address.village || data.display_name;
            window.ReactNativeWebView.postMessage(JSON.stringify({
              latitude: e.latlng.lat,
              longitude: e.latlng.lng,
              areaName: areaName
            }));
          });
      });
      L.Control.geocoder().addTo(map);
    </script>
  </body>
  </html>
`;

  const profileImageUri = userData?.profileImage
    ? {uri: userData.profileImage}
    : require('../../../assets/Images/person.jpg');

  const handleDateConfirm = date => {
    setSelectedDate(date);
    setDatePickerVisible(false);
  };

  const handleDateCancel = () => {
    setDatePickerVisible(false);
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.organizerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.pageTitle}>Update Event</Text>
          </View>
          <Image source={profileImageUri} style={styles.profileImage} />
        </View>
        <View style={{marginTop: 8}}>
          <Text style={styles.organizerName}>
            {userData ? `${userData.firstName} ${userData.lastName}` : ''}
          </Text>
          <Text style={styles.dateText}>{today}</Text>
        </View>
      </View>

      <ScrollView
        style={{backgroundColor: '#f2f4f7'}}
        contentContainerStyle={{padding: 16}}>
        <TextInput
          style={styles.input}
          placeholder="Event Name"
          value={eventData.eventName}
          onChangeText={text => setEventData({...eventData, eventName: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Event Type"
          value={eventData.eventType}
          onChangeText={text => setEventData({...eventData, eventType: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Event Description"
          value={eventData.description}
          onChangeText={text => setEventData({...eventData, description: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={eventData.price?.toString()}
          onChangeText={text =>
            setEventData({...eventData, price: parseFloat(text)})
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Capacity"
          value={eventData.capacity?.toString()}
          onChangeText={text =>
            setEventData({...eventData, capacity: parseInt(text)})
          }
        />

        {/* Date Picker */}
        <TouchableOpacity
          onPress={() => setDatePickerVisible(true)}
          style={styles.input}>
          <Text style={{fontSize: 16, color: '#000'}}>
            {selectedDate.toLocaleString()}
          </Text>
        </TouchableOpacity>

        <View style={{height: 250, marginVertical: 10}}>
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
          value={locationData.latitude?.toString()}
          onChangeText={text =>
            setLocationData({...locationData, latitude: parseFloat(text)})
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          value={locationData.longitude?.toString()}
          onChangeText={text =>
            setLocationData({...locationData, longitude: parseFloat(text)})
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Area Name"
          value={locationData.areaName}
          onChangeText={text =>
            setLocationData({...locationData, areaName: text})
          }
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleUpdateEvent}>
          <Text style={styles.submitText}>Update Event</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submitBtn, {backgroundColor: '#4caf50'}]}
          onPress={handleUpdateLocation}>
          <Text style={styles.submitText}>Update Location</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          date={selectedDate}
          onConfirm={handleDateConfirm}
          onCancel={handleDateCancel}
        />
      </ScrollView>
    </>
  );
};

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
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
  },
  submitBtn: {
    backgroundColor: '#5f6cff',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateEventScreen;
