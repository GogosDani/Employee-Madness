import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = (props) => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          {props.page === "employee" && (
            <Link to="/">Employees</Link>
          )}
          {props.page === "equipment" && (
            <Link to="/equipments">Equipments</Link>
          )}



        </li>
        <li>
          {props.page === "employee" && (
            <Link to="/create">
              <button type="button">Create Employee</button>
            </Link>
          )}
          {props.page === "equipment" && (
            <Link to="/equipments/create">
              <button type="button">Create Equipment</button>
            </Link>
          )}



        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
