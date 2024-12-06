import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { DELETE_INTERVENTION } from "../../../mutations/interventions";
import { INTERVENTONS_BY_PATIENT } from "../../../queries/interventions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { GET_USERS } from '../../../queries/users';

export default function DeleteInterventionModal({ intId, patId }) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [deleteIntervention, { error, data }] = useMutation(
    DELETE_INTERVENTION,
    {
      refetchQueries: () => [
        { query: INTERVENTONS_BY_PATIENT, variables: { id: patId } },
      ],
    }
  );

  const handleDelete = (e) => {
    e.preventDefault();
    deleteIntervention({ variables: { id: intId } })
      .then((result) => {
        toggle();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button outline color="danger" onClick={toggle}>
        Delete
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete intervention</ModalHeader>
        <ModalBody>Are you sure you want to delete intervention</ModalBody>
        <ModalFooter>
          <Button color="danger" outline onClick={handleDelete}>
            Delete
          </Button>{" "}
          <Button color="secondary" outline onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
