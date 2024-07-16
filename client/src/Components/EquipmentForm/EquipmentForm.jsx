import { useEffect, useState } from "react"

export default function EquipmentForm({ save, cancel, equipment, loading }) {

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [ammount, setAmmount] = useState(0)

    useEffect(() => {
        if (equipment) {
            setName(equipment.name ?? "")
            setType(equipment.type ?? "")
            setAmmount(equipment.ammount ?? "")
        }

    }, [equipment])

    function handleSubmit(e) {
        e.preventDefault()
        if (equipment) {
            console.log(name)
            save({ ...equipment, name, type, ammount })
        } else {
            save({ name, type, ammount })
        }

    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name"> Equipment name </label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                <label htmlFor="type"> Equipment type </label>
                <input id="type" type="text" value={type} onChange={(e) => setType(e.target.value)}></input>
                <label htmlFor="ammount"> Equipment ammount </label>
                <input id="ammount" type="number" value={ammount} onChange={(e) => setAmmount(e.target.value)}></input>
                {equipment ? (
                    <button disabled={loading}> Edit </button>
                ) : (
                    <button> Create </button>
                )}
            </form>
            <button onClick={cancel}> Cancel </button>
        </>
    )
}