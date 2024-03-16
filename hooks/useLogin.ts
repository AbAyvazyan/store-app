
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const useLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const loginActionHandler = async () => {
        try {
            setError('')
            setLoading(true);
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (data.message === 'Invalid credentials') {
                throw data.message
            }
            await AsyncStorage.setItem('user', JSON.stringify(data))
            setLoading(false);
            router.push('/(tabs)')
        } catch (error: any) {
            setError(error);
            setLoading(false);
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        loading,
        error,
        loginActionHandler,
    };
};

export default useLogin;