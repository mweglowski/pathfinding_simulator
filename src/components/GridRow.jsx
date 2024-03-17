import React from "react";
import GridCell from "./GridCell";

const GridRow = ({ data }) => {
  return (
    <div className="flex gap-2">
      {data.map((cellData, colIndex) => (
        <GridCell data={cellData} key={colIndex} />
      ))}
    </div>
  );
};

export default GridRow;
