import React, { useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { checkToken } from "../../../middleware/check-token";
import AuthContext from "../../../context/auth-context";
import { CREATE_SCHEDULE } from "../../../mutations/schedule";
import {
  FormGroup,
  Form,
  Label,
  Input,
  Button,
  Row,
  Col,
  Alert,
} from "reactstrap";
export default function MakeAppointment({ patient, history }) {
  const context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
  });

  if (context.token === "") {
    history.push("/");
  }

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [messages, setMessages] = useState([]);

  const [createSchedule, { error }] = useMutation(CREATE_SCHEDULE);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("DATE AND TIME", date, time);
    createSchedule({
      variables: {
        scheduleInput: {
          user: localStorage.getItem("id"),
          patient: patient._id,
          date,
          time: parseInt(time),
        },
      },
    })
      .then((result) => {
        console.log(result);
        setDate("");
        setTime("");
      })
      .catch((err) => {
        setMessages(err.graphQLErrors);
        console.log(err);
      });
  };

  const handleCancel = () => {
    setDate("");
    setTime("");
    setMessages([]);
  };

  return (
    <div>
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
        <FormGroup>
          <Label>Date</Label>
          <Input
            className="border-info"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </FormGroup>

        <FormGroup>
          <Label>Time </Label>
          <Input
            className="border-info"
            type="select"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          >
            <option></option>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
          </Input>
        </FormGroup>

        <Button className="mt-4" color="success" outline type="submit">
          {" "}
          Make appointment{" "}
        </Button>
        { "   "}
        <Button className="mt-4" color="danger" onClick={handleCancel} outline>
          {" "}
          Cancel{" "}
        </Button>
      </Form>
    </div>
  );
}
