import { useNavigate } from "react-router-dom"
import { useState } from "react"
import EquipmentForm from "../Components/EquipmentForm/EquipmentForm"

export default function EquipmentCreator() {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    async function postEquipment(newEquipment) {
        const response = await fetch("/api/equipments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEquipment)
        })
        if (!response.ok) {
            console.log("Error")
        } else {
            const data = await response.json()
            console.log("succeed!")
            console.log(data)
        }
    }

    return (
        <>
            <EquipmentForm save={postEquipment} cancel={() => navigate("/equipments")} />
        </>
    )
}