import React, { useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";

import { CHANGE_PASSWORD } from "../../../mutations/users";
import { CHANGE_PATIENT_PASSWORD } from "../../../mutations/patients";
import { Link } from "react-router-dom";
import context from "../../../context/auth-context";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Row,
  Col,
} from "reactstrap";
export default function ChangeUserPassword(props) {
  let context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
  });

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [messages, setMessages] = useState([]);

  const [changePassword, { error: userError, data }] = useMutation(
    CHANGE_PASSWORD
  );
  const [changePatientPassword, { error: patientError, dataP }] = useMutation(
    CHANGE_PATIENT_PASSWORD
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Context", AuthContext.role);
    if (context.role === "patient") {
      changePatientPassword({
        variables: {
          id: localStorage.getItem("id"),
          password,
          newPassword,
          confirmation,
        },
      })
        .then((result) => {
          console.log("RESULT", result);
          setPassword("");
          setNewPassword("");
          setConfirmation("");
          setMessages([]);
          //   props.history.push("/")
        })
        .catch((err) => setMessages(err.graphQLErrors));
    } else {
      changePassword({
        variables: {
          id: localStorage.getItem("id"),
          password,
          newPassword,
          confirmation,
        },
      })
        .then((result) => {
          console.log("RESULT", result);
          setPassword("");
          setNewPassword("");
          setConfirmation("");
          setMessages([]);
          //   props.history.push("/")
        })
        .catch((err) => setMessages(err.graphQLErrors));
    }
  };

  return (
    <div className="container">
      <p className="text-center display-4 mt-3 mb-4">Change password</p>
      {data && <Alert color="success"> Password successfully changed </Alert>}
      {userError && (
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
      {patientError && (
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
              <Label>Password</Label>
              <Input
                className="border border-primary"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </FormGroup>
          </Col>
          <Col sm="4" xs="12">
            <FormGroup>
              <Label>New Password</Label>
              <Input
                className="border border-primary"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </FormGroup>
          </Col>
          <Col sm="4" xs="12">
            <FormGroup>
              <Label> Confirm New Password</Label>
              <Input
                className="border border-primary"
                type="password"
                onChange={(e) => setConfirmation(e.target.value)}
                value={confirmation}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" color="info" outline>
          Change
        </Button>
        <Button tag={Link} to="/admin" color="secondary" outline>
          Cancel
        </Button>
      </Form>
    </div>
  );
}
