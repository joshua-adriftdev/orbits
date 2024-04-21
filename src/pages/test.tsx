import React, { useEffect, useState } from 'react';

interface Orbit {
  date: string;
  theme: string;
  words: string[];
}

export default function Test() {
  const [data, setData] = useState<Orbit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/orbits/`);
        const fetchedData = await response.json();

        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data found for the specified date</div>;
  }

  return (
    <div>
      <div>Date: {data.date}</div>
      <div>Theme: {data.theme}</div>
      <div>Words: {data.words.join(', ')}</div>
    </div>
  );
}
