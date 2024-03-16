import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

const useProductLike = (productId: number) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    checkIfLiked();
  }, [productId]);

  const checkIfLiked = async () => {
    try {
      const likedProducts = await AsyncStorage.getItem("wishlist");
      if (likedProducts !== null) {
        const parsedLikedProducts = JSON.parse(likedProducts);
        setIsLiked(parsedLikedProducts.includes(productId));
      }
    } catch (error) {
      console.error("Error reading from AsyncStorage:", error);
    }
  };

  const onLikeHandler = async () => {
    try {
      const likedProducts = await AsyncStorage.getItem("wishlist");
      let updatedLikedProducts = [];
      if (likedProducts !== null) {
        updatedLikedProducts = JSON.parse(likedProducts);
        if (updatedLikedProducts.includes(productId)) {
          updatedLikedProducts = updatedLikedProducts.filter(
            (id: number) => id !== productId,
          );
        } else {
          updatedLikedProducts.push(productId);
        }
      } else {
        updatedLikedProducts = [productId];
      }
      await AsyncStorage.setItem(
        "wishlist",
        JSON.stringify(updatedLikedProducts),
      );
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error writing to AsyncStorage:", error);
    }
  };

  return { isLiked, onLikeHandler };
};

export default useProductLike;
