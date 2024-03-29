import React from "react";

const TrainingAnimation = () => {
  const text = "Training";

  return (
    <div className="mx-auto">
      <div className="text-2xl animate-pulse">
        {text.split("").map((letter, index) => (
          <span
            key={index}
            className="letter-animation"
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrainingAnimation;
