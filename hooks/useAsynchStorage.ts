import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key: string, changed: boolean=true, initialValue: number[] = []) => {
    const [storedValue, setStoredValue] = useState(initialValue);

    useEffect(() => {
        const getStoredValue = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(key);
                if (jsonValue !== null) {
                    setStoredValue(JSON.parse(jsonValue));
                }
            } catch (error) {
                console.error('Error reading from AsyncStorage:', error);
            }
        };
        getStoredValue();
    }, [key, changed]);

    const setValue = async (value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
            setStoredValue(value)
        } catch (error) {
            console.error('Error writing to AsyncStorage:', error);
        }
    };

    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error('Error removing from AsyncStorage:', error);
        }
    };

    const clearAllValues = async () => {
        try {
            await AsyncStorage.clear();
            setStoredValue(initialValue);
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };

    return { storedValue, setValue, removeValue, clearAllValues };
};

export default useAsyncStorage;
