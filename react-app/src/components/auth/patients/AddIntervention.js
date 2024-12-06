import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_INTERVENTION } from "../../../mutations/interventions";
import { INTERVENTONS_BY_PATIENT } from "../../../queries/interventions";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Row,
  Col,
} from "reactstrap";
export default function AddIntervention({ id, forceUpdateComp, toggle }) {
  const [createIntervention, { error, data }] = useMutation(ADD_INTERVENTION, {
    refetchQueries: () => [{ query: INTERVENTONS_BY_PATIENT }],
  });

  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    console.log(date, description, id);
    e.preventDefault();
    createIntervention({ variables: { date, description, patient: id } })
      .then((result) => {
        setDate("");
        setDescription("");
        forceUpdateComp();
        toggle();
      })
      .catch((err) => {
        console.log(err);
        setMessages(err.graphQLErrors);
      });
  };

  const handleCancel = () => {
    setDate("");
    setDescription("");
    toggle();
    setMessages([]);
  };

  return (
    <div>
      {error && (
        <pre>
          {" "}
          {messages.map(({ message }, i) => (
            <span key={i} className="text-center">
              {" "}
              <Alert color="danger"> {message} </Alert>{" "}
            </span>
          ))}
        </pre>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm="2" md="2">
            <FormGroup>
              <Label>Date</Label>
              <Input
                type="date"
                className="border border-info rounded"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </FormGroup>
          </Col>

          <Col sm="6" md="6">
            <FormGroup>
              <Label>Description</Label>
              <Input
                type="textarea"
                className="border border-info rounded"
                rows="7"
                cols="40"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" color="info" outline>
          Submit
        </Button>
        <Button color="danger" outline onClick={handleCancel}>
          Cancel{" "}
        </Button>
      </Form>
    </div>
  );
}
