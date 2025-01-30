import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import EmployeeYearsTable from "../Components/EmployeeYearsTable/EmployeeYearsTable"
export default function Color() {
    const [employees, setEmployees] = useState([])
    useEffect(() => {
        async function getEmployees() {
            const response = await fetch(`/api/employees/color/Red`)
            if (!response.ok) {
                console.log("Error while fetching employees")
            } else {
                const data = await response.json()
                setEmployees(data)
            }

        }
        getEmployees();
    }, [])

    useEffect(() => {
        console.log(employees)
    }, [employees])

    return (
        <div>

        </div>
        // <EmployeeYearsTable employees={employees} sort={sort} setSort={setSort} />
    )
}