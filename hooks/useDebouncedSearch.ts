import { useState, useEffect } from 'react';

const useDebouncedSearch = (delay:number = 500) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearchInputChange = (text: string) => {
        setSearchQuery(text);
      };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim() !== '') {
                setLoading(true);
                fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setSearchResults(data.products);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                        setLoading(false);
                    });
            } else {
                setSearchResults([]);
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [searchQuery, delay]);

    return { searchQuery, handleSearchInputChange, searchResults, loading };
};

export default useDebouncedSearch;
