import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RootOnboardingScreen3'
>;
const {width, height} = Dimensions.get('window');

const OnboardingScreen3 = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      {/* محتوى التطبيق */}

      <Image
        source={require('../../assets/Images/Onborading/three.png')}
        style={styles.cardImage}
      />

      {/* طبقة المقدمة (Onboarding Overlay) */}
      <View style={styles.overlay}>
        <Text style={styles.overlayTitle}>
          To Look Up More Events or Activities Nearby By Map
        </Text>
        <Text style={styles.overlayText}>
          In publishing and graphic design, Lorem is a placeholder text commonly
        </Text>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginMainRole')}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
          <View style={styles.dotsContainer}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dotActive} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginMainRole')}>
            <Text style={styles.next}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default OnboardingScreen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  card: {
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    overflow: 'hidden',
    height: height * 0.5,
    justifyContent: 'center',
  },
  cardImage: {
    marginTop: 100,
    alignSelf: 'center',
    width: width - 100,
    height: height * 0.6,
  },

  overlay: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.35,
    width: width,
    padding: 30,
    backgroundColor: '#536DFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  overlayTitle: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  overlayText: {
    fontFamily: 'Adamina-Regular',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 5,
  },
  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  buttonsRow: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skip: {
    color: 'white',
    fontSize: 22,
  },
  next: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
