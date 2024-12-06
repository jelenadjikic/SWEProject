import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";

import { ADD_USER } from "../../../mutations/users";
import { ORDINARY_USERS } from "../../../queries/users";

import {
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Button,
  Row,
  Col,
} from "reactstrap";
export default function AddUser(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);

  const context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
  });

  const [register, { error }] = useMutation(ADD_USER, {
    refetchQueries: () => [{ query: ORDINARY_USERS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ variables: { userInput: { name, username, password } } })
      .then((result) => {
        setName("");
        setUsername("");
        setPassword("");
        props.history.push("/admin");
      })
      .catch((err) => setMessages(err.graphQLErrors));
  };

  const handleReset = (e) => {
    setName("");
    setUsername("");
    setPassword("");
    setMessages([]);
  };
  return (
    <div className="container">
      <p className="text-center display-4 mt-3 mb-5">Add User</p>
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
        <Row>
          <Col sm="4" xs="12">
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                className="border border-info"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm="4" xs="12">
            <FormGroup>
              <Label>User name</Label>
              <Input
                type="text"
                className="border border-info"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm="4" xs="12">
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                className="border border-info"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="success" outline type="submit">
          Add user
        </Button>{" "}
        {}
        <Button color="secondary" outline onClick={handleReset}>
          Reset
        </Button>
      </Form>
    </div>
  );
}
