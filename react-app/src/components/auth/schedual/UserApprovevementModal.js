import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  CREATE_SCHEDULE,
  DELETE_REQUEST_SCHEDULE,
} from "../../../mutations/schedule";
import { SCHEDULES } from "../../../queries/schedules";
import { CREATE_MESSAGE } from "../../../mutations/messages";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import { REQUESTS_BY_USER } from "../../../queries/schedules";

export default function UserApprovementModal({ request }) {
  const { user, patient, date, time } = request;
  console.log("REQUEST", request);
  const [createSchedule, { error }] = useMutation(CREATE_SCHEDULE);
  const [createMessage] = useMutation(CREATE_MESSAGE);
  //      ,{ refetchQueries:()=>[
  //     { query: SCHEDULES}, { variables:{ user:localStorage.getItem("id")} }
  // ] })

  const [deleteRequestSchedule] = useMutation(DELETE_REQUEST_SCHEDULE);
  //     ,{ refetchQueries:()=>[
  //     { query: REQUESTS_BY_USER}, { variables:{id:localStorage.getItem("id")} }
  // ] })

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleRequest = () => {
    console.log("REQU", user._id, patient._id, date, time);
    createSchedule({
      variables: {
        scheduleInput: { user: user._id, patient: patient._id, date, time },
      },
    })
      .then((result) => {
        console.log(result);
        deleteRequestSchedule({ variables: { id: request._id } })
          .then((res) => {
            const day = new Date(date).toLocaleDateString();
            const message = `Your appointment have been approved for a day ${day} at ${time}:00 `;
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
              console.log("Mess", mess);
              toggle();
            });
          })
          .catch((err) => new Error(err));
      })
      .catch((err) => new Error(err));
  };

  return (
    <div>
      <Button color="success" outline onClick={toggle}>
        Accept
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
        <ModalBody>Are you sure you want to accept this request?</ModalBody>
        <ModalFooter>
          <Button color="success" outline onClick={handleRequest}>
            Accept
          </Button>{" "}
          <Button color="danger" outline onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
