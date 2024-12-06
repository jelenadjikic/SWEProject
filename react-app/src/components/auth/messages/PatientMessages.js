import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ORDINARY_USERS } from "../../../queries/users";

import UserDetails from "./UserDetails";

import { Spinner, ListGroupItem, ListGroup, Row, Col, Alert } from "reactstrap";

export default function PatientMessages() {
  const { error, loading, data } = useQuery(ORDINARY_USERS, {
    fetchPolicy: "network-only",
  });

  if (error) {
    return error.graphQLErrors.map(({ message }, i) => (
      <span key={i} className="text-center">
        {" "}
        <Alert color="danger"> {message} </Alert>{" "}
      </span>
    ));
  }

  if (loading) return <Spinner color="success" />;

  return (
    <div>
      {/* <h1>Patient messages</h1> */}
      <ListGroup flush style={{marginRight: "100px"}}>
        <Row>
          <Col sm="2" md="2" xs="6">
            <ListGroupItem>Dentists: </ListGroupItem>
            {data.ordinaryUsers.map((user) => {
              return <UserDetails user={user} key={user._id} />;
            })}
          </Col>
        </Row>
      </ListGroup>
    </div>
  );
}
