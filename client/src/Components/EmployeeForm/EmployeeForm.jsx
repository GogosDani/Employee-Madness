import { useEffect, useState } from "react";
import brands from "../../../../server/populate/brands.json"

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [favoriteBrand, setBrand] = useState(employee?.favoriteBrand.name ?? "")



  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        favoriteBrand
      });
    }

    return onSave({
      name,
      level,
      position,
      favoriteBrand
    });
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="brand"> Brand: </label>
        <select onChange={(e) => setBrand(e.target.value)}>
          <option> {favoriteBrand} </option>
          {brands.map(oneBrand => oneBrand !== favoriteBrand ? (<option key={oneBrand}> {oneBrand} </option>) : (""))}

        </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel} >
          Cancel
        </button>
      </div>
    </form >
  );
};

export default EmployeeForm;
