import { useEffect, useState } from "react";

import { IProduct } from "@/utils/types";

const useSingleProduct = (productId: number) => {
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const productData = await response.json();
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    getProduct();
  }, []);

  return { product, loading };
};

export default useSingleProduct;
