import React from "react";
import { ListGroupItem, Row, Col, Button } from "reactstrap";
import UserApprovementModal from "./UserApprovevementModal";
import UserDenialModal from "./UseDenialModal";

export default function UserScheduleDetails({ request }) {
  console.log("REQUEST", request);
  const { patient, date, time } = request;

  return (
    <div>
      <ListGroupItem color="info">
        <Row>
          <Col md="3" sm="3" xs="12">
            {patient.name}
          </Col>
          <Col md="3" sm="3" xs="12">
            {new Date(date).toLocaleDateString()}
          </Col>
          <Col md="3" sm="3" xs="12">
            {time}:00
          </Col>
          <Col md="1" sm="1" xs="12">
            {/* <UserApprovementModal request={ request} />
                        <Button color="success" otiline>Accept </Button> */}

            <UserApprovementModal request={request} />
          </Col>
          <Col md="1" sm="1" xs="12">
            {/* <UserDenialModal request={request} /> */}
            <UserDenialModal request={request} />
          </Col>
        </Row>
      </ListGroupItem>
    </div>
  );
}
