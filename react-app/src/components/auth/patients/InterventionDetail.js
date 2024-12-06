import React from "react";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  CardBody,
} from "reactstrap";
import ChangeInterventionModal from "./ChangeInterventionModal";
import DeleteInterventionModal from "./DeleteInterventionModal";
export default function InterventionDetail({ intervention, id }) {
  return (
    <Col sm="4" md="4">
      <Card body color="secondary" outline className="mt-4">
        <CardTitle>
          <p className="text-center">
            Date:{" "}
            <span className="font-weight-bold">
              {" "}
              {new Date(intervention.date).toLocaleDateString()}{" "}
            </span>{" "}
          </p>
        </CardTitle>
        <CardText>
          <div className="text-center mb-3">Description</div>
          {intervention.description}
        </CardText>
        <div className="d-flex justify-content-around">
          <ChangeInterventionModal intervention={intervention} id={id} />
          <DeleteInterventionModal intId={intervention._id} patId={id} />
        </div>
      </Card>
    </Col>
  );
}
