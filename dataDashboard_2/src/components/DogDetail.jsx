import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const DogDetail = ({ dogs }) => {
  const { id } = useParams(); // Get the dog's ID from the URL parameter

  // Find the dog with the matching ID
  const dog = dogs.find((dog) => dog.id === id);

  if (!dog) {
    return (
      <div></div>
    );
  }

  return (
    <div className='dog-card'>
      <h2>Closer Look at the {dog.breeds[0].name}</h2>
      <div className="dog-detail">
        <img src={dog.url} alt={dog.breeds[0].name} />
        <p>Breed: {dog.breeds[0].name}</p>
        <p>Height: {dog.breeds[0].height.imperial}</p>
        <p>Weight: {dog.breeds[0].weight.imperial}</p>
        <p>Temperament: {dog.breeds[0].temperament}</p>
        <p>Life Span: {dog.breeds[0].life_span}</p>
        <p>Bred For: {dog.breeds[0].bred_for}</p>
        {/* Add more details about the dog here */}
      </div>
      <Link to = "/">Back to List</Link>
    </div>
  );
};

export default DogDetail;
