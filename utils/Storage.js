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
    const creds = await getCredential();
    if (creds?.token) {
        try {
            const decoded = jwtDecode(creds.token);
            console.log('📦 Decoded JWT:', decoded);

            const roleKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
            return decoded[roleKey] || null;
        } catch (err) {
            console.log('❌ JWT Decode Error:', err.message);
            return null;
        }
    }
    return null;
};

export const isOrganizer = async () => {
    const role = await getRole();
    return role === "2";
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

