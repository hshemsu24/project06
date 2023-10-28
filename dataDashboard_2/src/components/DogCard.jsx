import React from 'react';

const DogCard = ({ dog }) => {
  return (
    <div className="dog-card">
      <img src={dog.url} alt={dog.breeds[0].name} />
      <h3>{dog.breeds[0].name}</h3>
      <p>Height: {dog.breeds[0].height.imperial}</p>
      <p>Weight: {dog.breeds[0].weight.imperial}</p>
    </div>
  );
};

export default DogCard;