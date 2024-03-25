class QLearningAgent {
  constructor(epsilon, stepSize, discount) {
    this.numActions = 4;
    this.numStates = 5 * 8;
    this.epsilon = epsilon;
    this.stepSize = stepSize;
    this.discount = discount;
    this.q = []; // MAKE MATRIX
  }
}