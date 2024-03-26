export const max = (values) => {
  let maxValue = values[0];
  for (let i = 1; i < values.length; i++) {
    if (values[i] > maxValue) {
      maxValue = values[i];
    }
  }
  return maxValue;
};
