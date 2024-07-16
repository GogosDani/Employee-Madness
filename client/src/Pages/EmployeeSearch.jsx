import { useEffect, useState } from "react"
import Loading from "../Components/Loading"
import EmployeeTable from "../Components/EmployeeTable"
import { useParams } from "react-router-dom"

async function deleteEmployee(id) {
    const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        console.log("Error while deleting")
    } else {
        const data = await response.json()
        console.log(data)
    }
}


export default function EmployeeSearch() {

    const [employees, setEmployees] = useState([])
    const { search } = useParams()

    useEffect(() => {
        async function fetchEmployees(name) {
            const response = await fetch(`/api/employees/search/${name}`)
            if (!response.ok) {
                console.log("Error while getting employee(s)")
            } else {
                const data = await response.json()
                setEmployees(data)
            }
        }
        fetchEmployees(search)
    }, [search])


    const handleDelete = (id) => {
        deleteEmployee(id);

        setEmployees((employees) => {
            return employees.filter((employee) => employee._id !== id);
        });

    };

    if (employees.length === 0) {
        return <Loading />
    }

    return (
        <EmployeeTable employees={employees} onDelete={handleDelete} />
    )
}