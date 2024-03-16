import Product from '@/components/Product';
import useDebouncedSearch from '@/hooks/useDebouncedSearch';
import useProducts from '@/hooks/useProducts';
import { IProduct } from '@/utils/types';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function Page() {
    const navigation = useNavigation();
    const { loading, handleSearchInputChange, searchQuery, searchResults } = useDebouncedSearch()
    return (
        <SafeAreaView>
            <Stack.Screen options={{
                headerTitle: '',
                headerShown: true,
                headerLeft: () => {
                    return <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesome name="angle-left" size={30} />
                    </TouchableOpacity>
                },
                headerSearchBarOptions: {
                    placement: 'inline',
                    placeholder: 'Seacrh',
                    cancelButtonText: '',
                    onChangeText: (e) => handleSearchInputChange(e.nativeEvent.text)
                }
            }}>
            </Stack.Screen>

            <ScrollView>
                <View className='w-[90%] mx-auto my-5 flex flex-wrap flex-row justify-between'>
                    {loading
                        ?
                        <ActivityIndicator className='ml-40 mt-[80%]' animating={true} size={'large'} color={MD2Colors.deepPurple700} />
                        :
                        searchResults.length ? searchResults.map((product: IProduct) => {
                            return <Product key={product.id} product={product} />
                        }) 
                        :
                        <View className='w-[100%] mt-[80%]'>
                            <Text className='text-[30px] font-medium text-[#000] mx-auto'>No Data</Text>
                        </View> 
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

