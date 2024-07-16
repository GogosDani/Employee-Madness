import { useEffect, useState } from "react"
import EmployeeTable from "../Components/EmployeeTable"

export default function EmployeeMissing() {

    const [employees, setEmployees] = useState([])

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

    return (
        <EmployeeTable employees={employees} />
    )
}