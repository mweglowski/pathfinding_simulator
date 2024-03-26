export class QLearningAgent {
  constructor(epsilon, stepSize, discount, gridWidth, gridHeight) {
    this.numActions = 4;
    this.epsilon = epsilon;
    this.stepSize = stepSize;
    this.discount = discount;
    // ACTION-VALUES ESTIMATES SHAPE (numStates, numActions)
    this.q = [];
    for (let stateRowIndex = 0; stateRowIndex < gridHeight; stateRowIndex++) {
      let row = []
      for (let stateColIndex = 0; stateColIndex < gridWidth; stateColIndex++) {
        let qValues = []
        for (let actionIndex = 0; actionIndex < this.numActions; actionIndex++) {
          qValues.push(0);
        }
        row.push(qValues);
      }
      
      this.q.push(row);
    }
  }

  max(values) {
    let maxValue = values[0];
    for (let i = 1; i < values.length; i++) {
      if (values[i] > maxValue) {
        maxValue = values[i];
      }
    }
    return maxValue;
  }

  argmax(values) {
    // RETURNS INDEX OF MAX VALUE
    // IF THERE ARE MULTIPLE SAME MAX VALUES, THEN IT CHOOSES ACTION INDEX RANDOMLY
    let maxValue = values[0];
    let maxValueIndexes = [];
    for (let i = 1; i < values.length; i++) {
      if (values[i] > maxValue) {
        maxValue = values[i];
        maxValueIndexes = [];
      }
      if (values[i] == maxValue) {
        maxValueIndexes.push(i);
      }
    }
    return maxValueIndexes[Math.round(Math.random() * (maxValueIndexes.length - 1))];
  }

  start(observation) {
    const {y, x} = observation;
    const currentQValues = this.q[y][x];

    let action;
    if (Math.random() < this.epsilon) {
      // INDEX OF RANDOM ACTION
      action = Math.round(Math.random() * (this.numActions - 1));
    } else {
      // INDEX OF ACTION WITH HIGHEST VALUE
      action = this.argmax(currentQValues);
    }

    this.previousState = observation;
    this.previousAction = action;
    
    return action;
  }

  step(reward, observation) {
    const {y, x} = observation;
    const currentQValues = this.q[y][x];

    let action;
    if (Math.random() < this.epsilon) {
      // INDEX OF RANDOM ACTION
      action = Math.round(Math.random() * (this.numActions - 1));
    } else {
      // INDEX OF ACTION WITH HIGHEST VALUE
      action = this.argmax(currentQValues);
    }

    const prevStateY = this.previousState.y;
    const prevStateX = this.previousState.x;
    const prevAction = this.previousAction;
    const prevActionValue = this.q[prevStateY][prevStateX][prevAction]

    // UPDATE
    const error = reward + this.discount * this.max(currentQValues) - prevActionValue
    this.q[prevStateY][prevStateX][prevAction] = prevActionValue + this.stepSize * error

    this.previousState = observation;
    this.previousAction = action;

    return action;
  }

  end(reward) {
    const prevStateY = this.previousState.y;
    const prevStateX = this.previousState.x;
    const prevAction = this.previousAction;
    const prevActionValue = this.q[prevStateY][prevStateX][prevAction]

    // LAST UPDATE IN THE EPISODE
    const error = reward - prevActionValue
    this.q[prevStateY][prevStateX][prevAction] = prevActionValue + this.stepSize * error
  }
}