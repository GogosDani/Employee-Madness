import { useEffect, useState } from "react";
import brands from "../../../../server/populate/brands.json"

const EmployeeForm = ({ onSave, disabled, employee, onCancel, games }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [favoriteBrand, setBrand] = useState(employee?.favoriteBrand.name ?? "")
  const [currentSalary, setCurrentSalary] = useState(employee?.currentSalary ?? "")
  const [desiredSalary, setdesiredSalary] = useState(employee?.desiredSalary ?? "")
  const [favoriteColor, setFavoriteColor] = useState(employee?.favoriteColor ?? "")
  const [startingDate, setStartingDate] = useState(employee?.startingDate ?? "")
  const [boardGame, setBoardGame] = useState(employee?.boardGame ?? "")


  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        favoriteBrand,
        currentSalary,
        desiredSalary,
        favoriteColor,
        startingDate,
        boardGame
      });
    }

    return onSave({
      name,
      level,
      position,
      favoriteBrand,
      currentSalary,
      desiredSalary,
      favoriteColor,
      startingDate,
      boardGame
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

      <div className="control">
        <label htmlFor="currentSalary"> Current Salary: </label>
        <input value={currentSalary} type="number" id="currentSalary" onChange={(e) => setCurrentSalary(e.target.value)}></input>
      </div>

      <div className="control">
        <label htmlFor="desiredSalary"> Desired Salary: </label>
        <input value={desiredSalary} type="number" id="desiredSalary" onChange={(e) => setdesiredSalary(e.target.value)}></input>
      </div>

      <div className="cotrol">
        <label htmlFor="favoriteColor"> Favorite Color: </label>
        <input value={favoriteColor} type="color" id="favoriteColor" onChange={(e) => setFavoriteColor(e.target.value)}></input>
      </div>

      <div className="control">
        <label htmlFor="startingDate"> Starting Date: </label>
        <input value={startingDate} type="date" id="startingDate" onChange={(e) => setStartingDate(e.target.value)}></input>
      </div>

      <div className="control">
        <label htmlFor="game"> Board Game: </label>
        <select onChange={(e) => setBoardGame(e.target.value)}>
          {games.map(game => <option key={game._id}> {game.name} </option>)}
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
