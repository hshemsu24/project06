import React from 'react';
import { Link } from 'react-router-dom';

// const DogCard = ({ dog }) => {
//     const dogId = dog.id;
//   return (
//     <div className="dog-card">
//       <img src={dog.url} alt={dog.breeds[0].name} />
//       <h3>
//         <Link to={`/detail/${dogId}`}>
//             {dog.breeds[0].name}
//         </Link>
//       </h3>
//       <p>Height: {dog.breeds[0].height.imperial}</p>
//       <p>Weight: {dog.breeds[0].weight.imperial}</p>
//     </div>
//   );
// };

const DogCard = ({ dogs }) => {
  return (
    <div className="dog-card-container">
        <ul>
            {dogs.map((dog) => (
                <div className="dog-card" key={dog.id}>
                    <img src={dog.url} alt={dog.breeds[0].name} />
                    <h3>
                        <Link to={`/detail/${dog.id}`}>
                            {dog.breeds[0].name}
                        </Link>
                    </h3>
                    <p>Height (in): {dog.breeds[0].height.imperial}</p>
                    <p>Weight (lbs): {dog.breeds[0].weight.imperial}</p>
                </div>
            ))}
        </ul>
    </div>
  );
};
       

export default DogCard;