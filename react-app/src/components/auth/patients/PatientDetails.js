import React from "react";
import { Row, Col, ListGroupItem, Button } from "reactstrap";
import { Link } from "react-router-dom";
export default function PatientDetails({ patient, handleRefetch }) {
  return (
    <div>
      <ListGroupItem color="info">
        <Row>
          <Col sm="3">{patient.name}</Col>
          <Col sm="3">{patient.city}</Col>
          <Col sm="3">{patient.address}</Col>
          <Col sm="2" md="2">
            <Link to={{ pathname: "/records", patient, handleRefetch }}>
              <i
                className="fa fa-book text-success"
                style={{ cursor: "pointer" }}
              />
            </Link>
          </Col>
        </Row>
      </ListGroupItem>
    </div>
  );
}
