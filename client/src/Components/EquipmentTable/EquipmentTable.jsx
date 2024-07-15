import { useEffect } from "react"

export default function EquipmentTable({ equipments, onDelete }) {

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Type </th>
                        <th> Ammount </th>
                    </tr>
                </thead>
                <tbody>
                    {equipments.map(item => {
                        return (
                            <tr key={item._id}>
                                <td> {item.name} </td>
                                <td> {item.type} </td>
                                <td> {item.ammount} </td>
                                <td>
                                    <button> Edit </button>
                                    <button type="button" onClick={(e) => onDelete(item._id)}> Delete </button>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}