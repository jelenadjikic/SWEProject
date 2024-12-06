import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
import { DELETE_QUESTION } from "../../../mutations/questions";
import { QUESTIONS } from "../../../queries/questions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
export default function DeleteQuestionModal({ id }) {
  const context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
  });

  const [deleteQuestion, { error }] = useMutation(DELETE_QUESTION, {
    refetchQueries: () => [{ query: QUESTIONS }],
  });
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const handleDelete = () => {
    deleteQuestion({ variables: { id } })
      .then((result) => {
        toggle();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Button color="danger" size="sm" outline onClick={toggle}>
        Delete
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-danger" toggle={toggle}>
          Delete question
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
        <ModalBody>Are you shure you want to delete this question?</ModalBody>
        <ModalFooter>
          <Button color="danger" outline onClick={handleDelete}>
            Delete
          </Button>{" "}
          <Button color="secondary" outline onClick={toggle}>
            Canceel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
