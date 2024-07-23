import { useState, useEffect } from "react"
export default function BoardGame() {
    const [gameData, setGameData] = useState({})

    function handleChange(key, value) {
        setGameData(prev => ({ ...prev, [key]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await fetch("/api/games", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(gameData)
        })
        if (!response.ok) {
            console.log("Error while posting game")
        } else {
            const data = await response.json()
            console.log(data)
        }
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name"> Board game: </label>
                <input type="text" id="name" onChange={(e) => handleChange(e.target.id, e.target.value)} />
                <label htmlFor="players"> Max players: </label>
                <input type="number" id="maxPlayers" onChange={(e) => handleChange(e.target.id, e.target.value)} />
                <button> SUBMIT </button>
            </form>

        </div>
    )
}