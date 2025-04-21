
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
import {getCredential}   from "../../utils/Storage";

export const BASE_URL = "https://e268-37-123-83-25.ngrok-free.app";


export const api =  axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',

    },
});

api.interceptors.request.use(
    async (config) => {
        const token = (await getCredential()).token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



