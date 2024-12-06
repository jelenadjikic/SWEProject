import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
import { CREATE_ANSWER } from "../../../mutations/answers";
import { QUESTIONS } from "../../../queries/questions";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
export default function AddAnswer({ id, toggle }) {
  const context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
  });

  const [createAnswer, { error, data }] = useMutation(CREATE_ANSWER, {
    refetchQueries: () => [{ query: QUESTIONS }],
  });

  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createAnswer({
      variables: {
        answerInput: { question: id, user: localStorage.getItem("id"), answer },
      },
    })
      .then((result) => {
        toggle();
        setAnswer("");
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
          <Label>Answer</Label>
          <Input
            type="textarea"
            rows="5"
            cols="20"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            className="mb-3"
          />
          <Button type="submit" color="success" size="sm" outline>
            Submit
          </Button>
          {}
          <Button
            className="ml-3"
            onClick={() => toggle()}
            size="sm"
            outline
            color="danger"
          >
            Cancel
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
}
