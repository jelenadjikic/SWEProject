import React, { useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  MESSAGES,
  FIND_UNREAD_MESSAGES_BY_USER_AND_PATIENT,
  FIND_UNREAD_MESSAGES_BY_USER,
} from "../../../queries/messages";
import { UPDATE_MESSAGE } from "../../../mutations/messages";
import AuthContext from "../../../context/auth-context";
import {
  Form,
  Input,
  Popover,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import AddUserMessage from "./AddUserMessage";

import { animateScroll } from "react-scroll";

export default function UserPopover({ patient }) {
  useEffect(() => {
    console.log("EFECTED")
    animateScroll.scrollToBottom({
      containerId: "popover",
    });
  });

  const [popoverOpen, setPopoverOpen] = useState(false);
  const { _id, name } = patient;
  const context = useContext(AuthContext);
  const { error, loading, data } = useQuery(MESSAGES, {
    variables: { user: localStorage.getItem("id"), patient: _id },
    pollInterval: 1000,
  });
  const {
    data: messageData,
  } = useQuery(FIND_UNREAD_MESSAGES_BY_USER_AND_PATIENT, {
    variables: { user: localStorage.getItem("id"), patient: _id },
    pollInterval: 1000,
  });
  const [updateMessages] = useMutation(UPDATE_MESSAGE, {
    refetchQueries: () => [
      {
        query: FIND_UNREAD_MESSAGES_BY_USER_AND_PATIENT,
        variables: { user: localStorage.getItem("id"), patient: _id },
      },
      { query: FIND_UNREAD_MESSAGES_BY_USER },
    ],
  });
  // const [ name, setName ]=useState(patient.name)
  if (loading) return "Loading...";
  let messageNumbers = 0;
  if (messageData) {
    messageNumbers = messageData.findUnreadMessagesByUserAndPatient;
    console.log("MESSAGES", messageNumbers);
  }
  const toggle = () => {
    setPopoverOpen(!popoverOpen);
    updateMessages({
      variables: { user: localStorage.getItem("id"), patient: patient._id },
    });
  };
  console.log("Updated");
  // const name=patient.name
  console.log(patient.name);
  console.log("DATA", data);
  // console.log("CONTEXT", context.id)
  return (
    <div>
      <span
        className="font-weight-bold"
        id={"Popover-" + _id}
        style={{ cursor: "pointer" }}
        onClick={toggle}
      >
        {patient.name}
        {messageData && messageNumbers > 0 ? (
          <span style={{ fontSize: "3em", color: "red" }}> . </span>
        ) : (
          ""
        )}
      </span>

      <Popover
        placement="right"
        isOpen={popoverOpen}
        target={"Popover-" + _id}
        toggle={toggle}
        trigger="legacy"
        color="danger"
      >
        <PopoverHeader className="bg-danger text-white">{name}</PopoverHeader>
        <PopoverBody id="popover" className=" text-white popover-content">
          {data.messages.map((message) => {
            console.log("MESSAGE", message);
            return (
              <React.Fragment key={message._id}>
                <ListGroup>
                  <ListGroupItem
                    color={message.sender === "user" ? "success" : "info"}
                  >
                    <p className="font-italic" style={{ fontSize: "0.8em" }}>
                      {" "}
                      {new Date(message.date).toLocaleDateString()}{" "}
                      {new Date(message.date).getHours()}.
                      {new Date(message.date).getMinutes()}.
                      {new Date(message.date).getSeconds()}
                      <span className="mx-1">
                        {message.sender === "user"
                          ? message.user.name
                          : message.patient.name}
                      </span>
                    </p>
                    <p> {message.message} </p>
                    <hr />
                  </ListGroupItem>
                </ListGroup>
              </React.Fragment>
            );
          })}
          <AddUserMessage
            userId={localStorage.getItem("id")}
            patientId={patient._id}
          />
        </PopoverBody>
      </Popover>
    </div>
  );
}
