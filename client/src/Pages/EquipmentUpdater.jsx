import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import EquipmentForm from "../Components/EquipmentForm/EquipmentForm"
import Loading from "../Components/Loading"

async function fetchEquipment(id) {
    const response = await fetch(`/api/equipments/${id}`)
    if (!response.ok) {
        console.log("Error fetching the employee!")
    } else {
        const data = await response.json()
        return data
    }

}

async function editEquipment(equipment) {
    const response = await fetch(`/api/equipments/${equipment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(equipment)
    })
    if (!response.ok) {
        console.log("Error while editing data")
    } else {
        const data = await response.json()
        console.log(data)
    }
}

export default function EquipmentUpdater() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [equipment, setEquipment] = useState({})
    const [equipmentLoading, setEquipmentLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)

    useEffect(() => {
        setEquipmentLoading(true)
        async function getEquipment() {
            const equipmentData = await fetchEquipment(id)
            setEquipment(equipmentData)
            setEquipmentLoading(false)
        }
        getEquipment()
    }, [id])

    function updateEquipment(equipment) {
        setSubmitLoading(true)
        editEquipment(equipment)
        setSubmitLoading(false)
        navigate("/equipments")
    }

    if (equipmentLoading) {
        return <Loading />
    }


    return (
        <EquipmentForm cancel={() => navigate("/equipments")} save={updateEquipment} equipment={equipment} loading={submitLoading} />
    )
}