import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_REQUEST_SCHEDULE } from "../../../mutations/schedule";
import { CREATE_MESSAGE } from "../../../mutations/messages";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

export default function UserDenialModal({ request }) {
  const { user, patient, date, time } = request;
  console.log("REQUEST", request);
  const [createMessage] = useMutation(CREATE_MESSAGE);
  //      ,{ refetchQueries:()=>[
  //     { query: SCHEDULES}, { variables:{ user:localStorage.getItem("id")} }
  // ] })

  const [deleteRequestSchedule, { error }] = useMutation(
    DELETE_REQUEST_SCHEDULE
  );
  //     ,{ refetchQueries:()=>[
  //     { query: REQUESTS_BY_USER}, { variables:{id:localStorage.getItem("id")} }
  // ] })

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleRequest = () => {
    console.log("REQU", user._id, patient._id, date, time);

    deleteRequestSchedule({ variables: { id: request._id } })
      .then((res) => {
        const day = new Date(date).toLocaleDateString();
        const message = `Your appointment have not been accepted for a day ${day} at ${time}:00 `;
        createMessage({
          variables: {
            messageInput: {
              user: user._id,
              patient: patient._id,
              message,
              sender: "user",
              read: true,
            },
          },
        }).then((mess) => {
          console.log(mess);
          toggle();
        });
      })
      .catch((err) => new Error(err));
  };

  return (
    <div>
      <Button color="danger" outline onClick={toggle}>
        Deny
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
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
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>Are you sure you want to deny this request?</ModalBody>
        <ModalFooter>
          <Button color="danger" outline onClick={handleRequest}>
            Deny
          </Button>{" "}
          <Button color="info" outline onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
