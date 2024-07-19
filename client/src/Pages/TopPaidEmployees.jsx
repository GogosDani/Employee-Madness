import { useState, useEffect } from "react"
import EmployeeTable from "../Components/EmployeeTable"


export default function TopPaidEmployees() {

    const [topEmployees, setTopEmployees] = useState([])

    useEffect(() => {
        async function getTopEmployees() {
            const response = await fetch("/api/employees/top/paid")
            if (!response.ok) {
                console.log("Error while getting top paid employees!")
            } else {
                const data = await response.json()
                setTopEmployees(data)
            }
        }
        getTopEmployees()
    }, [])


    return (
        <EmployeeTable employees={topEmployees} />
    )
}