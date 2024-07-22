import { useEffect, useState } from "react"
import EmployeeTable from "../Components/EmployeeTable"

const deleteEmployee = (id) => {
    return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
        res.json()
    );
};

export default function EmployeeMissing() {

    const [employees, setEmployees] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        async function getMissings() {
            const response = await fetch("/api/employees/missing/all")
            if (!response.ok) {
                console.log("Error while getting employees!")
            } else {
                const data = await response.json()
                setEmployees(data)
            }
        }
        getMissings()
    }, [])

    async function setPresent(id) {
        const response = await fetch(`/api/employees/missing/${id}`, {
            method: "PUT",
        })
        console.log(response)
        if (!response.ok) {
            console.log("Error while changing the present's value")
        } else {
            setEmployees(prev => prev.filter(emp => emp._id !== id))
        }
    }

    const handleDelete = (id) => {
        deleteEmployee(id);

        setEmployees((employees) => {
            return employees.filter((employee) => employee._id !== id);
        });

    };

    return (
        <EmployeeTable employees={employees.slice(10 * (page - 1), page * 10)} allEmployee={employees} onDelete={handleDelete} handlePresent={setPresent} page={page} setPage={setPage} />
    )
}