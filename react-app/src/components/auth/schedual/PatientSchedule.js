import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { checkToken } from "../../../middleware/check-token";
import { ORDINARY_USERS } from "../../../queries/users";
import { REQUEST_SCHEDULE } from "../../../mutations/schedule";
import AuthContext from "../../../context/auth-context";
import { FormGroup, Form, Label, Input, Button, Row, Col } from "reactstrap";
import Scheduler from "./Scheduler";
// import { REQUESTS_BY_USER } from '../../../queries/schedules'

export default function PatientSchedule() {
  const context = useContext(AuthContext);
  useEffect(() => {
    checkToken(context);
  });
  const [user, setUser] = useState("");

  const [cuser, setCuser] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const { loading, data } = useQuery(ORDINARY_USERS);

  // const [ requestSchedule, { error} ]=useMutation(REQUEST_SCHEDULE,{ refetchQueries:()=>[
  //     { query: REQUESTS_BY_USER }
  // ] })

  if (loading) return "loading...";

  const getDates = () => {
    let dates = [];
    for (let i = 0; i < 30; i++) {
      let d = new Date();
      let x = d.setDate(d.getDate() + i);
      dates[i] = new Date(x).toISOString().substr(0, 10);
    }
    return dates;
  };

  return (
    <div className="container">
      <h1>Schedule</h1>

      <Row>
        <Col sm="4" md="4" xs="4">
          <Label className="mr-3">Choose dentist</Label>
          <Input
            type="select"
            className="border-info"
            onChange={(e) => setUser(e.target.value)}
            value={user._id}
          >
            <option></option>
            {data &&
              data.ordinaryUsers.map((user) => {
                return (
                  <option key={user._id} value={user._id}>
                    {" "}
                    {user.name}{" "}
                  </option>
                );
              })}
          </Input>
          <p className="mt-3">
            Then, choose free date and time and accept your choice
          </p>
          <p>
            <span className="text-danger font-weight-bold display-5">
              {" "}
              CAUTION:{" "}
            </span>
            You can choose date and time only once per day
          </p>
          <h3 className="text-center">Legend</h3>
          <div className="d-flex mb-4">
            <div
              className=" text-center text-white py-4 border border-light"
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "15px",
                backgroundColor: "#FF4500",
                opacity: "0.7",
              }}
            ></div>
            <p className="ml-5 mt-4" style={{ fontSize: "1.2em" }}>
              Weekend
            </p>
          </div>
          <div className="d-flex mb-4">
            <div
              className=" text-center text-white py-4 border border-light"
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "15px",
                backgroundColor: "red",
                opacity: "0.7",
              }}
            ></div>
            <p className="ml-5 mt-4" style={{ fontSize: "1.2em" }}>
              Taken
            </p>
          </div>
          <div className="d-flex mb-4">
            <div
              className=" text-center text-white py-4 border border-light"
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "15px",
                backgroundColor: "green",
                opacity: "0.7",
              }}
            ></div>
            <p className="ml-5 mt-4" style={{ fontSize: "1.2em" }}>
              Free
            </p>
          </div>
        </Col>
        <Col sm="8" md="8" xs="12">
          <div style={{ height: "500px", overflow: "scroll" }}>
            {getDates().map((date, i) => {
              if (user === "") return null;
              return (
                <Scheduler
                  setDate={setDate}
                  setTime={setTime}
                  setCuser={setCuser}
                  user={user}
                  date={date}
                  key={i}
                />
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
}
