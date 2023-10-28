
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import './App.css';
import DogCard from './components/DogCard';
import BreedFrequencyChart from './components/BreedFrequencyChart';
import WeightFrequencyChart from './components/WeightFrequencyChart';
import DogDetail from './components/DogDetail';
import { Link } from 'react-router-dom';

const App = () => {
  const dogAPI = 'https://api.thedogapi.com/v1/images/search';
  const apiKey = 'live_g3s9htKNucTNbUxjq0Umn9VmKQ0x7Wo7BfKgDL0POvLv2HhBgTpLunUaWQoqEVrE';

  const [dogs, setDogs] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('All'); 
  const [selectedHeight, setSelectedHeight] = useState('All');
  const [selectedWeight, setSelectedWeight] = useState('All');


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${dogAPI}?has_breeds=1&limit=20&api_key=${apiKey}`);
        const data = await response.json();
        setDogs(data);
        setFilteredDogs(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const totalDogs = dogs.length;
  const totalFilteredDogs = filteredDogs.length;

  // Create a list of available dog breeds
  const availableBreeds = [...new Set(dogs.map((dog) => dog.breeds[0].name))];
  const availableHeights = [...new Set(dogs.map((dog) => dog.breeds[0].height.imperial))];
  const availableWeights = [...new Set(dogs.map((dog) => dog.breeds[0].weight.imperial))];

  const handleSearch = () => {
    const filteredResults = dogs.filter((dog) => {
      return (
        (dog.breeds[0].name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '') &&
        (selectedBreed === 'All' || dog.breeds[0].name === selectedBreed) &&
        (selectedHeight === 'All' || dog.breeds[0].height.imperial.toLowerCase().includes(selectedHeight.toLowerCase())) &&
      (selectedWeight === 'All' || dog.breeds[0].weight.imperial.toLowerCase().includes(selectedWeight.toLowerCase()))
      );
    });
    setFilteredDogs(filteredResults);
  };

  const handleBreedChange = (e) => {
    setSelectedBreed(e.target.value);
  };

  const getMostCommonBreed = () => {
    // Create an object to count the occurrences of each breed
    if(dogs.length>0){
      const breedCount = dogs.reduce((count, dog) => {
      const breed = dog.breeds[0].name;
      count[breed] = (count[breed] || 0) + 1;
      return count;
    }, {});

    // Find the breed with the highest count
    const mostCommonBreed = Object.keys(breedCount).reduce((a, b) => (breedCount[a] > breedCount[b] ? a : b));

    return mostCommonBreed;
    }
    
  };

  const mostCommonBreed = getMostCommonBreed();

  const dogsToAdd = 5; // Define the number of dogs to add with each click

  const fetchAdditionalDogs = async () => {
    try {
      const response = await fetch(
        `${dogAPI}?has_breeds=1&limit=${dogsToAdd}&api_key=${apiKey}`
      );
      const data = await response.json();
      const newDogs = [...dogs, ...data]; // Combine new data with the existing dogs
      setDogs(newDogs);
      // Apply the same filter to the updated list
      const filteredResults = newDogs.filter((dog) => {
        return (
          (dog.breeds[0].name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '') &&
          (selectedBreed === 'All' || dog.breeds[0].name === selectedBreed) &&
          (selectedHeight === 'All' || dog.breeds[0].height.imperial.toLowerCase().includes(selectedHeight.toLowerCase())) &&
          (selectedWeight === 'All' || dog.breeds[0].weight.imperial.toLowerCase().includes(selectedWeight.toLowerCase()))
        );
      });
      setFilteredDogs(filteredResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddMoreDogs = () => {
    fetchAdditionalDogs();
  };


  const BreedChartData = () => {
    const breedCount = {};
  
    // Assuming you have a 'dogs' array with breed information
    dogs.forEach((dog) => {
      const breedName = dog.breeds[0].name;
      breedCount[breedName] = (breedCount[breedName] || 0) + 1;
    });
  
    // Sort the breeds by frequency in descending order
    const sortedBreeds = Object.keys(breedCount).sort(
      (a, b) => breedCount[b] - breedCount[a]
    );
  
    // Select the top three breeds
    const top3Breeds = sortedBreeds.slice(0, 3);
  
    return top3Breeds.map((breed) => ({
      breed,
      frequency: breedCount[breed],
    }));
  };

  const WeightChartData = () => {
    const weightCount = {};
  
    dogs.forEach((dog) => {
      const weight = dog.breeds[0].weight.imperial;
      weightCount[weight] = (weightCount[weight] || 0) + 1;
    });
  
    const sortedWeights = Object.keys(weightCount).sort(
      (a, b) => weightCount[b] - weightCount[a]
    );
  
    const top3Weights = sortedWeights.slice(0, 3);
  
    return top3Weights.map((weight) => ({
      weight,
      frequency: weightCount[weight],
    }));
  };
  
  

  return (
    <BrowserRouter>
    <div className="main_container">
      <div className="header">
        <Link to="/">
        <h1>Paw-some Dogs!</h1>
        <h4>Discover the coolest dogs in the world!</h4>
        </Link>
      </div>

      <div>
        <h2>Total Dogs: {totalDogs}</h2>
        <h2>Total Filtered Dogs: {totalFilteredDogs}</h2>
        <h2>Most Common Breed: {mostCommonBreed}</h2> {/* Display the most common breed */}
      </div>

      <div className="main_content">
        <div className="filters">
          <input
            type="text"
            placeholder="Search by breed"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select value={selectedBreed} onChange={handleBreedChange}>
            <option value="All">All Breeds</option>
            {availableBreeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>

          <select value={selectedHeight} onChange={(e) => setSelectedHeight(e.target.value)}>
            <option value="All">All Heights</option>
            {availableHeights.map((height) => (
              <option key={height} value={height}>
                {height}
              </option>
            ))}
          </select>

          <select value={selectedWeight} onChange={(e) => setSelectedWeight(e.target.value)}>
            <option value="All">All Weights</option>
            {availableWeights.map((weight) => (
              <option key={weight} value={weight}>
                {weight}
              </option>
            ))}
          </select>

          <button onClick={handleSearch}>Search</button>
          

        </div>
        <button onClick={handleAddMoreDogs}>Add {dogsToAdd} More Dogs</button>

        <div className='graphs'>
          <div>
            <h3>3 Most Common Dog Breeds</h3>
            <BreedFrequencyChart data={BreedChartData()} />
          </div>
          <div>
            <h3>3 Most Common Dog Weights (lbs)</h3>
             <WeightFrequencyChart data = {WeightChartData()} />
          </div>
             
        </div>

        {/* <div className="dog-card-container">
          <ul>
            {filteredDogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </ul>
        </div> */}

      </div>
    </div>
    <Routes>
          <Route path="/" element={<DogCard dogs={filteredDogs} />} />
          <Route path="/detail/:id" element={<DogDetail dogs={dogs} />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
