import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';
import BottomNavBar from '../../../components/BottomNavbarForUser';
import {api, BASE_URL} from '../../Api';

const MapScreen = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<any[]>([]);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      }
    } else {
      getLocation();
    }
  }, []);

  useEffect(() => {
    requestLocationPermission();
    fetchEvents();
  }, [requestLocationPermission]);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      error => {
        console.error('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

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

  const filteredEvents = events.filter(event =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const mapHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <style>
      html, body, #map { height: 100%; margin: 0; padding: 0; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var map = L.map('map', { zoomControl: true }).setView([0, 0], 2);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      function updateMap(lat, lng) {
        L.marker([lat, lng]).addTo(map)
          .bindPopup("You are here").openPopup();
      }

      function addEvents(eventsJson) {
        const events = JSON.parse(eventsJson);
        const bounds = [];

        events.forEach(event => {
          const marker = L.marker([event.location.latitude, event.location.longitude]).addTo(map);
          marker.bindPopup(\`
            <b>\${event.eventName}</b><br/>
            \${event.description}<br/>
            <i>\${event.eventDate}</i>
          \`);

          // Send data back to React Native when clicking on a marker
          marker.on('click', function() {
            window.ReactNativeWebView.postMessage(JSON.stringify(event));
          });

          bounds.push([event.location.latitude, event.location.longitude]);
        });

        if (bounds.length > 0) {
          map.fitBounds(bounds, {padding: [50, 50]});
        }
      }

      // Disable click-to-drop-pin
      map.on('click', function(e) {
        // Do nothing intentionally
      });

      window.addEventListener('message', function(event) {
        const eventData = JSON.parse(event.data);
        const targetEvent = events.find(e => e.eventID === eventData.eventID);
        if (targetEvent) {
          map.setView([targetEvent.location.latitude, targetEvent.location.longitude], 15);
        }
      });
    </script>
  </body>
  </html>
`;

  const injectedJS = `
    ${location ? `updateMap(${location.latitude}, ${location.longitude});` : ''}
    addEvents('${JSON.stringify(filteredEvents)}');
    true;
  `;

  const handleMessage = (event: any) => {
    const eventDetails = JSON.parse(event.nativeEvent.data);
    Alert.alert(
      eventDetails.eventName,
      `Organizer: ${eventDetails.organizerName}\nDescription: ${eventDetails.description}\nDate: ${eventDetails.eventDate}\nPrice: ${eventDetails.price}`,
    );
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for an event..."
          style={styles.searchInput}
          placeholderTextColor="#666"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
      </View>
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{html: mapHtml}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          injectedJavaScript={injectedJS}
          onMessage={handleMessage}
        />
      </View>
      <BottomNavBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 50,
    backgroundColor: '#f2f2f2',
    zIndex: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default MapScreen;
