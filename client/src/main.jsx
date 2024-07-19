import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import EmployeeMissing from "./Pages/EmployeeMissing";
import TopPaidEmployees from "./Pages/TopPaidEmployees";
import EquipmentList from "./Pages/EquipmentList";
import EquipmentCreator from "./Pages/EquipmentCreator";
import EquipmentUpdater from "./Pages/EquipmentUpdater"

import "./main.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";
import EmployeeSearch from "./Pages/EmployeeSearch";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout page={"employee"} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/employees/:search",
        element: <EmployeeSearch />
      },
      {
        path: "/missing",
        element: <EmployeeMissing />
      },
      {
        path: "/top-paid",
        element: <TopPaidEmployees />
      }
    ],
  },
  {
    path: "equipments",
    element: <Layout page={"equipment"} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <EquipmentList />
      },
      {
        path: "/equipments/create",
        element: <EquipmentCreator />
      },
      {
        path: "/equipments/edit/:id",
        element: <EquipmentUpdater />
      },

    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <RouterProvider router={router} />

);

