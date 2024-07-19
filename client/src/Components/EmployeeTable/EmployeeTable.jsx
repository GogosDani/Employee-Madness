import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, handlePresent, setPage, page, nameSorting, deleteEmpId, setDeleteEmpId }) => (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th onClick={nameSorting}>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th> Brand </th>
          <th />
          <th> Present </th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td> {employee.favoriteBrand.name}</td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>

              {deleteEmpId === employee._id ? (
                <>
                  <p> Do you want to delete? </p>
                  <button onClick={(e) => onDelete(employee._id)}> Delete </button>
                  <button onClick={(e) => setDeleteEmpId("")}> Cancel </button>
                </>
              ) : (
                <button onClick={(e) => setDeleteEmpId(employee._id)}> Delete </button>
              )}
            </td>
            <td>
              <input type="checkbox" name={employee._id} checked={employee.isPresent} onChange={(e) => handlePresent(employee._id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={(e) => setPage(prev => prev - 1)} disabled={page === 1 ? (true) : (false)}> PREVIOUS </button>
    <button onClick={(e) => setPage(prev => prev + 1)}> NEXT </button>
  </div>
);

export default EmployeeTable;
