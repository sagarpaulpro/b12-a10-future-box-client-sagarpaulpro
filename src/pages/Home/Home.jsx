import React, { useState, useEffect } from 'react';
import Card from '../../components/cards/Card';

const Home = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/food')
      .then(res => res.json())
      .then(data => setFoods(data));
  }, []);

  return (
    <div>
      {foods.map(food => (
        <Card key={food._id} food={food} />
      ))}
    </div>
  );
};

export default Home;
