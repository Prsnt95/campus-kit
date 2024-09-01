import React, { useState, useEffect } from "react";
import "./GradeCalculator.css";
import Grade from "./Grade";

const GradeCalculator = () => {
  const [calculators, setCalculators] = useState([]);

  useEffect(() => {
    // Load calculators from localStorage when component mounts
    const savedCalculators = localStorage.getItem("gradeCalculators");
    if (savedCalculators) {
      try {
        const parsedCalculators = JSON.parse(savedCalculators);
        if (Array.isArray(parsedCalculators) && parsedCalculators.length > 0) {
          setCalculators(parsedCalculators);
        } else {
          setCalculators([{ id: 0, grades: [] }]);
        }
      } catch (error) {
        console.error("Error parsing saved calculators:", error);
        setCalculators([{ id: 0, grades: [] }]);
      }
    } else {
      // If no saved calculators, initialize with one calculator
      setCalculators([{ id: 0, grades: [] }]);
    }
  }, []);

  useEffect(() => {
    // Save calculators to localStorage whenever they change
    if (calculators.length > 0) {
      localStorage.setItem("gradeCalculators", JSON.stringify(calculators));
    }
  }, [calculators]);

  function addCalculator() {
    setCalculators((prev) => [...prev, { id: prev.length, grades: [] }]);
  }

  function deleteCalculator() {
    setCalculators((prev) => {
      if (prev.length > 1) {
        const updatedCalculators = prev.slice(0, -1);
        return updatedCalculators;
      }
      return prev;
    });
  }

  function updateGrades(id, newGrades) {
    setCalculators((prev) =>
      prev.map((calc) =>
        calc.id === id ? { ...calc, grades: newGrades } : calc
      )
    );
  }

  return (
    <div className="allWrapper">
      <div className="title-wrapper">
        <h1 className="title"> Grade Calculator</h1>
      </div>
      <div
        className={`calculators ${calculators.length === 1 ? "single" : ""}`}
      >
        {calculators.map((calc) => (
          <Grade
            key={calc.id}
            id={calc.id}
            grades={calc.grades}
            updateGrades={(newGrades) => updateGrades(calc.id, newGrades)}
          />
        ))}
      </div>
      <div className="buttons">
        <button onClick={addCalculator}>Add calculator</button>
        <button onClick={deleteCalculator}>Delete calculator</button>
      </div>
    </div>
  );
};

export default GradeCalculator;
