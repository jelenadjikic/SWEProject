import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUESTIONS } from "../../../queries/questions";
import {
  Spinner,
  ListGroup,
  Collapse,
  Button,
  CardBody,
  Card,
} from "reactstrap";
import QuestionDetails from "./QuestionDetails";
import AddQuestion from "./AddQuestion";
import AuthContext from "../../../context/auth-context";
export default function Forum() {
  const context = useContext(AuthContext);
  const { err, loading, data } = useQuery(QUESTIONS, {
    fetchPolicy: "network-only",
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  if (loading) return <Spinner color="success" />;
  if (data) {
    console.log(data);
  }

  return (
    <div className="container">
      <h1>Forum</h1>
      {context.role !== "user" && (
        <React.Fragment>
          <p>
            Ask our dentists any question and they will answer you as soon as
            possible
          </p>
          <Button
            color="info"
            outline
            onClick={toggle}
            style={{ marginBottom: "1rem" }}
          >
            {!isOpen ? "Ask" : "Close"}
          </Button>
        </React.Fragment>
      )}

      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <AddQuestion toggle={toggle} />
          </CardBody>
        </Card>
      </Collapse>

      <ListGroup>
        {data.questions.map((question) => {
          return <QuestionDetails question={question} key={question._id} />;
        })}
      </ListGroup>
    </div>
  );
}
