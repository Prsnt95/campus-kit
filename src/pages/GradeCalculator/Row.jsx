import React from "react";

const Row = ({ grade, assignment, weight, handleInputChange }) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          name="assignment"
          value={assignment}
          onChange={handleInputChange}
          placeholder="Assignment name"
        />
      </td>
      <td>
        <input
          type="number"
          name="grade"
          value={grade}
          onChange={handleInputChange}
          placeholder="Grade"
          min="0"
          max="100"
        />
      </td>
      <td>
        <input
          type="number"
          name="weight"
          value={weight}
          onChange={handleInputChange}
          placeholder="Weight"
          min="0"
          max="100"
        />
      </td>
    </tr>
  );
};

export default Row;
