import { argmax } from "../utils/argmax";
import { max } from "../utils/max";

// CHECK Q-VALUES IN ALL 4 DIRECTIONS AND GET BEST
export const getBestPathMoves = (startPosition, terminalPosition, qValues) => {
  let bestMoves = [];
  let agentPosition = startPosition;

  let transformedValues = [];
  for (let i = 0; i < qValues.length; i++) {
    let transformedRow = [];
    for (let j = 0; j < qValues[0].length; j++) {
      transformedRow.push(max(qValues[i][j]));
    }
    transformedValues.push(transformedRow);
  }

  const isTerminalPosition = (y, x) => {
    return x === terminalPosition.x && y === terminalPosition.y;
  }

  // FOR NOW HARDCODING STEPS (ASSUMING THAT BEST PATH AFTER TRAINING IS LESS THAN 100)
  const steps = 40;
  let agentY = agentPosition.y;
  let agentX = agentPosition.x;

  for (let i = 0; i < steps; i++) {
    if (agentX === terminalPosition.x && agentY === terminalPosition.y) break;

    let topValue =
      agentY !== 0 && transformedValues[agentY - 1][agentX] !== 0 || isTerminalPosition(agentY - 1, agentX)
        ? transformedValues[agentY - 1][agentX]
        : -200;
    let rightValue =
      agentX !== 4 && transformedValues[agentY][agentX + 1] !== 0 || isTerminalPosition(agentY, agentX + 1)
        ? transformedValues[agentY][agentX + 1]
        : -200;
    let bottomValue =
      agentY !== 7 && transformedValues[agentY + 1][agentX] !== 0 || isTerminalPosition(agentY + 1, agentX)
        ? transformedValues[agentY + 1][agentX]
        : -200;
    let leftValue =
      agentX !== 0 && transformedValues[agentY][agentX - 1] !== 0 || isTerminalPosition(agentY, agentX - 1)
        ? transformedValues[agentY][agentX - 1]
        : -200;

    let bestAction = argmax([topValue, rightValue, bottomValue, leftValue]);

    // IF TERMINAL POSITION AROUND, GO HERE
    if (isTerminalPosition(agentY - 1, agentX)) {
      bestAction = 0;
    } else if (isTerminalPosition(agentY, agentX + 1)) {
      bestAction = 1;
    } else if (isTerminalPosition(agentY + 1, agentX)) {
      bestAction = 2;
    } else if (isTerminalPosition(agentY, agentX - 1)) {
      bestAction = 3;
    }

    let nextMove = { y: 0, x: 0 };

    if (bestAction === 0) {
      nextMove.y -= 1;
      agentY -= 1;
    } else if (bestAction === 1) {
      nextMove.x += 1;
      agentX += 1;
    } else if (bestAction === 2) {
      nextMove.y += 1;
      agentY += 1;
    } else if (bestAction === 3) {
      nextMove.x -= 1;
      agentX -= 1;
    }

    bestMoves.push(nextMove);
  }

  return bestMoves;
};
