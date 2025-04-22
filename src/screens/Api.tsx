/////// example how to use ////////
/*
import { api } from '../api';

const fetchUser = async () => {
    try {
        const res = await api.get('/user/me');
        console.log(res.data);
    } catch (err) {
        console.error(err);
    }
};*/
import axios from 'axios';
import {getCredential, logout} from '../../utils/Storage';
import {Alert} from 'react-native';
import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootStackParamList.ts';

export const BASE_URL = 'https://282b-149-200-133-207.ngrok-free.app';

const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async config => {
    const token = (await getCredential()).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  async error => {
    if (
      error.response &&
      error.response.status === 401 &&
      (await getCredential())?.token
    ) {
      // Show message to user (e.g., toast or alert)
      Alert.alert('Your session has expired. Please log in again.');

      // Optional: clear storage and redirect to login
      await logout(); // you define this to clear storage/session
      if (navigationRef.isReady()) {
        navigationRef.navigate('Signin'); // 👈 Your login screen route name
      }
    }

    return Promise.reject(error);
  },
);

export default api;
