import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    throw new Error('malformatted parameters');
  }
  
  const bmi = calculateBmi(Number(height), Number(weight));

  res.send({ height, weight, bmi});
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
