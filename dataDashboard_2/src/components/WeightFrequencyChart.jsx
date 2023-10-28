import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const WeightFrequencyChart = ({ data }) => {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="weight" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="frequency" fill="#82ca9d" />
    </BarChart>
  );
};

export default WeightFrequencyChart;
