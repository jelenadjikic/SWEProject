import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { REQUEST_SCHEDULE } from "../../../mutations/schedule";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

export default function PatientApprovementModal(props) {
  console.log("PROPS IN MODAL", props);
  const { i, user, date } = props;
  const [modal, setModal] = useState(false);
  const [requestSchedule, { error }] = useMutation(REQUEST_SCHEDULE);
  const toggle = () => setModal(!modal);

  const getTime = () => {
    // return "1"+i
    return 10 + i;
  };

  const ApproveRequest = () => {
    //  let time="1"+i
    let time = 10 + i;

    requestSchedule({
      variables: {
        scheduleInput: {
          user,
          patient: localStorage.getItem("id"),
          date,
          time,
        },
      },
    })
      .then((result) => {
        console.log("REQUEST", result);
        toggle();
      })
      .catch((err) => new Error(err));
  };

  return (
    <div>
      <div
        className="bg-success text-center text-white py-4 border border-light"
        style={{
          width: "75px",
          height: "75px",
          cursor: "pointer",
          borderRadius: "15px",
        }}
        onClick={toggle}
      >
        {10 + i}:00{" "}
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        {error && (
          <pre>
            {" "}
            {error.graphQLErrors.map(({ message }, i) => (
              <span key={i} className="text-center">
                {" "}
                <Alert className="mx-3" color="danger">
                  {" "}
                  {message}{" "}
                </Alert>{" "}
              </span>
            ))}
          </pre>
        )}
        <ModalHeader toggle={toggle}>New Appointment</ModalHeader>
        <ModalBody>
          Are you sure you want to send request for date {}
          {new Date(date).toLocaleDateString()} at {getTime()} :00?
        </ModalBody>
        <ModalFooter>
          <Button color="success" outline onClick={ApproveRequest}>
            Send
          </Button>{" "}
          <Button color="danger" outline onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
