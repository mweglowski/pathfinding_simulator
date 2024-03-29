export const argmax = (values) => {
  // RETURNS INDEX OF MAX VALUE
  // IF THERE ARE MULTIPLE SAME MAX VALUES, THEN IT CHOOSES ACTION INDEX RANDOMLY
  let maxValue = values[0];
  let maxValueIndexes = [0];
  for (let i = 1; i < values.length; i++) {
    if (values[i] > maxValue) {
      maxValue = values[i];
      maxValueIndexes = [];
    }
    if (values[i] === maxValue) {
      maxValueIndexes.push(i);
    }
  }
  return maxValueIndexes[
    Math.round(Math.random() * (maxValueIndexes.length - 1))
  ];
};
