import React from "react";
import { ListGroupItem, Row, Col } from "reactstrap";
import UpdateUserModal from "./UpdateUserModal";
import DeleteUserModal from "./DeleteUserModal";
export default function UserDetails({ user }) {
  console.log("USER", user);
  return (
    <div>
      <ListGroupItem color="info">
        <Row>
          <Col sm="4" md="4">
            {user.name}
          </Col>
          <Col sm="4" md="4">
            {user.username}
          </Col>
          <Col sm="2" md="2">
            <UpdateUserModal user={user} />
          </Col>
          <Col sm="2" md="2">
            <DeleteUserModal user={user} />
          </Col>
        </Row>
      </ListGroupItem>
    </div>
  );
}
