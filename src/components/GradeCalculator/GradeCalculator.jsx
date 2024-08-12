import React from "react";
import "./GradeCalculator.css";

import Grade from "./Grade";
const GradeCalculator = () => {
  const [calculators, setCalculators] = React.useState([<Grade key={0} />]);
  function addCalculator() {
    setCalculators((prev) => [...prev, <Grade key={prev.length} />]);
  }
  function deleteCalculator() {
    setCalculators((prev) => {
      const updatedCalculators = [...prev];
      updatedCalculators.pop();
      return updatedCalculators;
    });
  }

  return (
    <div className="allWrapper">
      <div className="title-wrapper">
        <h1 className="title"> Grade Calculator</h1>
      </div>
      <div
        className={`calculators ${calculators.length === 1 ? "single" : ""}`}
      >
        {calculators}
      </div>
      <div className="buttons">
        <button onClick={addCalculator}>Add calculator</button>
        <button onClick={deleteCalculator}>deleteCalculator</button>
      </div>
    </div>
  );
};

export default GradeCalculator;
