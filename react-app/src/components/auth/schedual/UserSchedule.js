import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { REQUESTS_BY_USER } from "../../../queries/schedules";
import UserScheduleDetails from "./UserScheduleDetails";
import { Spinner, ListGroup, ListGroupItem, Row, Col } from "reactstrap";
export default function UserSchedule() {
  const { loading, eror, data } = useQuery(REQUESTS_BY_USER, {
    variables: { id: localStorage.getItem("id") },
    pollInterval: 1000,
  });
  if (loading) return <Spinner color="success" />;
  console.log("DATA", data.requestsByUser.length);
  return (
    <div>
      {data && data.requestsByUser.length === 0 ? (
        <p className="text-center display-4"> There are no requests </p>
      ) : (
        <React.Fragment>
          <p className="text-center display-4">User Schedule</p>
          <ListGroup>
            <ListGroupItem color="success">
              <Row>
                <Col sm="3" md="3" xs="6">
                  Patient
                </Col>
                <Col sm="3" md="3" xs="6">
                  Date
                </Col>
                <Col sm="3" md="3" xs="6">
                  Time
                </Col>
              </Row>
            </ListGroupItem>
            {data &&
              data.requestsByUser.map((request) => {
                return (
                  <UserScheduleDetails request={request} key={request._id} />
                );
              })}
          </ListGroup>
        </React.Fragment>
      )}
    </div>
  );
}
