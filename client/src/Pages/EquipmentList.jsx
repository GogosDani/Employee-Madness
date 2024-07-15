import { useEffect, useState } from "react"
import EquipmentTable from "../Components/EquipmentTable/EquipmentTable"

async function deleteEquipment(id) {
    const response = await fetch(`/api/equipments/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) {
        console.log("error")
    } else {
        const data = await response.json()
        console.log(data)
    }
}

export default function EquipmentList() {

    const [equipments, setEquipments] = useState([])

    useEffect(() => {
        async function getEquipments() {
            const response = await fetch("/api/equipments")
            const data = await response.json()
            setEquipments(data)
        }
        getEquipments()
    }, [])

    return (
        <EquipmentTable equipments={equipments} onDelete={deleteEquipment} />
    )
}