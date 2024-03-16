import { FC } from "react";
import { Text, TextInput, View } from "react-native";

import { IInput } from "@/utils/types";

const Input: FC<IInput> = ({ label, value, changeHandler }) => {
  return (
    <View className="flex items-center mt-[30px]">
      <Text className="w-[90%] mb-[17px] text-[18px] font-normal">{label}</Text>
      <TextInput
        className="w-[90%] h-[65px] border-2 border-[#E6E6E6] rounded-[10px] pl-[10px] text-[20px]"
        placeholder={`${label}...`}
        value={value}
        onChangeText={(text: string) => changeHandler(text)}
      />
    </View>
  );
};

export default Input;
