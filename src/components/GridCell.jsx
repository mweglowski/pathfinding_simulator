import { useState, useMemo, useEffect } from "react";
import { useSimulationStore } from "../store/SimulationContext";
import { max } from "../utils/max";

const GridCell = ({ data }) => {
  const {
    currentConfig,
    updateDynamitePosition,
    updateStartPosition,
    startPosition,
    updateTerminalPosition,
    terminalPosition,
    dynamitePositions,
    valuesDisplayed,
    qValues,
    simulationAgentPosition,
  } = useSimulationStore();
  const [cellContent, setCellContent] = useState("");

  // CHECK IF CELL CONTAINS ANIMATED AGENT IN SIMULATION
  const isAgentInCell =
    simulationAgentPosition.x === data.x &&
    simulationAgentPosition.y === data.y;

  const isDynamiteInCell = (cellCoords) => {
    for (let i = 0; i < dynamitePositions.length; i++) {
      if (
        cellCoords.x === dynamitePositions[i].x &&
        cellCoords.y === dynamitePositions[i].y
      ) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (isAgentInCell) {
      setCellContent("🤖");
      return;
    }
    if (valuesDisplayed && qValues.length !== 0) {
      const value = max(qValues[data.y][data.x]).toFixed(1);

      if (value !== "0.0") {
        setCellContent(value);
      }
    } else {
      setCellContent("");
    }

    if (currentConfig !== "dynamite") {
      if (isDynamiteInCell(data)) {
        setCellContent("🧨");
      }
    }
    // CHECK IF CELL IS START POSITION
    if (data.x === startPosition.x && data.y === startPosition.y) {
      setCellContent("Start");
    }
    // CHECK IF CELL IS TERMINAL POSITION
    if (data.x === terminalPosition.x && data.y === terminalPosition.y) {
      setCellContent("🏆");
    }
  }, [valuesDisplayed, data, simulationAgentPosition]);

  const clickHandler = () => {
    if (currentConfig === "none") return;

    if (currentConfig === "dynamite") {
      if (cellContent === "") {
        setCellContent("🧨");
      } else {
        setCellContent("");
      }
      updateDynamitePosition(data);
    } else if (currentConfig === "start") {
      if (cellContent === "") {
        if (startPosition.x === null) {
          setCellContent("Selected");
          updateStartPosition(data);
        }
      } else if (cellContent === "🧨") {
        return;
      } else {
        setCellContent("");
        updateStartPosition({ x: null, y: null });
      }
    } else if (currentConfig === "terminal") {
      if (cellContent === "") {
        if (terminalPosition.x === null) {
          setCellContent("Selected");
          updateTerminalPosition(data);
        }
      } else if (cellContent === "🧨" || cellContent === "Start") {
        return;
      } else {
        setCellContent("");
        updateTerminalPosition({ x: null, y: null });
      }
    }
  };

  const cellStyle = useMemo(() => {
    if (isAgentInCell) {
      return {
        animation: "agentStepAnimation 1s ease-in-out",
        fontSize: "22px",
        boxShadow: "0 0 1.5em cyan",
        borderRadius: 5,
        backgroundColor: '#1f5e5c',
      };
    }

    if (isDynamiteInCell(data) || currentConfig === "dynamite") {
      return {
        animation: "dynamiteAnimation 3s ease-in-out infinite",
        animationDelay: `${Math.round(Math.random() * 1000)}ms`,
        fontSize: "22px",
        opacity: 0,
      };
    }
    // ADJUST TERMINAL STATE EMOJI
    if (data.x === terminalPosition.x && data.y === terminalPosition.y) {
      return {
        fontSize: "28px",
      };
    }
    return null;
  }, [currentConfig, isAgentInCell]);

  return (
    <div
      className=" bg-stone-800 p-2 w-[4rem] h-[4rem] hover:bg-stone-700 duration-300 cursor-pointer rounded-sm flex items-center justify-center"
      onClick={clickHandler}
    >
      <div style={cellStyle}>{cellContent}</div>
    </div>
  );
};

export default GridCell;
