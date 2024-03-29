import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const SimulationStoreProvider = ({ children }) => {
  const [state, setState] = useState({
    currentConfig: "none",
    dynamitePositions: [], // [{x: 0, y: 0}, ...]
    startPosition: { x: null, y: null }, // {x: 0, y: 0}
    terminalPosition: { x: null, y: null }, // {x: 0, y: 0},
    valuesDisplayed: false,
    qValues: [],
    simulationAgentPosition: { x: null, y: null },
  });

  const updateCurrentConfig = (newConfig) => {
    setState((prevState) => ({
      ...prevState,
      currentConfig: newConfig,
    }));
  };

  const updateDynamitePosition = (position) => {
    setState((prevState) => {
      const dynamitePositions = prevState.dynamitePositions;
      const positionIndex = dynamitePositions.findIndex(
        (dynamitePosition) =>
          dynamitePosition.y === position.y && dynamitePosition.x === position.x
      );

      if (positionIndex >= 0) {
        // REMOVE POSITION
        const updatedPositions = dynamitePositions.filter(
          (_, index) => index !== positionIndex
        );
        return { ...prevState, dynamitePositions: updatedPositions };
      }
      // ADD POSITION
      const updatedPositions = [...dynamitePositions, position];
      return { ...prevState, dynamitePositions: updatedPositions };
    });
  };

  const updateStartPosition = (position) => {
    setState((prevState) => ({
      ...prevState,
      startPosition: position,
    }));
  };

  const updateTerminalPosition = (position) => {
    setState((prevState) => ({
      ...prevState,
      terminalPosition: position,
    }));
  };

  const toggleValuesDisplay = () => {
    if (state.qValues.length === 0) {
      console.log('there are no qValues, since agent has not been trained!')
      return;
    }

    setState((prevState) => ({
      ...prevState,
      valuesDisplayed: !prevState.valuesDisplayed,
    }));
  };

  const updateQValues = (newQValues) => {
    setState((prevState) => ({
      ...prevState,
      qValues: [...newQValues],
    }));
  };

  const updateSimulationAgentPosition = (newPosition) => {
    setState((prevState) => ({
      ...prevState,
      simulationAgentPosition: newPosition,
    }));
  };

  const value = {
    updateCurrentConfig,
    currentConfig: state.currentConfig,

    updateDynamitePosition,
    dynamitePositions: state.dynamitePositions,

    updateStartPosition,
    startPosition: state.startPosition,

    updateTerminalPosition,
    terminalPosition: state.terminalPosition,

    toggleValuesDisplay,
    valuesDisplayed: state.valuesDisplayed,

    updateQValues,
    qValues: state.qValues,

    updateSimulationAgentPosition,
    simulationAgentPosition: state.simulationAgentPosition,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

// CUSTOM HOOK
export const useSimulationStore = () => useContext(StoreContext);
