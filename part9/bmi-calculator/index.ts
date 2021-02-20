import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalcuator';

app.use(express.json());

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


app.get('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { target, daily_exercises } = req.body as { target: number, daily_exercises: number[] };

  if (!target || !daily_exercises) {
    throw new Error('parameters missing');
  }

  if (isNaN(target) || (daily_exercises.some((value)=> isNaN(Number(value))))) {
    throw new Error('malformatted parameters');
  }

  const result = calculateExercise(target, daily_exercises);
  res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
