import React, { FC, useRef } from "react";
import { Animated, FlatList, View } from "react-native";

import SlideItem from "./SlideItem";

import { Slide } from "@/utils/types";

const Slider: FC<{ sliders: Slide[] }> = ({ sliders }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View className="h[800px]">
      <FlatList
        data={sliders}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};

export default Slider;
