import React from "react";

/*
Takes paramaters including a function to handle changes in input. 
*/
const Row = (props) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          name="assignment"
          value={props.assignment}
          onChange={props.handleInputChange}
          placeholder="e.g Homework"
        />
      </td>
      <td>
        <input
          className="gradeInput"
          type="number"
          name="grade"
          value={props.grade}
          onChange={props.handleInputChange}
        />
      </td>
      <td>
        <input
          className="weightInput"
          type="number"
          name="weight"
          value={props.weight}
          onChange={props.handleInputChange}
        />
      </td>
    </tr>
  );
};

export default Row;
