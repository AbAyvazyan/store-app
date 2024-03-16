import Button from '@/components/Button';
import Slider from '@/components/carousel';
import useProductLike from '@/hooks/useProductLike';
import useSingleProduct from '@/hooks/useSingleProduct';
import { Slide } from '@/utils/types';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Modal, Platform, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function singleProduct() {
  const { single } = useLocalSearchParams();
  const { isLiked, onLikeHandler } = useProductLike(Number(single))
  const { product, loading } = useSingleProduct(Number(single));

  const navigation = useNavigation();


  return (
    <SafeAreaView>
      <Stack.Screen options={{
        headerTitle: '',
        headerShown: true,
        headerLeft: () => {
          return (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome name="angle-left" size={30} />
            </TouchableOpacity>
          )
        },
        headerRight: () => {
          return (
            <TouchableOpacity onPress={onLikeHandler}>
              <Text>
                {isLiked ?
                  <FontAwesome size={23} name="heart" color={"red"} />
                  :
                  <FontAwesome size={23} name="heart-o" color={"#343434"} />
                }
              </Text>
            </TouchableOpacity>
          )
        },
      }}>
      </Stack.Screen>

      {loading ?
        <ActivityIndicator className='mt-[80%]' animating={true} size={'large'} color={MD2Colors.deepPurple700} />
        :
        product ?
          <>
            <View className='w-[90%] mx-auto mt-10'>

              <Slider sliders={product.images.map((imageUrl, index) => ({
                id: index + 1,
                img: imageUrl
              }))}
              />

              <View>
                <Text className='text-[#1E1D1D] text-[17px] font-medium uppercase mt-6'>{product.title}</Text>
                <View className='flex gap-5 flex-row items-center mt-[5px]'>
                  <Text style={{ color: '#F34040', fontSize: 15, fontWeight: '300', textDecorationLine: 'line-through' }}>{product.price}$</Text>
                  <Text className='text-[#1E1D1D] text-[19px] font-medium'>
                    {Math.floor(product.price - (product.price * product.discountPercentage) / 100)}$
                  </Text>
                </View>

                <View className='flex gap-5 flex-row items-center pt-2'>
                  <Text className='text-[#1E1D1D] text-[15px] font-normal'>Rating</Text>
                  <View className="flex flex-row gap-1 items-center">
                    <FontAwesome size={17} name="star" color="#FFC700" />
                    <Text>{product.rating}</Text>
                  </View>
                </View>

                <View className='flex gap-5 flex-row items-center pt-2'>
                  <Text className='text-[#1E1D1D] text-[15px] font-normal'>ID:</Text>
                  <Text className='text-[#777777] text-[15px] font-normal'>
                    {product.id}
                  </Text>
                </View>

                <View className='flex gap-5 flex-row items-center pt-2'>
                  <Text className='text-[#1E1D1D] text-[15px] font-normal'>Brand:</Text>
                  <Text className='text-[#777777] text-[15px] font-normal'>
                    {product.brand}
                  </Text>
                </View>

                <View className='flex gap-5 flex-row items-center pt-2'>
                  <Text className='text-[#1E1D1D] text-[15px] font-normal'>Category:</Text>
                  <Text className='text-[#777777] text-[15px] font-normal'>
                    {product.category}
                  </Text>
                </View>
              </View>
            </View>

            <View className='w-full min-h-[150px] p-[20px] border-t-[1px] border-b-[1px] border-[#E6E6E6] my-[25px]'>
              <Text className='text-[#8F8F8F] text-[14px] font-light'>{product.description}</Text>
            </View>

            <View className='flex flex-row justify-between w-[90%] mx-auto'>
              <View>
                <Text className='text-[#777777] text-[15px] font-normal mb-2'>Total</Text>
                <Text className='text-[#1E1D1D] text-[19px] font-medium'>{Math.floor(product.price - (product.price * product.discountPercentage) / 100)}$</Text>
              </View>
              <View className='w-[50%]'>
                <Button name='Add to cart' />
              </View>
            </View>
          </>
          : null}

    </SafeAreaView>
  );
}
