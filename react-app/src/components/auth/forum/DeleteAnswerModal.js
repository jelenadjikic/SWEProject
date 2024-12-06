import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_ANSWER } from "../../../mutations/answers";
import { QUESTIONS } from "../../../queries/questions";
const DeleteAnswerModal = ({ id }) => {
  const context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
  });

  const [deleteAnswer, { error, data }] = useMutation(DELETE_ANSWER, {
    refetchQueries: () => [{ query: QUESTIONS }],
  });
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const hadleDelete = (e) => {
    e.preventDefault();
    deleteAnswer({ variables: { id } })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button color="danger" outline size="sm" onClick={toggle}>
        Delete
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-danger" toggle={toggle}>
          Delete Answer
        </ModalHeader>

        <ModalBody>Are you sure you want to delete this answer?</ModalBody>
        <ModalFooter>
          <Button color="primary" outline onClick={hadleDelete}>
            Delete
          </Button>{" "}
          <Button color="danger" outline onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteAnswerModal;
