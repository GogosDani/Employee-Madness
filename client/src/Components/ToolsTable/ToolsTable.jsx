export default function ToolsTable({ tools }) {
    return (
        <table>

            <thead>
                <tr>
                    <th> Tool name</th>
                    <th> Tool weight </th>
                </tr>
            </thead>
            <tbody>
                {tools.map(tool => <tr key={tool._id}>
                    <td> {tool.name}</td>
                    <td> {tool.weight} </td>
                </tr>)}
            </tbody>

        </table>
    )
}