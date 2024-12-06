import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Spinner,
  Alert,
} from "reactstrap";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";

import PatientDetails from "./PatientDetails";
import { useLazyQuery } from "@apollo/react-hooks";
import { FIND_PATIENTS } from "../../../queries/patients";
export default function Patients() {
  const [name, setName] = useState("");
  const [patients, setPatients] = useState([]);
  const [findPatients, { loading, data, error, refetch }] = useLazyQuery(
    FIND_PATIENTS,
    { fetchPolicy: "network-only" },
    { errorPolicy: "all" },
    { pollInterval: 500 }
  );

  const context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
    //console.log("ADD USER")
  });

  const handleRefetch = () => {
    console.log("CALLED REFETCH");
    refetch({ variables: { name } });
  };
  if (loading) return <Spinner color="success" />;

  // if(error) return "Error..."

  const handleFind = () => {
    findPatients({ variables: { name } });
    setName("");
  };
  return (
    <div className="container">
      {error && (
        <pre>
          {" "}
          {error.graphQLErrors.map(({ message }, i) => (
            <span key={i} className="text-center">
              {" "}
              <Alert color="danger"> {message} </Alert>{" "}
            </span>
          ))}
        </pre>
      )}
      <Label>Name</Label>

      <Form inline>
        <FormGroup>
          <Input
            type="text"
            className="border border-info rounded"
            name={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        {/* <Button type="submit" className="mx-3" onClick={ ()=>findPatients({ variables:{name}}) } color="info" outline>Find</Button>     */}
        <Button
          type="submit"
          className="mx-3"
          onClick={handleFind}
          color="info"
          outline
        >
          Find
        </Button>
      </Form>
      {!data ? null : (
        <ListGroup className="mt-3">
          <ListGroupItem color="danger">
            <Row>
              <Col sm="3" md="3">
                Name
              </Col>
              <Col sm="3" md="3">
                City
              </Col>
              <Col sm="3" md="3">
                Address
              </Col>
              <Col sm="2" md="2">
                Records
              </Col>
            </Row>
          </ListGroupItem>
          {data &&
            data.findPatients.map((patient) => {
              return (
                <PatientDetails
                  patient={patient}
                  handleRefetch={handleRefetch}
                  key={patient._id}
                />
              );
            })}
        </ListGroup>
      )}
    </div>
  );
}
