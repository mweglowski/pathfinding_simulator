import React, { useEffect, useState } from "react";
import GridRow from "./GridRow";

const Grid = () => {
  const [cellsData, setCellsData] = useState([]);

  const setUpGrid = () => {
    let cells = [];
    for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
      let row = [];
      for (let colIndex = 0; colIndex < 5; colIndex++) {
        row.push({
          x: colIndex,
          y: rowIndex,
        });
      }
      cells.push(row);
    }

    setCellsData(cells);
  };

  useEffect(() => {
    setUpGrid();
  }, []);

  return (
    <div className="grid">
      {/* ROWS CONTAINER */}
      <div className="flex flex-col gap-2">
        {cellsData.map((rowData, rowIndex) => {
          return <GridRow data={rowData} key={rowIndex} />;
        })}
      </div>
    </div>
  );
};

export default Grid;
