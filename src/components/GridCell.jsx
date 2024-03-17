import { useState } from "react";
import { useEnvConfigStore } from "../store/EnvConfigContext";

const GridCell = ({ data }) => {
  const { currentConfig } = useEnvConfigStore();
  const [cellContent, setCellContent] = useState("");

  const clickHandler = () => {
    if (currentConfig === "dynamite") {
      if (cellContent === "") {
        setCellContent("🧨");
      } else {
        setCellContent("");
      }
    } else {
      if (cellContent === "") {
        setCellContent("Selected");
      } else {
        setCellContent("");
      }
    }
  };

  return (
    <div
      className=" bg-stone-800 p-2 w-[4rem] h-[4rem] hover:bg-stone-700 duration-300 cursor-pointer rounded-sm flex items-center justify-center"
      onClick={clickHandler}
    >
      <div
        style={
          currentConfig === "dynamite"
            ? {
                animation: "dynamiteAnimation 2s ease-in-out infinite",
                animationDelay: `${Math.round(Math.random() * 1000)}ms`,
                fontSize: "22px",
              }
            : null
        }
      >
        {cellContent}
      </div>
    </div>
  );
};

export default GridCell;
