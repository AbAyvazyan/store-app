import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Easing,
  Text,
} from 'react-native';
import React, { FC } from 'react';
import { Slide } from '@/utils/types';

const { width, height } = Dimensions.get('screen');

const SlideItem: FC<{ item: Slide }> = ({ item }) => {
  const translateYImage = new Animated.Value(40);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={typeof item.img==='number'?item.img:{ uri: item.img }}
        resizeMode="contain"
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage,
              },
            ],
          },
        ]}
      />

    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    alignItems: 'center',
    borderRadius: 10
  },
  image: {
    height: height * 0.25,
    width: '100%',
    objectFit: 'cover',
    borderRadius: 10
  },
});