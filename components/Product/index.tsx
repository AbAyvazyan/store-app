import { IProduct } from "@/utils/types"
import { FontAwesome } from "@expo/vector-icons"
import { FC, useEffect, useState } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import { Image } from 'expo-image';
import { router } from "expo-router";
import useAsyncStorage from "@/hooks/useAsynchStorage";

const Product: FC<{ product: IProduct }> = ({ product }) => {
    const [liked, setLiked] = useState(false)
    const { setValue, storedValue } = useAsyncStorage('wishlist',liked)

    const onLikeHandler = () => {
        setLiked(prevState => !prevState);
    
        let updatedWishlist = [];
        const index = storedValue.indexOf(product.id);
        if (index !== -1) {
            updatedWishlist = storedValue.filter(id => id !== product.id);
        } else {
            updatedWishlist = [...storedValue, product.id];
        }

        console.log(updatedWishlist,'updatedWishlist')
        setValue(updatedWishlist);
    };

    useEffect(() => {
        if(!storedValue.length){
            return
        }
        setLiked(storedValue.includes(product.id))
    }, [storedValue.length])

    return (
        <TouchableOpacity onPress={() => router.push(`/${product.id}`)}>
            <View className="w-[160px] mt-5">
                <View className="w-[160px] h-[160px] bg-[#D9D9D9] rounded-[10px] relative">
                    <TouchableOpacity className="absolute right-2 top-3 z-10" onPress={onLikeHandler} >
                        <View>
                            {liked ?
                                <FontAwesome size={23} name="heart" color={"red"} />
                                :
                                <FontAwesome size={23} name="heart-o" color={"#343434"} />
                            }
                        </View>
                    </TouchableOpacity>
                    <Image source={{ uri: product.thumbnail }} className="w-[160px] h-[160px] rounded-[10px]" />
                </View>
                <Text className="font-normal text-[12px] text-[#1E1D1D] mt-1 uppercase">{product.title}</Text>
                <View className="flex flex-row justify-between items-center mt-2">
                    <View className="flex flex-row gap-1 items-center">
                        <FontAwesome size={23} name="star" color="#FFC700" />
                        <Text>{product.rating}</Text>
                    </View>
                    <View>
                        <Text>{product.price}$</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Product