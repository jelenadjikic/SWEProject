import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { MESSAGES } from "../../../queries/messages";
import AuthContext from "../../../context/auth-context";
import { animateScroll } from "react-scroll";
import {
  Form,
  Input,
  Popover,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import AddPatientMessage from "./AddPatientMessage";

export default function PatientPopover({ user }) {
  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: "popover",
    });
  });

  const [popoverOpen, setPopoverOpen] = useState(false);
  const { _id, name } = user;
  const context = useContext(AuthContext);
  const { error, loading, data } = useQuery(MESSAGES, {
    variables: { user: _id, patient: localStorage.getItem("id") },
    pollInterval: 1000,
  });
  // const [ name, setName ]=useState(patient.name)
  if (loading) return "Loading...";
  const toggle = () => setPopoverOpen(!popoverOpen);
  // const name=patient.name
  // console.log("CONTEXT", context.id)
  return (
    <div>
      <span
        className="font-weight-bold"
        id={"Popover-" + _id}
        style={{ cursor: "pointer" }}
        onClick={toggle}
      >
        {user.name}
      </span>

      <Popover
      className="mx-5"
        placement="right"
        isOpen={popoverOpen}
        target={"Popover-" + _id}
        toggle={toggle}
        trigger="legacy"
        color="danger"
      >
        <PopoverHeader className="bg-danger text-white ">{name}</PopoverHeader>
        <PopoverBody id="popover" className="text-white popover-content">
          {data.messages.map((message) => {
            console.log("MESSAGE", message);
            return (
              <React.Fragment>
                <ListGroup>
                  <ListGroupItem
                    color={message.sender === "user" ? "success" : "info"}
                  >
                    <p className="font-italic" style={{ fontSize: "0.8em" }}>
                      {" "}
                      {new Date(message.date).toLocaleDateString()}{" "}
                      {new Date(message.date).getHours()}:
                      {new Date(message.date).getMinutes()}
                      <span className="mx-1">
                        {message.sender === "user"
                          ? message.user.name
                          : message.patient.name}
                      </span>{" "}
                    </p>
                    <p> {message.message} </p>
                    <hr />
                  </ListGroupItem>
                </ListGroup>
              </React.Fragment>
            );
          })}
          <AddPatientMessage
            userId={user._id}
            patientId={localStorage.getItem("id")}
          />
        </PopoverBody>
      </Popover>
    </div>
  );
}
