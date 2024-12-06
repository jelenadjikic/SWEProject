import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { SCHEDULES } from "../../../queries/schedules";
import { Spinner, ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import ReservationDetails from "./ReservationDetails";
export default function Reservation() {
  const { loading, error, data } = useQuery(SCHEDULES, {
    variables: { user: localStorage.getItem("id") },
    pollInterval: 1000,
  });

  if (loading) return <Spinner color="success" />;
  console.log("Loading", loading);
  if (data) {
    console.log(data);
  }
  return (
    <div>
      <ListGroup>
        <ListGroupItem color="danger">
          <Row>
            <Col sm="3" md="3">
              {" "}
              Date{" "}
            </Col>
            <Col sm="3" md="3">
              Time
            </Col>
            <Col sm="4" md="4">
              Patient
            </Col>
          </Row>
        </ListGroupItem>

        {data &&
          data.schedules.map((schedule) => {
            return (
              <ReservationDetails schedule={schedule} key={schedule._id} />
            );
          })}
      </ListGroup>
    </div>
  );
}
