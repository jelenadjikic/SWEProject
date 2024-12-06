import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_QUESTION } from "../../../mutations/questions";
import { QUESTIONS } from "../../../queries/questions";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
export default function AddQuestion(props) {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");

  const [createQuestion, { error, data }] = useMutation(CREATE_QUESTION, {
    refetchQueries: () => [{ query: QUESTIONS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createQuestion({ variables: { questionInput: { name, question } } })
      .then((result) => {
        setName("");
        setQuestion("");
        props.toggle();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
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
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </FormGroup>
        <FormGroup>
          <Label>Question</Label>
          <Input
            type="textarea"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
          />
        </FormGroup>
        <Button type="submit" color="success" outline>
          Submit
        </Button>
      </Form>
    </div>
  );
}
