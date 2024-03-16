import { Image } from "expo-image"
import { Link, router } from "expo-router"
import { FC } from "react"
import { View, Text, TouchableOpacity } from "react-native"

const CategoryCard: FC<{ category: string, path: string }> = ({ category, path }) => {
    return (
        <View className='w-[90%] h-[130px] relative my-3 mx-auto rounded-[10px]'>
            <Text className='absolute z-10 bottom-5 left-5 text-white text-[17px] uppercase font-medium'>
                {category.split('-').join(' ')}
            </Text>
            <TouchableOpacity onPress={() => router.push(`/product/${category}`)}>
                <Image className='w-auto h-[100%] rounded-[10px]' source={path} />
            </TouchableOpacity>
        </View>
    )
}

export default CategoryCard