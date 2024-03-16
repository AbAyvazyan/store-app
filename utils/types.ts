import { FontAwesome } from "@expo/vector-icons"

type Ttabs = {
    name: string,
    title: string,
    icon: React.ComponentProps<typeof FontAwesome>['name'],
    headerTitle: string
}

interface IInput {
    label: string,
    changeHandler: (text: string) => void,
    value: string
}

interface Slide {
    id: number;
    img: string;
}

interface IUser {
    "email": string,
    "firstName": string,
    "gender": string,
    "id": number,
    "image": string,
    "lastName": string,
    "token": string,
    "username": string
}

interface IProduct {
    "id": number,
    "title": string
    "description": string
    "price": number,
    "discountPercentage": number,
    "rating": number,
    "stock": number,
    "brand": string
    "category": string
    "thumbnail": string
    "images": string[]
}

export type { Ttabs, IInput, IProduct, Slide,IUser }