import { Link } from "react-router-dom"

export default function EmployeeYearsTable({ employees, sort, setSort }) {
    function changeSort() {
        if (sort === "asc") {
            setSort("desc")
        } else {
            setSort("asc")
        }
    }
    return (
        <table>
            <thead>
                <tr>
                    <th onClick={(e) => changeSort()}> name </th>
                    <th> level </th>
                    <th> Years of experience </th>
                    <th> Update </th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => <tr key={employee._id}>
                    <td> {employee.name} </td>
                    <td> {employee.level} </td>
                    <td> {employee.yearsOfExperience} </td>
                    <td>
                        <Link to={`/update/${employee._id}`}>
                            <button> Update </button>
                        </Link>
                    </td>
                </tr>)}
            </tbody>
        </table>
    )
}