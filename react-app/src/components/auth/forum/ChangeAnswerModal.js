import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { CHANGE_ANSWER } from "../../../mutations/answers";
import { QUESTIONS } from "../../../queries/questions";
const ChangeAnswerModal = ({ answ }) => {
  const context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
  });

  console.log("ANSWER", answ.answer);
  const [modal, setModal] = useState(false);
  const [answer, setAnswer] = useState(answ.answer);

  const toggle = () => {
    setModal(!modal);
    setAnswer(answ.answer);
  };

  const [changeAnswer, { error, data }] = useMutation(CHANGE_ANSWER, {
    refetchQueries: () => [{ query: QUESTIONS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    changeAnswer({ variables: { id: answ._id, answer } })
      .then((result) => {
        toggle();
        // setAnswer("")
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button color="info" className="mr-2" outline size="sm" onClick={toggle}>
        Change
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-info" toggle={toggle}>
          Change answer
        </ModalHeader>
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
          <ModalBody>
            <FormGroup>
              <Label>Previous answer: </Label>
              <Input
                type="textarea"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" outline type="submit">
              Change
            </Button>{" "}
            <Button color="danger" outline onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default ChangeAnswerModal;
