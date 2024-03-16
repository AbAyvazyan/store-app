import HomePageCategories from '@/components/HomePageCategories';
import Slider from '@/components/carousel';
import useCategories from '@/hooks/useCategories';
import { Slide } from '@/utils/types';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Slides: Slide[] = [
  {
    id: 1,
    img: require('../../assets/images/banner1.webp'),
  },
  {
    id: 2,
    img: require('../../assets/images/banner2.webp'),
  },
  {
    id: 3,
    img: require('../../assets/images/banner3.webp'),
  },
];

export default function home() {
  const { categories, loading } = useCategories()
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-[90%] mt-[30px] mx-auto">
          <Slider sliders={Slides} />
        </View>
        <View className="w-[85%] mx-auto my-[30px]">
          {loading
            ?
            <ActivityIndicator className='mt-10' animating={true} size={'large'} color={MD2Colors.deepPurple700} />
            :
            categories.map((singleCategory: string) => {
              return <HomePageCategories key={singleCategory} category={singleCategory} />
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
