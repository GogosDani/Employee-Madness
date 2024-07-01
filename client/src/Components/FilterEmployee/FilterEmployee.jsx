import { useState, useEffect } from "react"

export default function FilterEmployee(props) {
    const [savedEmployees, setSavedEmployess] = useState(props.employees)
    const [position, setPosition] = useState("")
    const [level, setLevel] = useState("")
    useEffect(() => {
        if (level !== null && level !== "" && position !== null && position !== "") {
            props.setFilter(savedEmployees.filter(emp => emp.level == level))
            props.setFilter(prevState => prevState.filter(emp => emp.position == position))
        } else if (level !== "") {
            props.setFilter(savedEmployees.filter(emp => emp.level == level))
        } else if (position !== "") {
            props.setFilter(savedEmployees.filter(emp => emp.position == position))
        } else {
            props.setFilter(savedEmployees)
        }
        console.log(level)
    }, [level, position])


    return (

        <>
            <label htmlFor="levelFilter"> FILTER BY LEVEL</label>
            <select id="levelFilter" onChange={(e) => setLevel(e.target.value)}>
                <option> </option>
                <option> Junior </option>
                <option> Medior </option>
                <option> Senior </option>
                <option> Expert </option>
                <option> Godlike </option>
            </select>
            <label htmlFor="positionFilter"> FILTER BY LEVEL</label>
            <select id="positionFilter" onChange={(e) => setPosition(e.target.value)}>
                <option> </option>
                <option> Main Actor </option>
                <option> Comic Relief </option>
                <option> Love Interests </option>
                <option> Protagonist </option>
                <option> Antagonist  </option>
                <option> Operatour </option>
                <option> Director  </option>
                <option> Joker  </option>
                <option> Superhero  </option>
            </select>
        </>
    )
}