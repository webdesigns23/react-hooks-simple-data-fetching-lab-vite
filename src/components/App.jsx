// create your App component here
import { useState, useEffect } from 'react'
import DogDisplay from './DogDisplay';
import FetchButton from './FetchButton';

// Joke API
const API_URL = "https://dog.ceo/api/breeds/image/random";

function App() {
  const [dog, setDog] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDog();
  }, []);

  async function fetchDog() {
    try{
      const response = await fetch(API_URL);
      const data = await response.json();
      if(data.message) {
        setDog(data.message);
        setLoading(false);
      } else {
        setDog('No dog found.');
      }
    } catch (error) {
      setError('Failed to fetch dog');
      setDog('');
      setLoading(false);
    }
  };
   
   return (
    <div className="app">
      <h1>Dogs</h1>
      <DogDisplay dog={dog} loading={loading} error ={error} />
      <FetchButton fetchDog={fetchDog}/>
    </div>
  )
}

export default App