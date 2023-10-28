import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const BreedFrequencyChart = ({ data }) => {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="breed" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="frequency" fill="#8884d8" />
    </BarChart>
  );
};

export default BreedFrequencyChart;
