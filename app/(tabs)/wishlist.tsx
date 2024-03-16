import Product from '@/components/Product';
import { IProduct } from '@/utils/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function Page() {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const jsonData = await AsyncStorage.getItem('wishlist')
      if (jsonData)
        setWishlist(JSON.parse(jsonData))
    })()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const fetchedProducts = await Promise.all(wishlist.map(async (productId) => {
          const response = await fetch(`https://dummyjson.com/products/${productId}`);
          return await response.json();
        }));
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchData();

  }, [wishlist]);


  return (
    <ScrollView>
      <View className='w-[90%] mx-auto my-5 flex flex-wrap flex-row justify-between'>
        {loading
          ?
          <ActivityIndicator className='ml-40 mt-[80%]' animating={true} size={'large'} color={MD2Colors.deepPurple700} />
          :
          products.length ? products.map((product: IProduct) => {
            return <Product key={product.id} product={product} />
          })
            :
            <View className='w-[100%] mt-[80%]'>
              <Text className='text-[30px] font-medium text-[#000] mx-auto'>Your Wishlist is empty</Text>
            </View>
        }
      </View>
    </ScrollView>
  );
}