import { IUser } from '@/utils/types';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from 'react-native';

export default function Page() {

  const [userData, setUserData] = useState<IUser | null>(null)

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('user')

      if (!user) {
        return
      }
      setUserData(JSON.parse(user))
    })()
  }, [])

  if (!userData) {
    return null
  }
  const onLogoutHandler = async () => {
    await AsyncStorage.clear()
    router.push('/login')
  }
  return (
    <SafeAreaView className='h-full w-full'>
      <Stack.Screen options={{
        headerShown: true,
        headerLeft: () => <></>,
        headerRight: () => <></>,
      }}>
      </Stack.Screen>


      <View className='flex flex-row gap-6 mt-3 mx-3 border-b-2 border-b-[#E6E6E6] pb-4'>
        <View>
          <Image source={{ uri: userData?.image }} className='w-[60px] h-[60px] rounded-full' />
        </View>
        <View>
          <Text className='text=[19px] text-[#1E1D1D] font-normal mt-2'>{userData.firstName} {userData.lastName}</Text>
          <Text className='text=[15px] text-[#ADADAD] font-light capitalize mt-2'>{userData.gender}</Text>
        </View>
      </View>

      <View className='w-full border-b-2 px-[25px] border-b-[#E6E6E6] border-t-2 border-t-[#E6E6E6] py-4 absolute bottom-0'>
        <TouchableOpacity onPress={onLogoutHandler} className='flex flex-row justify-between'>
          <View className='flex flex-row gap-5 items-center'>
            <FontAwesome name='sign-out' size={35} color='#D1D1D1' />
            <Text className='text-[14px] text-[#1E1D1D] font-light'>Log Out</Text>
          </View>
          <FontAwesome name='angle-right' size={35} color='#D1D1D1' />
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
}
