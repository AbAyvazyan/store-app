import { router } from "expo-router";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Product from "../Product";

import useProducts from "@/hooks/useProducts";
import { IProduct } from "@/utils/types";

const HomePageCategories: FC<{ category: string }> = ({ category }) => {
  const { products, loading } = useProducts(category, 4);
  return (
    <View className="w-auto mt-7">
      <View className="w-auto flex-row flex nowra justify-between">
        <Text className="text-[16px] font-medium uppercase ">{category}</Text>
        <TouchableOpacity onPress={() => router.push(`/product/${category}`)}>
          <Text className="font-bold text-[#7867BE] text-sm underline ">
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex justify-between mt-2">
        <View className="flex justify-between flex-row">
          {loading ? (
            <>
              <View className="w-[160px] h-[160px] bg-[#D9D9D9] rounded-[10px] animate-pulse" />
              <View className="w-[160px] h-[160px] bg-[#D9D9D9] rounded-[10px] animate-pulse" />
            </>
          ) : (
            products.slice(0, 2).map((product: IProduct) => {
              return <Product key={product.id} product={product} />;
            })
          )}
        </View>
        <View className="flex justify-between flex-row mt-2">
          {loading ? (
            <>
              <View className="w-[160px] h-[160px] bg-[#D9D9D9] rounded-[10px] animate-pulse" />
              <View className="w-[160px] h-[160px] bg-[#D9D9D9] rounded-[10px] animate-pulse" />
            </>
          ) : (
            products.slice(2).map((product: IProduct) => {
              return <Product key={product.id} product={product} />;
            })
          )}
        </View>
      </View>
    </View>
  );
};

export default HomePageCategories;
