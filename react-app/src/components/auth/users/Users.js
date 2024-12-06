import React, { useContext, useEffect } from "react";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";

import { useQuery } from "@apollo/react-hooks";
import { ORDINARY_USERS } from "../../../queries/users";
import UserDetails from "./UserDetails";
import { Spinner, ListGroup, ListGroupItem, Row, Col, Alert } from "reactstrap";
export default function Users() {
  const context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
  });

  const { loading, error, data } = useQuery(ORDINARY_USERS, {
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });
  // .then(res=>console.log(res))
  // .catch(err=>console.log(err))

  //   if (error) return <Alert color="danger">{error}</Alert>

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
    <div className="container">
      {/* { error && <pre > {error.graphQLErrors.map(({ message }, i) => (
        <span key={i} className="text-center"> <Alert color="danger"> {message} </Alert>   </span>
      ))}
      </pre> } */}
      <p className="mt-3 mb-4 text-center display-4">Dentist administration</p>
      <ListGroup>
        <ListGroupItem color="danger">
          <Row>
            <Col sm="4" md="4">
              Name
            </Col>
            <Col sm="4" md="4">
              Username
            </Col>
            <Col sm="2" md="2">
              Edit
            </Col>
            <Col sn="2" md="2">
              Delete
            </Col>
          </Row>
        </ListGroupItem>
        {data.ordinaryUsers !== null &&
          data.ordinaryUsers.map((user) => {
            return <UserDetails user={user} key={user._id} />;
          })}
      </ListGroup>
    </div>
  );
}
