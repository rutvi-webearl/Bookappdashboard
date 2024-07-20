import { useState, useEffect } from 'react';

const Counter = () => {
  const [totalAuthors, setTotalAuthors] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          console.error('No auth token found in local storage');
          setLoading(false);
          return;
        }

        // Fetch total authors count
        const authorsResponse = await fetch('https://bookreading-app.onrender.com/api/author/allAuthor', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
          }
        });

        if (authorsResponse.ok) {
          const authorsData = await authorsResponse.json();
          setTotalAuthors(authorsData.length); // Assuming you get an array of authors
        } else {
          console.error('Failed to fetch authors:', authorsResponse.statusText);
        }

        // Fetch total books count
        const booksResponse = await fetch('https://bookreading-app.onrender.com/api/book/displayAllBook', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
          }
        });

        if (booksResponse.ok) {
          const booksData = await booksResponse.json();
          setTotalBooks(booksData.length); // Assuming you get an array of books
        } else {
          console.error('Failed to fetch books:', booksResponse.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return { totalAuthors, totalBooks, loading };
};

export default Counter;
