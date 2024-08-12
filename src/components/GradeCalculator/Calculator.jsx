import React from "react";

const Calculator = ({ rows, updateGrades }) => {
  const handleCalculation = () => {
    let gradeSum = 0;
    let weightSum = 0;

    rows.forEach(({ grade, weight }) => {
      const numericGrade = parseFloat(grade);
      const numericWeight = parseFloat(weight);

      if (!isNaN(numericGrade) && !isNaN(numericWeight)) {
        gradeSum += numericGrade * numericWeight;
        weightSum += numericWeight;
      }
    });

    let finalAvg = weightSum !== 0 ? gradeSum / weightSum : 0;

    updateGrades(rows); // Pass the updated grades back to the parent component
  };

  return (
    <button className="calculate" onClick={handleCalculation}>
      Calculate
    </button>
  );
};

export default Calculator;
