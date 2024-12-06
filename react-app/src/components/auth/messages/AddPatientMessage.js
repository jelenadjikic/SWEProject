import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_MESSAGE } from "../../../mutations/messages";
import { FIND_UNREAD_MESSAGES_BY_USER } from "../../../queries/messages";
export default function AddPatientMessage({ userId, patientId }) {
  const [message, setMessage] = useState("");
  const [createMessage, { error, data }] = useMutation(CREATE_MESSAGE, {
    refetchQueries: () => [
      {
        query: FIND_UNREAD_MESSAGES_BY_USER,
        variables: { user: userId, patient: patientId },
      },
    ],
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMessage({
      variables: {
        messageInput: {
          user: userId,
          patient: patientId,
          message,
          sender: "patient",
          read: false,
        },
      },
    })
      .then((result) => {
        setMessage("");
      })
      .catch((err) => {
        setMessage("");
      });
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input
          className="border-info"
          type="textarea"
          onKeyDown={handleKeyDown}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button hidden type="submit"></Button>
      </Form>
    </div>
  );
}
