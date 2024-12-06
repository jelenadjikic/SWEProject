import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { checkToken } from "../../../middleware/check-token";
import AuthContext from "../../../context/auth-context";
import CartonLegend from "./CartonLegend";
import { FIND_PATIENT_BY_ID } from "../../../queries/patients";
import { Spinner } from "reactstrap";
import CartonDetails from "./CartonDetails";
export default function Carton() {
  const context = useContext(AuthContext);
  useEffect(() => {
    checkToken(context);
  });

  const { loading, error, data } = useQuery(FIND_PATIENT_BY_ID, {
    variables: { id: localStorage.getItem("id") },
  });
  if (loading) return <Spinner color="success" />;
  console.log(data);
  return (
    <div>
      <CartonLegend />
      {data && <CartonDetails carton={data.findPatient.carton} />}
    </div>
  );
}
