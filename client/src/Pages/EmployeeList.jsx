import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import FilterBar from "../Components/FilterBar/FilterBar";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([])  // every employee, use this array to filters
  const [showedEmployees, setShowedEmployees] = useState([]);   // these employees apearing on the page
  const [position, setPosition] = useState("")  // chosen position from the menu
  const [level, setLevel] = useState("")  // chosen level from the menu

  const handleDelete = (id) => {
    deleteEmployee(id);

    setShowedEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });

  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
        setShowedEmployees(employees)
      })
  }, []);

  // Filter logic
  useEffect(() => {
    let filteredEmployees = employees
    if (level !== "") {
      filteredEmployees = filteredEmployees.filter(emp => emp.level === level)
    }
    if (position !== "") {
      filteredEmployees = filteredEmployees.filter(emp => emp.position === position)
    }
    setShowedEmployees(filteredEmployees)

  }, [level, position])

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <FilterBar setLevel={setLevel} setPosition={setPosition} />
      <EmployeeTable employees={showedEmployees} onDelete={handleDelete} />
    </>



  )
};

export default EmployeeList;
