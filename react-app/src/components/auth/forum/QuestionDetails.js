import React, { useState, useContext } from "react";
import AuthContext from "../../../context/auth-context";
import AddAnswer from "./AddAnswer";
import { ListGroupItem, Collapse, Card, CardBody, Button } from "reactstrap";
import AnswerDetails from "./AnswerDetails";
import DeleteQuestionModal from "./DeleteQuestionModal";
export default function QuestionDetails({ question }) {
  const context = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="mb-5">
      <ListGroupItem color="success">
        <p className="font-italic" style={{ fontSize: "0.8em" }}>
          {" "}
          {new Date(question.questionDate).getHours()}:
          {new Date(question.questionDate).getMinutes()}{" "}
          {new Date(question.questionDate).toLocaleDateString()}{" "}
          <span className="font-weight-bold"> {question.name} </span>{" "}
        </p>
        {/* <p className="font-weight-bold"> {question.name}</p> */}
        {question.question}
        {context.role === "user" && (
          <React.Fragment>
            <div className="d-flex mt-3">
              <Button
                size="sm"
                className="mr-2"
                color="success"
                outline
                onClick={toggle}
                style={{ marginBottom: "1rem" }}
              >
                Answer
              </Button>
              <DeleteQuestionModal id={question._id} />
            </div>

            <Collapse isOpen={isOpen}>
              <Card>
                <CardBody>
                  <AddAnswer id={question._id} toggle={toggle} /> {}
                </CardBody>
              </Card>
            </Collapse>
          </React.Fragment>
        )}
      </ListGroupItem>
      {question.answers.length === 0 ? (
        <ListGroupItem color="info">
          Someone of our dentists will be answering soon
        </ListGroupItem>
      ) : (
        question.answers.map((answer) => {
          return <AnswerDetails answer={answer} key={answer._id} />;
        })
      )}
    </div>
  );
}
