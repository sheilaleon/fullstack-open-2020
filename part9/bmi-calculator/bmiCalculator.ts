type CalculateBmiResults = string;

export const calculateBmi = (height: number, weight: number): CalculateBmiResults => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi > 40) {
    return 'Very severely obese';
  } else if (bmi <= 40 && bmi > 35) {
    return 'Severely obese';
  } else if (bmi <= 35 && bmi > 30) {
    return 'Moderately obese';
  } else if (bmi <= 30 && bmi > 25) {
    return 'Overweight';
  } else if (bmi <= 25 && bmi > 18.5) {
    return 'Healthy weight';
  } else if (bmi <= 18.5 && bmi > 16) {
    return 'Underweight';
  } else if (bmi <= 16 && bmi > 15) {
    return 'Severely underweight';
  } else if (bmi <= 15) {
    return 'Very severely underweight';
  }
  return 'Something went wrong, try again. Use CM for height and KG for weight.';
};