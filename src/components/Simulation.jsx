import React, { useEffect, useState, useRef } from "react";
import Grid from "./Grid";
import SimulationButton from "./ui/SimulationButton";
import { QLearningAgent } from "../agent/QLearningAgent";
import { PathfindingEnvironment } from "../agent/PathfindingEnvironment";
import { getBestPathMoves } from "../utils/getBestPathMoves";
import { useSimulationStore } from "../store/SimulationContext";
import Modal from "./ui/Modal";

const Simulation = () => {
  const [isModalDisplayed, updateModalDisplay] = useState(false);
  const [episodes, setEpisodes] = useState(100);
  const [steps, setSteps] = useState(1000);
  const [stepSize, setStepSize] = useState(0.1);
  const [epsilon, setEpsilon] = useState(0.1);
  const [discount, setDiscount] = useState(1.0);

  // SIMULATION DATA
  const {
    dynamitePositions,
    startPosition,
    terminalPosition,
    toggleValuesDisplay,
    valuesDisplayed,
    updateQValues,
    qValues,
    updateSimulationAgentPosition,
    simulationAgentPosition,
  } = useSimulationStore();

  const resetSimulation = () => {
    updateSimulationAgentPosition({ y: null, x: null });
    if (valuesDisplayed) toggleValuesDisplay();
  };

  const toggleModalDisplay = () => {
    updateModalDisplay((prevDisplay) => !prevDisplay);
  };

  // ENVIRONMENT GIVES REWARDS, AGENT TAKES ACTIONS AND UPDATES ITS Q-VALUES
  const performTraining = () => {
    console.log("updating modal display");
    toggleModalDisplay();
    // console.log(epsilon, stepSize, discount, episodes, steps)
    // const episodes = 1000;
    // const steps = 100;
    const gridHeight = 8;
    const gridWidth = 5;
    console.log("TRAINING...");

    const agent = new QLearningAgent(
      epsilon,
      stepSize,
      discount,
      gridHeight,
      gridWidth
    );
    // const agent = new QLearningAgent(
    //   0.1,
    //   0.1,
    //   1.0,
    //   gridHeight,
    //   gridWidth
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
      // console.log(`Episode ${episode + 1}: Total Reward: ${totalReward}`);
    }

    // UPDATE STORE
    updateQValues(agent.qValues);
  };

  // AFTER RUNNING AGENT
  const releaseAgent = () => {
    console.log("releasing!");
    console.log(qValues);

    // UPDATING ANIMATED SIMULATION AGENT POSITION TO START POSITION
    updateSimulationAgentPosition(startPosition);

    const bestPathMoves = getBestPathMoves(
      startPosition,
      terminalPosition,
      qValues
    );

    let bestActionIndex = 0;
    let currentAgentPosition = { ...startPosition };

    const intervalId = setInterval(() => {
      if (bestActionIndex < bestPathMoves.length) {
        // RETURNS UPDATE VALUES LIKE {y: 1, x: 0}
        // y: 1, SO THAT WE NEED TO INCREASE y BY 1
        const update = bestPathMoves[bestActionIndex];

        let nextPosition = {
          y: currentAgentPosition.y + update.y,
          x: currentAgentPosition.x + update.x,
        };

        currentAgentPosition = nextPosition;

        // UPDATING ANIMATED AGENT IN SIMULATION
        updateSimulationAgentPosition(nextPosition);

        bestActionIndex += 1;
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col text-stone-400 smooth-display">
      <div className="mx-auto py-4 text-2xl">Simulation</div>

      {/* GRID CONTAINER */}
      <div className="mx-auto flex flex-col">
        <div className="flex justify-between">
          <button
            className="p-1 px-3 border-b-2 w-fit border-stone-600 rounded-t-md hover:text-stone-400 duration-300 hover:border-b-stone-500 text-stone-500"
            onClick={resetSimulation}
          >
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
          <SimulationButton onButtonClick={toggleModalDisplay}>
            Train agent
          </SimulationButton>
          <SimulationButton onButtonClick={toggleValuesDisplay}>
            {valuesDisplayed ? "Hide" : "Show"} values
          </SimulationButton>
        </div>
      </div>

      {/* MODAL */}
      {isModalDisplayed ? (
        <Modal toggleDisplay={toggleModalDisplay}>
          <div className="max-w-[500px] mx-auto w-full">
            <div className="p-4 flex justify-evenly text-stone-500 flex-col gap-4">
              <div className="flex justify-center gap-4">
                <div className="flex flex-col">
                  <label htmlFor="episodes">Episodes</label>
                  <input
                    onChange={(e) => setEpisodes(Number(e.target.value))}
                    className="simulation-input"
                    type="number"
                    id="episodes"
                    defaultValue="100"
                    placeholder="Episodes"
                    step="1"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="steps">Steps</label>
                  <input
                    onChange={(e) => setSteps(Number(e.target.value))}
                    className="simulation-input"
                    type="number"
                    id="steps"
                    defaultValue="1000"
                    placeholder="Steps"
                    step="1"
                  />
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <div className="flex flex-col">
                  <label htmlFor="step-size">Step size</label>
                  <input
                    onChange={(e) => setStepSize(Number(e.target.value))}
                    className="simulation-input"
                    type="number"
                    id="step-size"
                    defaultValue="0.1"
                    placeholder="Step size"
                    step="0.01"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="discount">Discount</label>
                  <input
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="simulation-input"
                    type="number"
                    id="discount"
                    defaultValue="1.0"
                    placeholder="Discount"
                    step="0.01"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="epsilon">Epsilon</label>
                  <input
                    onChange={(e) => setEpsilon(Number(e.target.value))}
                    className="simulation-input"
                    type="number"
                    id="epsilon"
                    defaultValue="0.1"
                    placeholder="Epsilon"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* BUTTON CONTAINER */}
            <div className="flex mt-4">
              <SimulationButton
                onButtonClick={performTraining}
                classNames={"border-2 rounded-md mx-auto"}
              >
                Run training
              </SimulationButton>

              <SimulationButton
                onButtonClick={toggleModalDisplay}
                classNames={"border-2 rounded-md mx-auto"}
              >
                Back
              </SimulationButton>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Simulation;
