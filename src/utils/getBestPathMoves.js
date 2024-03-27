import { argmax } from "../utils/argmax";

// CHECK Q-VALUES IN ALL 4 DIRECTIONS AND GET BEST
export const getBestPathMoves = (startPosition, terminalPosition, qValues) => {
  let bestMoves = [];
  let agentPosition = startPosition;

  // FOR NOW HARDCODING STEPS (ASSUMING THAT BEST PATH AFTER TRAINING IS LESS THAN 100)
  const steps = 100;
  let agentY = agentPosition.y;
  let agentX = agentPosition.x;

  for (let i = 0; i < steps; i++) {
    if (agentX === terminalPosition.x && agentY === terminalPosition.y) break;

    let bestAction = argmax(qValues[agentY][agentX]);
    let nextMove = { y: 0, x: 0 };

    if (bestAction == 0) {
      nextMove.y -= 1;
      agentY -= 1;
    } else if (bestAction == 1) {
      nextMove.x += 1;
      agentX += 1;
    } else if (bestAction == 2) {
      nextMove.y += 1;
      agentY += 1;
    } else if (bestAction == 3) {
      nextMove.x -= 1;
      agentX -= 1;
    }

    bestMoves.push(nextMove);
  }

  return bestMoves;
};
