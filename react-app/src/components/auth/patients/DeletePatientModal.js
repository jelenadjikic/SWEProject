import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { DELETE_PATIENT } from "../../../mutations/patients";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
// import { GET_USERS } from '../../../queries/users';

export default function DeletePatientModal({ id, name }) {
  console.log("_ID:", id);
  const [modal, setModal] = useState(false);
  let history = useHistory();
  const toggle = () => setModal(!modal);

  const [deletePatient, { error, data }] = useMutation(DELETE_PATIENT);

  const handleDelete = (e) => {
    e.preventDefault();
    deletePatient({ variables: { id } })
      .then((result) => {
        toggle();
        history.push("/patients");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button outline color="danger" onClick={toggle}>
        Delete
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-danger" toggle={toggle}>
          Delete patient
        </ModalHeader>
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
        <ModalBody>Are you sure you want to delete patient {name}</ModalBody>
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
