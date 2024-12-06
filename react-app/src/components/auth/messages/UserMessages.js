import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { PATIENTS } from "../../../queries/patients";

import PatientDetails from "./PatientDetails";

import { Spinner, ListGroupItem, ListGroup, Row, Col } from "reactstrap";
export default function UserMessages() {
  const { error, loading, data } = useQuery(PATIENTS, {
    fetchPolicy: "network-only",
  });

  if (loading) return <Spinner color="success" />;
  console.log("DATA", data);
  return (
    <div>
      {/* <h1>Dentist messages</h1> */}
      <ListGroup flush>
        <Row>
          <Col sm="2" md="2" xs="6">
            <ListGroupItem>Patients: </ListGroupItem>
            {data.patients.map((patient) => {
              return <PatientDetails patient={patient} key={patient._id} />;
            })}
          </Col>
        </Row>
      </ListGroup>
    </div>
  );
}
