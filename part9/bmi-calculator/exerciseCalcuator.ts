interface ExerciseResults {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

export const calculateExercise = (target: number, daily_exercises: number[], ): ExerciseResults => {

  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((trained) => trained > 0).length;

  let success = false;
  
  let rating = 1;
  let ratingDescription = 'Better luck next time.';
  
  const average: number =
    daily_exercises.reduce((acc, cv) => acc + cv, 0) / daily_exercises.length;
  
  if (average >= target) {
    rating = 3;
    success = true;
    ratingDescription = 'Success~!';
  } else if (average < target && average > 0) {
    rating = 2;
    ratingDescription = 'Not too bad, could be better';
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};