import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import FilterBar from "../Components/FilterBar/FilterBar";

const fetchEmployees = (page) => {
  return fetch(`/api/employees/?page=${page}`).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

function splitName(name) {
  const parts = name.split(" ");
  return {
    first: parts[0],
    middle: parts.length === 3 ? parts[1] : "",
    last: parts[parts.length - 1]
  };
}



// main function

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([])  // every employee, use this array to filters
  const [position, setPosition] = useState("")  // chosen position from the menu
  const [level, setLevel] = useState("")  // chosen level from the menu
  const [sort, setSort] = useState("first name")
  const [page, setPage] = useState(1)
  const [nameSort, setNameSort] = useState("asc")

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });

  };


  useEffect(() => {
    fetchEmployees(page)
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
  }, [page]);

  // sort names by clicking on "name" th



  useEffect(() => {
    if (nameSort === "asc") {
      setEmployees(prev => [...prev].sort((a, b) => a.name.localeCompare(b.name.localeCompare)))
    } else {
      setEmployees(prev => [...prev].sort((a, b) => b.name.localeCompare(a.name)))
    }
  }, [nameSort])

  function setSorting() {
    if (nameSort === "asc") {
      setNameSort("des")
    } else {
      setNameSort("asc")
    }
  }

  // Sorting and filtering function
  function filteredEmployees() {

    // Filter logic
    let filteredEmployees = employees
    if (level !== "") {
      filteredEmployees = filteredEmployees.filter(emp => emp.level === level)
    }
    if (position !== "") {
      filteredEmployees = filteredEmployees.filter(emp => emp.position === position)
    }



    // sorting logic

    // switch (sort) {
    //   case "first name":
    //     filteredEmployees.sort((a, b) => {
    //       return splitName(a.name).first.localeCompare(splitName(b.name).first)
    //     })
    //     break
    //   case "middle name":
    //     filteredEmployees.sort((a, b) => {
    //       return splitName(b.name).middle.localeCompare(splitName(a.name).middle)
    //     })
    //     break
    //   case "last name":
    //     filteredEmployees.sort((a, b) => {
    //       return splitName(a.name).last.localeCompare(splitName(b.name).last)
    //     })


    // }
    return filteredEmployees
  }




  async function setPresent(id) {
    const response = await fetch(`/api/employees/missing/${id}`, {
      method: "PUT",
    })
    console.log(response)
    if (!response.ok) {
      console.log("Error while changing the present's value")
    } else {
      setEmployees(prev => prev.map(emp => emp._id === id ? { ...emp, isPresent: !emp.isPresent } : { ...emp }))
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <FilterBar setLevel={setLevel} setPosition={setPosition} setSort={setSort} />
      <EmployeeTable employees={filteredEmployees()} onDelete={handleDelete} handlePresent={setPresent}
        setPage={setPage} page={page} nameSorting={setSorting} />
    </>



  )
};

export default EmployeeList;
