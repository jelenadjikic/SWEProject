import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import SetCarton from "./SetCarton";
import Interventions from "./Interventions";
import ChangePatientModal from "./ChangePatientModal";
import Basic from "./Basic";
import CartonLegend from "./CartonLegend";
import CartonDetails from "./CartonDetails";
import UserStaticSchedule from "../schedual/UserStaticSchedule";
import MakeAppointment from "../schedual/MakeAppointment";

export default function Records(props) {
  const context = useContext(AuthContext);
  console.log("PROPS IN RECORDS", props);
  useEffect(() => {
    checkToken(context);
    //console.log("ADD USER")
  });
  const [activeTab, setActiveTab] = useState("1");
  let history = useHistory();

  if (context.token === "") {
    history.push("/");
  }

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { patient } = props.location;

  if (!patient) {
    history.push("/");
  }

  //  console.log(patient.carton._id)
  const [carton, changeCarton] = useState(patient.carton);

  //  const [ patient,setPatient]=useState(props.location.patient)

  return (
    <div>
      <h2 className="text-center my-4" style={{ fontWeight: "300" }}>
        Patient: {patient.name}
      </h2>
      {/* <div className="d-flex justify-content-center">
             <h4 className="bg-secondary text-white py-1 px-3" > { patient.name }</h4> 
            </div> */}
      {/* <h4 className="text-info text-center mx-auto">{ patient.name}</h4> */}
      <Nav tabs className="d-flex justify-content-center">
        <NavItem>
          <NavLink
            className="bg-info text-white "
            onClick={() => {
              toggle("1");
            }}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            Basics
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="bg-info text-white"
            onClick={() => {
              toggle("2");
            }}
            style={{ cursor: "pointer" }}
          >
            Interventions
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="bg-info text-white"
            onClick={() => {
              toggle("3");
            }}
            style={{ cursor: "pointer" }}
          >
            Carton
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="bg-info text-white"
            onClick={() => {
              toggle("4");
            }}
            style={{ cursor: "pointer" }}
          >
            Shedule
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm={{ size: 4, offset: 4 }} md={{ size: 4, offset: 4 }}>
              <Basic patient={patient} history={props.history} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Interventions patient={patient} history={props.history} />
        </TabPane>
        <TabPane tabId="3" className="container">
          <Row>
            <Col sm="12">
              <Card body>
                <CartonLegend />

                <CardText>
                  <CartonDetails carton={carton} history={props.history} />
                </CardText>
              </Card>
            </Col>
          </Row>
          <SetCarton
            carton={carton}
            changeCarton={(carton) => changeCarton(carton)}
          />
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col sm={{ size: 4, offset: 4 }} sm={{ size: 4, offset: 4 }}>
              <Card body>
                <p className="text-center">Make appointment</p>
                <MakeAppointment patient={patient} history={props.history} />
              </Card>
            </Col>
          </Row>

          <Row>
            {/* <Col sm={{ size: 8, offset: 2 }} sm={{ size: 8, offset: 2 }}>
              <Card body>
                <UserStaticSchedule />
              </Card>
            </Col> */}
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}
