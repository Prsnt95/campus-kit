import React from "react";
import Inputs from "./Inputs";
import Outputs from "./Outputs";

const Grade = () => {
  const [grades, setGrades] = React.useState([]);

  const updateGrades = (newGrades) => {
    setGrades(newGrades);
  };

  return (
    <section className="grade--section">
      <div className="interactions">
        <Inputs updateGrades={updateGrades} />
        <Outputs grades={grades} />
      </div>
    </section>
  );
};

export default Grade;
