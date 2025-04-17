// HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const categories = [
  {title: 'Sports', color: '#F8634C', icon: 'basketball-outline'},
  {title: 'Music', color: '#FFA655', icon: 'musical-notes-outline'},
  {title: 'Food', color: '#27C083', icon: 'restaurant-outline'},
];

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#5D50FE', '#6C63FF']} style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="menu" size={26} color="#fff" />
          <View>
            <Text style={styles.locationLabel}>Current Location</Text>
            <Text style={styles.locationValue}>New York, USA</Text>
          </View>
          <Icon name="notifications-outline" size={24} color="#fff" />
        </View>

        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#ccc" />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#ccc"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterBtn}>
            <Icon name="filter" size={20} color="#fff" />
            <Text style={{color: '#fff', marginLeft: 5}}>Filters</Text>
          </TouchableOpacity>
        </View>

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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {/* Event Card */}
        <View style={styles.card}>
          <Image
            source={require('./assets/event1.png')}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.eventTitle}>International Band Mu...</Text>
            <Text style={styles.eventLocation}>36 Guild Street London, UK</Text>
          </View>
        </View>
      </View>

      {/* Invite Section */}
      <View style={styles.inviteSection}>
        <Text style={styles.inviteTitle}>Invite your friends</Text>
        <Text style={styles.inviteSubtitle}>Get $20 for ticket</Text>
        <TouchableOpacity style={styles.inviteBtn}>
          <Text style={{color: '#fff'}}>INVITE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: {
    height: 150,
    width: '100%',
  },
  cardContent: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  eventLocation: {
    color: '#888',
    marginTop: 4,
  },
  inviteSection: {
    backgroundColor: '#C5F4FF',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  inviteTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  inviteSubtitle: {
    marginTop: 4,
    marginBottom: 10,
  },
  inviteBtn: {
    backgroundColor: '#00CFFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
