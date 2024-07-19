import { useState, useEffect } from "react"
import ToolsTable from "../Components/ToolsTable/ToolsTable"
export default function Tools() {

    const [tools, setTools] = useState([])
    const [search, setSearch] = useState(null)
    const [allTools, setAllTools] = useState([])
    const [name, setName] = useState("")
    const [weight, setWeight] = useState("")

    useEffect(() => {
        async function getTools() {
            const response = await fetch("/api/tools")
            if (!response.ok) {
                console.log("Error while fetching tools")
            } else {
                const data = await response.json()
                setTools(data)
                setAllTools(data)
            }
        }
        getTools()
    }, [])

    useEffect(() => {
        setTools(allTools.filter(tool => tool.name.toLowerCase().includes(search.toLowerCase())))
    }, [search])

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await fetch("/api/tools", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, weight })
        })
        if (!response.ok) {
            console.log("Error while posting tool!")
        } else {
            const data = await response.json()
            console.log(data)
            setTools(prevTools => [...prevTools, { name, weight }])
            setAllTools(prevAllTools => [...prevAllTools, { name, weight }])
        }
    }

    return (
        <>
            <input type="text" placeholder="Search for a tool!" onChange={(e) => setSearch(e.target.value)} />
            <ToolsTable tools={tools} />
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name"> Tool name: </label>
                <input id="name" type="text" required onChange={(e) => setName(e.target.value)}></input>
                <label htmlFor="weight"> Tool weight: </label>
                <input id="weight" type="number" required step="0.1" onChange={(e) => setWeight(e.target.value)}></input>
                <button> Create </button>
            </form>
        </>

    )
}