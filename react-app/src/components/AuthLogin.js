import React, { useState, useContext } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import {
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  Alert,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Col,
} from "reactstrap";
import { USER_LOGIN } from "../mutations/users";
import { FIND_UNREAD_MESSAGES_BY_ID } from "../queries/messages";
import AuthContext from "../context/auth-context";
export default function (props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { error }] = useMutation(USER_LOGIN);

  const context = useContext(AuthContext);
  const handleSubmit = (e) => {
    console.log(username, password);
    e.preventDefault();
    login({ variables: { loginInput: { username, password } } })
      .then((result) => {
        console.log(result.data);
        localStorage.setItem("id", result.data.login.id);
        localStorage.setItem("token", result.data.login.token);
        localStorage.setItem("role", result.data.login.role);
        localStorage.setItem("name", result.data.login.name);
        localStorage.setItem("tokenExpiration",result.data.login.tokenExpiration);
        context.setName(result.data.login.name);
        context.setRole(result.data.login.role);
        context.setToken(result.data.login.token);
        context.setTokenExpiration(result.data.login.tokenExpiration);
        if (result.data.login.role === "user") {
          props.history.push("/userSchedule");
        } else {
          props.history.push("/admin");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" onChange={ (e)=>setPassword(e.target.value) } />
            </FormGroup>
            <Button type="submit" color="success">login</Button>
            </Form> */}

      <Row>
        <Col sm={{ size: 4, offset: 4 }}>
          <Card className="bg-info">
            <CardBody>
              <div className=" text-center text-white display-3">
                <i className="fa fa-user"></i>
              </div>
              <CardTitle className="text-center display-4 mb-4 text-white">
                Dentist Login
              </CardTitle>
              <CardText>
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
                    <InputGroup className="mb-4 py-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          {" "}
                          <i class="fa fa-user"></i>{" "}
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* <Label>User name</Label> */}
                      <Input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter user name"
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup className="mb-4">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i class="fa fa-key"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* <Label>User name</Label> */}
                      <Input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                      />
                    </InputGroup>
                  </FormGroup>
                  <Button
                    className="text-white"
                    type="submit"
                    color="info"
                    outline
                  >
                    Login
                  </Button>
                </Form>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
