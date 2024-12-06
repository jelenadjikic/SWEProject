import React, { useContext } from "react";
import Users from "./Users";
import Patients from "../patients/Patients";
import AuthContext from "../../../context/auth-context";
import { useQuery } from "@apollo/react-hooks";
import { Spinner } from "reactstrap";
import AuthLogin from "../../AuthLogin";

export default function Admin() {
  const context = useContext(AuthContext);

  return (
    <div>
      {context.role === "admin" && <Users />}
      {context.role === "user" && <Patients />}
      {context.token === "" && <AuthLogin />}
    </div>
  );
}
