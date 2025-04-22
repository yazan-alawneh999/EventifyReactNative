import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from "jwt-decode";

export const storeCredential = async value => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('credential', jsonValue);
    } catch (e) {
        console.error('Error storing data', e);
    }
};


export const getCredential = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('credential');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Error reading data', e);
        return null;
    }
};

export const getRole = async () => {
    try {
        const token = (await getCredential()).token;
        const decoded = jwtDecode(token);
        return decoded.role || null;
    } catch (e) {
        console.error('Error decoding token:', e);
        return null;
    }
};

export const isOrganizer = async () => {
    try {
        const role = await getRole();
        return role === 2;
    } catch (e) {
        console.error('Error checking organizer role:', e);
        return false;
    }
};

export const logout = async () => {
    try {
        await AsyncStorage.removeItem('credential');
    } catch (e) {
        console.error('Error removing data', e);
    }





    // remove cradential
    // navigate to signin
};

