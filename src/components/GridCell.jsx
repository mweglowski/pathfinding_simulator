import { useState, useMemo } from "react";
import { useEnvConfigStore } from "../store/EnvConfigContext";

const GridCell = ({ data }) => {
  const { currentConfig, updateDynamitePosition, updateStartPosition, startPosition, updateTerminalPosition, terminalPosition } = useEnvConfigStore();
  const [cellContent, setCellContent] = useState("");

  const clickHandler = () => {
    if (currentConfig === "dynamite") {
      if (cellContent === "") {
        setCellContent("🧨");
      } else {
        setCellContent("");
      }
      updateDynamitePosition(data)
    } else if (currentConfig === "start") {
      if (cellContent === "") {
        if (!startPosition) {
          setCellContent("Selected");
          updateStartPosition(data);
        }
      } else {
        setCellContent("");
        updateStartPosition(null)
      }
    } else if (currentConfig === "terminal") {
      if (cellContent === "") {
        if (!terminalPosition) {
          setCellContent("Selected");
          updateTerminalPosition(data);
        }
      } else {
        setCellContent("");
        updateTerminalPosition(null)
      }
    }
  };

  const cellStyle = useMemo(() => {
    if (currentConfig === "dynamite") {
      return {
        animation: "dynamiteAnimation 2s ease-in-out infinite",
        animationDelay: `${Math.round(Math.random() * 1000)}ms`,
        fontSize: "22px",
      };
    }
    return null;
  }, [currentConfig]);

  return (
    <div
      className=" bg-stone-800 p-2 w-[4rem] h-[4rem] hover:bg-stone-700 duration-300 cursor-pointer rounded-sm flex items-center justify-center"
      onClick={clickHandler}
    >
      <div style={cellStyle}>
        {cellContent}
      </div>
    </div>
  );
};

export default GridCell;
