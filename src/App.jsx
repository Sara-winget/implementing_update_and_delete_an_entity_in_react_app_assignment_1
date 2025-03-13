import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";
import axios from 'axios'
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/1`; // Fetch door with ID 1

function App() {
  const [item, setItem] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the existing item when the component mounts
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(API_URI);
       
    console.log(response)
        setItem(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, []);

  if (loading) return <p>Loading item...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <UpdateItem item={item} />;
}

export default App;
