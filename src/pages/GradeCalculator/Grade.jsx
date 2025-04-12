import React from "react";
import Inputs from "./Inputs";
import Outputs from "./Outputs";

const Grade = ({ id, grades, updateGrades }) => {
  return (
    <section className="grade--section">
      <div className="interactions">
        <Inputs grades={grades} updateGrades={updateGrades} />
        <Outputs grades={grades} />
      </div>
    </section>
  );
};

export default Grade;
