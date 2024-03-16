import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import CategoryCard from "@/components/CategoryCard";
import { categoriesConst } from "@/constants/catgories";
import useCategories from "@/hooks/useCategories";

export default function Categories() {
  const { categories, loading } = useCategories();
  return (
    <SafeAreaView>
      <ScrollView className="my-5">
        {loading ? (
          <ActivityIndicator
            className="mt-[80%]"
            animating
            size="large"
            color={MD2Colors.deepPurple700}
          />
        ) : (
          categories.map((singleCategory: string) => {
            return (
              <CategoryCard
                key={singleCategory}
                category={singleCategory}
                path={
                  categoriesConst[
                    singleCategory as keyof typeof categoriesConst
                  ]
                }
              />
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
