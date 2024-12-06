import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { useMutation } from "@apollo/react-hooks";
import { CHANGE_INTERVENTION } from "../../../mutations/interventions";
import { INTERVENTONS_BY_PATIENT } from "../../../queries/interventions";
import PatientDetails from "./PatientDetails";

export default function ChangeInterventionModal({ intervention, id }) {
  const [date, setDate] = useState(intervention.date);
  const [description, setDescription] = useState(intervention.description);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
    setDate(intervention.date);
    setDescription(intervention.description);
  };

  const [updateIntervention, { error, data }] = useMutation(
    CHANGE_INTERVENTION,
    {
      refetchQueries: () => [
        { query: INTERVENTONS_BY_PATIENT, variables: { id } },
      ],
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(date, description);
    updateIntervention({
      variables: {
        updateInterventionInput: { id: intervention._id, date, description },
      },
    })
      .then((result) => {
        console.log(result);
        toggle();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button color="info" outline onClick={toggle}>
        Change
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Change intervention</ModalHeader>
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
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGroup>
              <Label>Date</Label>
              <Input
                type="date"
                className="border border-info rounded"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input
                className="border border-info rounded"
                rows="7"
                cols="40"
                type="textarea"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="submit" outline>
              Change
            </Button>{" "}
            <Button color="danger" outline onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}
