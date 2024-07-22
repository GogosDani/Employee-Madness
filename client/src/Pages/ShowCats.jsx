import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
export default function ShowCats() {
    const { id } = useParams()
    const [employee, setEmployee] = useState([])
    const [name, setName] = useState(null)
    const [weight, setWeight] = useState(null)
    useEffect(() => {
        async function getEmployee() {
            const response = await fetch(`/api/employees/${id}`)
            if (!response.ok) {
                console.log("Error while fetching the employee!")
            } else {
                const data = await response.json()
                setEmployee(data)
            }
        }
        getEmployee()
    })

    async function addCat(e) {
        e.preventDefault()
        const response = await fetch(`/api/employees/cats/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, weight })
        })
        if (!response.ok) {
            console.log("Error while posting cat")
        } else {
            const data = await response.json()
            console.log(data)
        }
    }

    return (
        <>
            <h1> {employee.name}'s cats: </h1>
            <table>
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Weight </th>
                    </tr>

                </thead>
                <tbody>
                    {employee.kittens && employee.kittens.map(cat => <tr> <td> {cat.name} </td> <td> {cat.weight} </td> </tr>)}
                </tbody>
            </table>

            <form onSubmit={(e) => addCat(e)}>
                <label htmlFor="name"> Cat's name: </label>
                <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
                <label htmlFor="weight"> Cat's weight: </label>
                <input type="text" id="weight" onChange={(e) => setWeight(e.target.value)} />
                <button> SUBMIT </button>
            </form>
        </>
    )
}