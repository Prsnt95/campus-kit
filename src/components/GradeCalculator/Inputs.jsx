import React from "react";
import Table from "./Table";

const Inputs = ({ updateGrades }) => {
  const [tableData, setTableData] = React.useState();

  return (
    <div className="input-div">
      <h2>Grade type Percentage</h2>
      <Table
        updateGrades={updateGrades}
        tableData={tableData}
        setTableData={setTableData}
      />
    </div>
  );
};

export default Inputs;
