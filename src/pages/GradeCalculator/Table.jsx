import React, { useState, useEffect } from "react";
import Row from "./Row";

const Table = ({ grades, updateGrades }) => {
  const [rows, setRows] = useState(
    grades.length > 0
      ? grades
      : [
          { key: 0, grade: "", assignment: "", weight: "" },
          { key: 1, grade: "", assignment: "", weight: "" },
          { key: 2, grade: "", assignment: "", weight: "" },
        ]
  );
  const [opt, setOpt] = useState("");

  useEffect(() => {
    updateGrades(rows);
  }, [rows, updateGrades]);

  function handleOptChange(e) {
    setOpt(e.target.value);
  }

  function handleCalculation() {
    // Calculation logic remains the same
    // ...
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      { key: prev.length, grade: "", assignment: "", weight: "" },
    ]);
  }

  function deleteRow() {
    setRows((prev) => {
      if (prev.length > 1) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  }

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    if (value < 0) return;
    setRows((prev) => {
      const updatedRows = [...prev];
      updatedRows[index] = { ...updatedRows[index], [name]: value };
      return updatedRows;
    });
  };

  return (
    <section className="Row--inputs">
      <table>
        <thead>
          <tr>
            <th>Assignment (optional) </th>
            <th>Grade %</th>
            <th>Weight %</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <Row
              key={row.key}
              grade={row.grade}
              assignment={row.assignment}
              weight={row.weight}
              handleInputChange={(e) => handleInputChange(index, e)}
            />
          ))}
        </tbody>
      </table>
      <button className="addRow" onClick={addRow}>
        + Add row
      </button>
      <button className="addRow" onClick={deleteRow}>
        - Delete Row
      </button>
      <div className="input-div--extra">
        <p>
          Find additional grade needed to get average grade of (assumes weights
          in %)
          <br />
          <span className="boldText">Optional</span>
        </p>
        <span>
          <input
            className="addtionalGrade"
            placeholder="80"
            type="number"
            onChange={handleOptChange}
            value={opt}
          ></input>
          %
        </span>
      </div>
      <button className="calculate" onClick={handleCalculation}>
        Calculate
      </button>
    </section>
  );
};

export default Table;
