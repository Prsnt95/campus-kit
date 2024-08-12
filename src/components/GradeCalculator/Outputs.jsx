import React from "react";

const Outputs = ({ grades }) => {
  const [totalGrade, setTotalGrade] = React.useState(0);
  const [totalWeight, setTotalWeight] = React.useState(0);

  React.useEffect(() => {
    let gradeSum = 0;
    let weightSum = 0;

    grades.forEach(({ grade, weight }) => {
      const numericGrade = parseFloat(grade);
      const numericWeight = parseFloat(weight);

      if (!isNaN(numericGrade) && !isNaN(numericWeight)) {
        gradeSum += numericGrade * numericWeight;
        weightSum += numericWeight;
      }
    });

    setTotalGrade(gradeSum);
    setTotalWeight(weightSum);
  }, [grades]);

  const averageGrade = totalWeight !== 0 ? totalGrade / totalWeight : 0;

  return (
    <section className="outputs">
      <h3>Your Grades</h3>
      <p className="outputs--element">
        Average Grade:{" "}
        <span style={{ fontWeight: "bold" }}>{averageGrade.toFixed(2)} %</span>
      </p>
      <p className="outputs--element">
        Total Weight:{" "}
        <span style={{ fontWeight: "bold" }}>{totalWeight.toFixed(2)} %</span>
      </p>
    </section>
  );
};

export default Outputs;
