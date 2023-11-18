import { jwtDecode } from 'jwt-decode';
import axios from './axios';

export const isTokenValid = (token: string) => {
    if (!token) return false;

    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken?.exp > currentTime;
};

export const setSession = (token: string) => {
    if (token) {
        localStorage.setItem('accessToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('token', token);
    } else {
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const getSession = () => {
    const token = localStorage.getItem('accessToken');

    if (token && isTokenValid(token)) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return token;
    } else {
        setSession('');
        return null;
    }
};
