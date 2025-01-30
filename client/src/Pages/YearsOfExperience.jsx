import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import EmployeeYearsTable from "../Components/EmployeeYearsTable/EmployeeYearsTable"
export default function YearsOfExperience() {
    const [employees, setEmployees] = useState([])
    const [sort, setSort] = useState("asc")
    const { year } = useParams()
    useEffect(() => {
        async function getEmployees() {
            const response = await fetch(`/api/employees/years/${year}/${sort}`)
            if (!response.ok) {
                console.log("Error while fetching employees")
            } else {
                const data = await response.json()
                setEmployees(data)
            }
        }
        getEmployees()
    }, [sort])

    useEffect(() => {
        console.log(sort)
    }, [sort])

    return (
        <EmployeeYearsTable employees={employees} sort={sort} setSort={setSort} />
    )
}