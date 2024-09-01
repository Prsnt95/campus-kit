import React from "react";
import Table from "./Table";

const Inputs = ({ grades, updateGrades }) => {
  return (
    <div className="input-div">
      <h2>Calculator</h2>
      <Table grades={grades} updateGrades={updateGrades} />
    </div>
  );
};

export default Inputs;
