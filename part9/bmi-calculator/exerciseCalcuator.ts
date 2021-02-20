interface ExerciseResults {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

interface ExerciseProps {
  dailyTarget: number
  weeklyTraining: number[],
}

const parseArgs = (args: Array<string>): ExerciseProps => {
  if (args.length < 4) throw new Error('Not enough arguments');


  function getTrainingHours(providedValues: string[]) {
    if (providedValues.some((value) => isNaN(Number(value)))) {
      throw new Error('Inputs are not a number, try again.');
    }

    return providedValues.map((value) => Number(value));
  }
    
  const dailyTarget = Number(args[2]);
  const providedValues = args.slice(3);
  const weeklyTraining = getTrainingHours(providedValues);

  return {
    dailyTarget,
    weeklyTraining,
  };
};

export const calculateExercise = (dailyTarget: number, weeklyTraining: number[], ) : ExerciseResults => {

  const periodLength = weeklyTraining.length;
  const trainingDays = weeklyTraining.filter((trained) => trained > 0).length;

  let success = false;
  
  let rating = 1;
  let ratingDescription = 'Better luck next time.';
  
  const average: number =
    weeklyTraining.reduce((acc, cv) => acc + cv, 0) / weeklyTraining.length;
  
  if (average >= dailyTarget) {
    rating = 3;
    success = true;
    ratingDescription = 'Success~!';
  } else if (average < dailyTarget && average > 0) {
    rating = 2;
    ratingDescription = 'Not too bad, could be better';
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: dailyTarget,
    average: average,
  };
};

try {
  const { dailyTarget, weeklyTraining } = parseArgs(process.argv);
  console.log(calculateExercise(dailyTarget, weeklyTraining));
} catch (error) {
  console.log(`Something went wrong ---`, error);
}