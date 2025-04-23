import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {api, BASE_URL} from '../../Api';

const EventDetailsScreen = ({route}) => {
  const navigation = useNavigation();
  const {eventID} = route.params;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(
          `${BASE_URL}/api/Event/getEventByID/${eventID}`,
        );
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load event.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventID]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  if (error || !event) {
    return (
      <View style={styles.center}>
        <Text style={{color: 'red'}}>{error || 'No event found'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* صورة الحدث الثابتة + عنوان */}
      <ImageBackground
        source={require('../../../assets/Images/event.jpg')}
        style={styles.headerImage}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Event Details</Text>
        </View>
      </ImageBackground>

      {/* تفاصيل الحدث */}
      <View style={styles.card}>
        <Text style={styles.eventTitle}>{event.eventName}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={24} color="#6366F1" />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>
              {new Date(event.eventDate).toDateString()}
            </Text>
            <Text style={styles.infoSubtitle}>
              {new Date(event.eventTime).toLocaleTimeString()}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/men/32.jpg',
            }}
            style={styles.organizerImage}
          />

          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followText}>Follow</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.aboutTitle}>About Event</Text>
        <Text style={styles.aboutText}>{event.description}</Text>

        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>BUY TICKET ${event.price}</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: 300,
    justifyContent: 'space-between',
  },
  backButton: {
    marginTop: 50,
    marginLeft: 20,
    backgroundColor: '#00000088',
    padding: 8,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  headerContent: {
    padding: 20,
    marginBottom: 20,
  },
  headerTitle: {
    paddingTop: 50,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -30,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  organizerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  followButton: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  followText: {
    color: '#6366F1',
    fontWeight: '500',
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  buyButton: {
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});
