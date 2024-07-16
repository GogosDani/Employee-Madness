import { useEffect } from "react"
import { Link } from "react-router-dom"

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
                                    <Link to={`/equipments/edit/${item._id}`}>
                                        <button> Edit </button>
                                    </Link>

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