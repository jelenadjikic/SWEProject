import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import AuthContext from "../../../context/auth-context";
import { SCHEDULES_BY_DATE } from "../../../queries/schedules";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import PatientApprovementModal from "./PatientApprovementModal";
export default function Scheduler({ date, user, setTime, setDate, setCuser }) {
  console.log("USER", user, "DATE", date);
  const context = useContext(AuthContext);
  console.log("User", user);

  // const [ u, setUser]=useState(user)

  const { loading, error, data } = useQuery(SCHEDULES_BY_DATE, {
    variables: { user, date },
    pollInterval: 500,
  });

  // useEffect( ()=>{
  //     setUser(user)
  // })

  if (loading) return <Spinner color="success" />;
  let scheduler = [];
  if (data) {
    console.log("DATA", data);
    for (let i = 0; i < 8; i++) {
      scheduler[i] = null;
    }

    for (let j = 0; j < data.schedulesByDate.length; j++) {
      //    console.log (data.schedulesByDate[j])
      scheduler[data.schedulesByDate[j].time - 10] = data.schedulesByDate[j];
    }

    // console.log(scheduler)
  }

  const handleClick = (e) => {
    // console.log("1",e, "DATE", date, "USER",user, "PATIENT")
    // let time="1"+e
    // setTime(time)
    // setDate(date)
    // setCuser(user)
  };

  const getStyle = (date) => {
    if (new Date(date).getDay() === 0 || new Date(date).getDay() === 6) {
      return {
        width: "75px",
        height: "75px",
        borderRadius: "15px",
        backgroundColor: "#FF4500",
        opacity: "0.7",
      };
    } else
      return {
        width: "75px",
        height: "75px",
        borderRadius: "15px",
        backgroundColor: "red",
      };
  };

  return (
    <div>
      <div className="d-flex">
        <div
          className="bg-info text-center text-white py-4 border border-light"
          style={{ width: "75px" }}
        >
          {" "}
          {new Date(date).toLocaleDateString()}{" "}
        </div>
        {scheduler &&
          scheduler.map((schedule, i) => {
            // getSchedule(schedule,i)

            return schedule === null &&
              new Date(date).getDay() !== 0 &&
              new Date(date).getDay() !== 6 ? (
              //  <div key={ i } onClick={()=> handleClick(i) }  className="bg-success text-center text-white py-4 border border-light" style={{ width:"75px", height:"75px", cursor:"pointer", borderRadius:"15px" }}>1{i}.00</div>
              <React.Fragment>
                {context.role === "patient" ? (
                  <PatientApprovementModal
                    onClick={() => handleClick(i)}
                    key={i}
                    i={i}
                    date={date}
                    user={user}
                  />
                ) : (
                  <div
                    key={i}
                    className="bg-success text-center text-white py-4 border border-light"
                    style={{
                      width: "75px",
                      height: "75px",
                      borderRadius: "15px",
                    }}
                  >
                    {10 + i}:00
                  </div>
                )}
              </React.Fragment>
            ) : (
              <div
                key={i}
                className=" text-center text-white py-4 border border-light"
                style={getStyle(date)}
              >
                {" "}
                {new Date(date).getDay() === 0 || new Date(date).getDay() === 6
                  ? ""
                  : 10 + i + ":00"}{" "}
              </div>
            );
          })}
      </div>
    </div>
  );
}
