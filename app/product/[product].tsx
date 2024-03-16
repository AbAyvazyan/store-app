import { FontAwesome } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import Product from "@/components/Product";
import useProducts from "@/hooks/useProducts";
import { IProduct } from "@/utils/types";

export default function Page() {
  const { product } = useLocalSearchParams();
  const navigation = useNavigation();
  const { products, loading } = useProducts(String(product), 10);

  const title = String(product).toLocaleUpperCase().split("-").join(" ");
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: title,
          headerShown: true,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome name="angle-left" size={30} />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity>
                <Text>
                  <FontAwesome name="search" size={20} color="#343434" />
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />

      <ScrollView>
        <View className="w-[90%] mx-auto my-5 flex flex-wrap flex-row justify-between">
          {loading ? (
            <ActivityIndicator
              className="ml-40 mt-[80%]"
              animating
              size="large"
              color={MD2Colors.deepPurple700}
            />
          ) : (
            products.map((product: IProduct) => {
              return <Product key={product.id} product={product} />;
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
