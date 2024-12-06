import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER } from "../../../mutations/users";
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

export default function UpdateUserModal({ user }) {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [messages, setMessages] = useState([]);

  const [modal, setModal] = useState(false);

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const toggle = () => {
    setModal(!modal);
    setName(user.name);
    setUsername(user.username);
    setMessages([]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ variables: { id: user._id, name, username } })
      .then((result) => {
        toggle();
      })
      .catch((err) => setMessages(err.graphQLErrors));
  };

  return (
    <div>
      <i
        className="fa fa-pencil color-primary"
        style={{ cursor: "pointer" }}
        onClick={toggle}
      />

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-info" toggle={toggle}>
          Change user
        </ModalHeader>
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
          <ModalBody>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                className="border border-info"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                className="border border-info"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="info" outline type="submit">
              Change
            </Button>{" "}
            <Button color="secondary" outline onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}
