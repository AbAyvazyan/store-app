import { FC } from "react"
import { Text, TouchableOpacity } from "react-native"

const Button:FC<{onClick?:() => any,name:string}> = ({onClick,name}) => {
    return (
        <TouchableOpacity 
        onPress={onClick}
        className="w-auto flex justify-center items-center bg-[#7867BE] h-[50px] rounded-[10px]">
            <Text className="text-[18px] text-white uppercase">{name}</Text>
        </TouchableOpacity>
    )
}

export default Button