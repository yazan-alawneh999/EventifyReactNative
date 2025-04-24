// src/screens/SplashScreen.tsx

import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'RootSplashScreen'>;

const SplashScreen: React.FC<Props> = ({navigation}) => {
  const imageAnim = useRef(new Animated.Value(30)).current;
  const ventAnim = useRef(new Animated.Value(30)).current;
  const hubAnim = useRef(new Animated.Value(30)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const ventOpacity = useRef(new Animated.Value(0)).current;
  const hubOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('RootOnboardingScreen1');
    }, 2000);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(imageAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(ventOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(ventAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(hubOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(hubAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [
    navigation,
    imageAnim,
    ventAnim,
    hubAnim,
    imageOpacity,
    ventOpacity,
    hubOpacity,
  ]);

  return (
    <View style={styles.container}>
      <Animated.Image
          source={require('../../assets/Images/SmallLogo1.png')}
        style={[
          styles.image,
          {opacity: imageOpacity, transform: [{translateY: imageAnim}]},
        ]} // إضافة التحريك
      />
      <Animated.Text
        style={[
          styles.textVent,
          {opacity: ventOpacity, transform: [{translateY: ventAnim}]},
        ]}>
        vent
      </Animated.Text>
      <Animated.Text
        style={[
          styles.textHub,
          {opacity: hubOpacity, transform: [{translateY: hubAnim}]},
        ]}>
        Hub
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Airbnb Cereal App',
  },
  texte: {
    fontSize: 50,
    color: '#5669FF',
    fontWeight: 'bold',
  },
  textVent: {
    fontSize: 30,
    color: '#5669FF',
    fontWeight: 'bold',
    fontFamily: 'Airbnb Cereal App',
  },
  textHub: {
    fontSize: 30,
    color: '#00F8FF',
    fontWeight: 'bold',
    fontFamily: 'Adamina, serif',
  },
  image: {
    width: 50,
    height: 50,
  },
});
