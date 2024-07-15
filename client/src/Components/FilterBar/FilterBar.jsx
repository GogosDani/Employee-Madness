import levels from "../../../../server/populate/levels.json"
import positions from "../../../../server/populate/positions.json"


export default function FilterBar({ setLevel, setPosition, setSort }) {

    function setFilter(e, filterType) {
        filterType === "level" ? (
            setLevel(e.target.value)
        ) : (
            setPosition(e.target.value)
        )
    }

    return (
        <div>
            <label htmlFor="level"> Filter by Level </label>
            <select id="level" onChange={(e) => setFilter(e, "level")}>
                <option value=""> Every level </option>
                {levels.map(level => <option key={level}> {level} </option>)}
            </select>
            <label htmlFor="position"> Filter by Position </label>
            <select id="position" onChange={(e) => setFilter(e, "position")}>
                <option value=""> Every position </option>
                {positions.map(position => <option key={position}> {position} </option>)}
            </select>
            <label htmlFor="sort"> Sort by: </label>
            <select id="sort" onChange={(e) => setSort(e.target.value)}>
                <option> first name </option>
                <option> middle name </option>
                <option> last name </option>
                <option> level </option>
                <option> position </option>
            </select>
        </div>
    )
}