import { useState } from "react"

export default function EquipmentForm({ save, cancel }) {

    const [name, setName] = useState(null)
    const [type, setType] = useState(null)
    const [ammount, setAmmount] = useState(null)

    function handleSubmit(e) {
        e.preventDefault()
        save({ name, type, ammount })
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name"> Equipment name </label>
                <input id="name" type="text" onChange={(e) => setName(e.target.value)}></input>
                <label htmlFor="type"> Equipment type </label>
                <input id="type" type="text" onChange={(e) => setType(e.target.value)}></input>
                <label htmlFor="ammount"> Equipment ammount </label>
                <input id="ammount" type="number" onChange={(e) => setAmmount(e.target.value)}></input>
                <button> Create </button>
            </form>
            <button onClick={cancel}> Cancel </button>
        </>
    )
}