import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_MESSAGE } from "../../../mutations/messages";
import { MESSAGES } from "../../../queries/messages";
export default function AddUserMessage({ userId, patientId }) {
  const [message, setMessage] = useState("");
  const [createMessage, { error, data }] = useMutation(CREATE_MESSAGE);

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
          sender: "user",
          read: true,
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
