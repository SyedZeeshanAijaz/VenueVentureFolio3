// hooks/useFetch.js
import { useState, useEffect } from 'react';

const useFetch2 = (url, page = 0) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}?page=${page}`);
        const json = await response.json();
        setData(json.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [url, page]);

  return { data, loading, error };
};

export default useFetch2;
