import { IProduct } from '@/utils/types';
import { useEffect, useState } from 'react';


const useProducts = (categoryName: string = '', limit: number = 4, skip: number = 0) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://dummyjson.com/products/category/${categoryName}?limit=${limit}&skip=${skip}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const productsData = await response.json();
                setProducts(productsData.products);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false)
            }
        };

        getProducts();

    }, [limit,skip]);

    return { products, loading };
};

export default useProducts;
