import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_USER } from "../../../mutations/users";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ORDINARY_USERS } from "../../../queries/users";

export default function DeleteUserModal({ user }) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [deleteUser, { error, data }] = useMutation(DELETE_USER, {
    refetchQueries: () => [{ query: ORDINARY_USERS }],
  });

  const handleDelete = (e) => {
    e.preventDefault();
    deleteUser({ variables: { id: user._id } })
      .then((result) => {
        toggle();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <i
        className="fa fa-trash text-danger"
        style={{ cursor: "pointer" }}
        onClick={toggle}
      />{" "}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-danger" toggle={toggle}>
          Delete user
        </ModalHeader>
        <ModalBody>Are you sure you want to delete user {user.name}</ModalBody>
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
