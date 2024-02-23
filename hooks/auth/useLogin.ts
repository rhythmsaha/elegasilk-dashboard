import API_URLS from '@/lib/ApiUrls';
import { useAuthStore } from '@/store/useAuthStore';
import axios from '@/utils/axios';
import { setSession } from '@/utils/jwt';
import React from 'react';
import toast from 'react-hot-toast';

interface ILoginPayload {
    username: string;
    password: string;
}

type ILoginAPIFunction = (payload: ILoginPayload) => void;

const useLogin = () => {
    const login = useAuthStore((state) => state.login);

    const ApiLogin: ILoginAPIFunction = async (payload) => {
        try {
            const response = await axios.post(API_URLS.login, payload);

            if (response.status !== 200) throw new Error('Failed to login!');

            const { accessToken, user } = await response.data;

            toast.success('Logged in successfully!');
            login(user, accessToken);
            setSession(accessToken);
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong!');
        }
    };

    return { ApiLogin };
};

export default useLogin;
