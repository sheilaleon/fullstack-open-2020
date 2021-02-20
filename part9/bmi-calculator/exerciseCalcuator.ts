interface ExerciseResults {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

// interface ExerciseProps {
//   weeklyTraining: number[],
//   dailyTarget: number
// }

// const parseArgs = (args: Array<string>): ExerciseProps => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 4) throw new Error('Too many arguments');

//   const weeklyTraining = Number(args[2])
//   const dailyTarget = Number(args[3])

//   return {
//     weeklyTraining,
//     dailyTarget,
//   }
// };

const calculateExercise = (weeklyTraining: number[], dailyTarget: number) : ExerciseResults => {

  const periodLength = weeklyTraining.length;
  const trainingDays = weeklyTraining.filter((trained) => trained > 0).length

  let success: boolean = false;
  
  let rating: number = 1;
  let ratingDescription: string = 'Better luck next time.';
  
  const average: number =  weeklyTraining.reduce((acc, cv) => acc + cv, 0) / weeklyTraining.length
  
  if (average >= dailyTarget) {
    rating = 3;
    success = true;
    ratingDescription = 'Success~!'
  } else if (average < dailyTarget && average > 0) {
    rating = 2;
    ratingDescription = 'Not too bad, could be better'
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
}

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2));