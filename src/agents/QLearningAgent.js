class QLearningAgent {
  constructor(epsilon, stepSize, discount, gridWidth, gridHeight) {
    this.numActions = 4;
    this.numStates = gridWidth * gridHeight;
    this.epsilon = epsilon;
    this.stepSize = stepSize;
    this.discount = discount;
    this.q = []; // MAKE MATRIX
  }
}