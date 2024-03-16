import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import logo from "../assets/images/logo.png";

import Button from "@/components/Button";
import Input from "@/components/Input";
import useLogin from "@/hooks/useLogin";

export default function Page() {
  const {
    setPassword,
    password,
    setUsername,
    username,
    loginActionHandler,
    error,
    loading,
  } = useLogin();
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text className="text-center mt-[90px] font-[Gotham] text-[24px] leading-[35px] text-[#1E1D1D]">
            LOG IN
          </Text>
          <Image source={logo} width={140} className="mx-auto mt-[40px]" />
        </View>
        <View className="mt-[70px]">
          <Input
            label="Username"
            changeHandler={setUsername}
            value={username}
          />
          <Input
            label="Password"
            changeHandler={setPassword}
            value={password}
          />
          {error ? (
            <Text className="mt-[15px] absolute left-6 bottom-[-30px] text-red-600 ">
              {error}
            </Text>
          ) : null}
          <ActivityIndicator
            className="absolute left-[45%] bottom-[-80px]"
            animating={loading}
            size="large"
            color={MD2Colors.deepPurple700}
          />
        </View>
        <View className="w-[90%] mx-auto mt-[160px]">
          <Button onClick={loginActionHandler} name="LOG IN" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
