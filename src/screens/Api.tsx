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

export const BASE_URL = 'https://e1f8-109-107-227-240.ngrok-free.app';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const resetApiHeaders = () => {
  delete api.defaults.headers.common['Authorization'];
};
api.interceptors.request.use(
  async config => {
    console.log('[Request Interceptor]', config.url);
    try {
      const creds = await getCredential();
      if (creds && creds.token) {
        config.headers.Authorization = `Bearer ${creds.token}`;
        console.log('[Interceptor] Token added:', creds.token);
      } else {
        console.log('[Interceptor] No token found');
      }
    } catch (e) {
      console.error('[Interceptor] Error getting credentials', e);
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
    const creds = await getCredential();
    if (error.response?.status === 401 && creds?.token) {
      Alert.alert('Your session has expired. Please log in again.');
      await logout();

      if (navigationRef.isReady()) {
        navigationRef.navigate('Signin');
      }
    }

    return Promise.reject(error);
  },
);

