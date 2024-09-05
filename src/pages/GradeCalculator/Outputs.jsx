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
      <h3>Results</h3>
      <p className="outputs--element">
        Average Grade:{" "}
        <h4>
          <span style={{ fontWeight: "bold", color: "black" }}>
            {averageGrade.toFixed(2)} %
          </span>
        </h4>
      </p>
      <p className="outputs--element">
        Total Weight:{" "}
        <span style={{ fontWeight: "bold", color: "Black" }}>
          {totalWeight.toFixed(2)} %
        </span>
      </p>
    </section>
  );
};

export default Outputs;
