import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import SimulationButton from "./ui/SimulationButton";
import { QLearningAgent } from "../agent/QLearningAgent";
import { PathfindingEnvironment } from "../agent/PathfindingEnvironment";
import { getBestPathMoves } from "../utils/getBestPathMoves";
import { useSimulationStore } from "../store/SimulationContext";

const Simulation = () => {
  // SIMULATION DATA
  const {
    dynamitePositions,
    startPosition,
    terminalPosition,
    toggleValuesDisplay,
    valuesDisplayed,
    updateQValues,
    qValues,
  } = useSimulationStore();

  // ANIMATED AGENT POSITION
  const [animatedAgentPosition, setAnimatedAgentPosition] =
    useState(startPosition);

  // ENVIRONMENT GIVES REWARDS, AGENT TAKES ACTIONS AND UPDATES ITS Q-VALUES
  const performTraining = () => {
    const episodes = 1000;
    const steps = 100;
    const gridHeight = 8;
    const gridWidth = 5;
    console.log("TRAINING...");

    const agent = new QLearningAgent(0.1, 0.1, 1.0, gridHeight, gridWidth);
    // const env = new PathfindingEnvironment(
    //   8,
    //   5,
    //   { y: 0, x: 0 },
    //   { y: 5, x: 5 },
    //   [
    //     { y: 3, x: 5 },
    //     { y: 5, x: 1 },
    //     { y: 3, x: 0 },
    //     { y: 0, x: 2 },
    //   ]
    // );
    const env = new PathfindingEnvironment(
      gridHeight,
      gridWidth,
      startPosition,
      terminalPosition,
      dynamitePositions
    );

    for (let episode = 0; episode < episodes; episode++) {
      // OBSERVATION FROM ENVIRONMENT (STATE)
      let observation = env.start();
      // AGENT TAKES FIRST ACTION
      let action = agent.start(observation);
      // TOTAL REWARD IN THIS EPISODE
      let totalReward = 0;

      for (let step = 0; step < steps; step++) {
        // REWARDS AND AGENT LOCATION AFTER TAKING STEP IN ENVIRONMENT
        const { reward, terminal, agentLocation } = env.step(action);

        // REWARD UPDATE
        totalReward += reward;

        // CHECK FOR TERMINAL STATE
        if (terminal) {
          // UPDATING Q-VALUES LAST TIME
          agent.end(reward);
          break;
        }

        // UPDATING Q-VALUES
        action = agent.step(reward, agentLocation);
      }

      // CURRENT EPISODE DETAILS
      console.log(`Episode ${episode + 1}: Total Reward: ${totalReward}`);
    }

    // UPDATE STORE
    updateQValues(agent.qValues);
  };

  const releaseAgent = () => {
    console.log("releasing!");
    const gridHeight = 8;
    const gridWidth = 5;

    const bestPathMoves = getBestPathMoves(
      startPosition,
      terminalPosition,
      qValues,
      gridHeight,
      gridWidth
    );
    console.log(bestPathMoves)

    let bestActionIndex = 0;
    const intervalId = setInterval(() => {
      let nextPosition = bestPathMoves[bestActionIndex];
      console.log(nextPosition)

      bestActionIndex += 1;
      if (bestActionIndex === bestPathMoves.length) {
        clearInterval(intervalId);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col text-stone-400 smooth-display">
      <div className="mx-auto py-4 text-2xl">Simulation</div>

      {/* CONTROL INPUTS */}
      <div className="p-4 flex justify-evenly text-stone-500">
        <div className="flex flex-col">
          <label htmlFor="step-size">Step size</label>
          <input
            className="simulation-input"
            type="number"
            id="step-size"
            defaultValue="0.01"
            placeholder="Step size"
            step="0.01"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="delay">Delay</label>
          <input
            className="simulation-input"
            type="number"
            id="delay"
            defaultValue="0.5"
            placeholder="Delay"
            step="0.1"
          />
        </div>
      </div>

      {/* GRID CONTAINER */}
      <div className="mx-auto flex flex-col">
        <div className="flex justify-between">
          <button className="p-1 px-3 border-b-2 w-fit border-stone-600 rounded-t-md hover:text-stone-400 duration-300 hover:border-b-stone-500 text-stone-500 ">
            Reset simulation
          </button>
          <button className="p-1 px-3 border-b-2 w-fit border-stone-600 rounded-t-md hover:text-stone-400 duration-300 hover:border-b-stone-500 text-stone-500 ">
            Configure environment
          </button>
        </div>

        <Grid />

        <div className="flex justify-between">
          <SimulationButton onButtonClick={releaseAgent}>
            Run agent
          </SimulationButton>
          <SimulationButton onButtonClick={performTraining}>
            Train agent
          </SimulationButton>
          <SimulationButton onButtonClick={toggleValuesDisplay}>
            {valuesDisplayed ? "Hide" : "Show"} values
          </SimulationButton>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
