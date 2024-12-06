import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth-context";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { LOGIN_PATIENT } from "../../mutations/patients";
import { FIND_UNREAD_MESSAGES_BY_USER } from "../../queries/messages";
import { FIND_PATIENT_BY_ID } from "../../queries/patients";
import { useHistory, Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
  Form,
  Badge,
  Spinner,
  Row,
  Col,
} from "reactstrap";
import AuthLogin from "../AuthLogin";
import Reservation from "../auth/schedual/ReservationModal";
import ChangePatientModal from "../auth/patients/ChangePatientModal";

export default function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(AuthContext);

  const { loading, data: messagesData } = useQuery(
    FIND_UNREAD_MESSAGES_BY_USER,
    { variables: { id: localStorage.getItem("id") }, pollInterval: 1000 }
  );
  const { data: patientData } = useQuery(FIND_PATIENT_BY_ID, {
    variables: { id: localStorage.getItem("id") },
  });
  let number = 0;
  if (messagesData) {
    number = messagesData.findUnreadMessagesByUser;
  }

  if (patientData) {
    console.log("PATIENT DATA", patientData);
  }

  const history = useHistory();
  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    context.logout();

    history.push("/");
  };



  return (
    <div>
      {}
      <Row>
        <Col sm="2" xs="12">
          <img src="logo.png" width="100" height="100" />
        </Col>
        <Col sm={{ size: "2", offset: "3" }} xs="12" className="mt-4">
          <p className="text-info">
            {" "}
            <i class="fa fa-envelope"></i> office@jat-dentist.rs
          </p>
          <p className="text-info">
            {" "}
            <i class="fa fa-phone"></i> 018/555-555
          </p>
        </Col>
        {!context.token && (
          <Col sm={{ size: "2", offset: "3" }} xs="12" className="mt-5">
            <Button
              className="mr-2"
              color="info"
              outline
              size="sm"
              tag={Link}
              to="/login"
            >
              Login
            </Button>

            <Button color="info" outline size="sm" tag={Link} to="/signup">
              Sign up
            </Button>
          </Col>
        )}
      </Row>

      <Navbar color="info" dark expand="md" className="py-2 mb-4">
        <NavbarBrand tag={Link} to="/">
          <h2
            className="text-white  text-center"
            style={{ fontFamily: "Dancing script, cursive" }}
          >
            JAT dentist
          </h2>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {context.role === "admin" && (
              <React.Fragment>
                <NavItem>
                  <NavLink tag={Link} to="/adduser">
                    Add user
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/admin">
                    Users
                  </NavLink>
                </NavItem>
              </React.Fragment>
            )}
            { context.role!=="admin" &&
           <React.Fragment>
         <NavItem>
           <NavLink tag={ Link} to="/">Home</NavLink>
         </NavItem>
         <NavItem>
           <NavLink tag={ Link} to="/about">About us</NavLink>
         </NavItem>
         <NavItem>
           <NavLink tag={ Link} to="/ourteam">Our team</NavLink>
         </NavItem>
         <NavItem>
           <NavLink tag={ Link} to="/gallery">Gallery</NavLink>
         </NavItem>
           <NavItem>
          <NavLink tag={ Link} to="/forum">Forum</NavLink>
          </NavItem>      
         </React.Fragment>
           }

            {context.role === "user" && (
              <React.Fragment>
                <NavItem>
                  <NavLink tag={Link} to="/addPatient">
                    New patient
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/patients">
                    Patients
                  </NavLink>
                </NavItem>
              </React.Fragment>
            )}
            

            {(context.role === "user" || context.role === "patient") && (
              <NavItem>
                <NavLink tag={Link} to="/messages">
                  Messages
                  {context.role === "user" && number !== 0 && (
                    <Badge color="secondary">{number}</Badge>
                  )}
                </NavLink>
              </NavItem>
            )}

            {context.role === "patient" && (
              <React.Fragment>
                <NavItem>
                  <NavLink tag={Link} to="patientSchedule">
                    Schedule
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={Link} to="/carton">
                    My carton
                  </NavLink>
                </NavItem>
              </React.Fragment>
            )}

            {context.role === "user" && (
              <React.Fragment>
                <NavItem>
                  <NavLink tag={Link} to="userSchedule">
                    Schedule
                  </NavLink>
                </NavItem>
                <NavItem>
                  <Reservation />
                  {/* <NavLink tag={ Link} to="reservation">Reservation</NavLink> */}
                </NavItem>
              </React.Fragment>
            )}

            {!context.token ? null : (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {context.name}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={Link} to="/changeUserPassword">
                    Change password
                  </DropdownItem>
                  {context.role === "patient" && patientData && (
                    //  <DropdownItem tag={ Link} to="/changeUserPassword" >
                    //   Update data
                    //  </DropdownItem>
                    <ChangePatientModal
                      id={patientData.findPatient._id}
                      name={patientData.findPatient.name}
                      city={patientData.findPatient.city}
                      address={patientData.findPatient.address}
                      phone={patientData.findPatient.phone}
                      email={patientData.findPatient.email}
                    />
                  )}
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
          {/* <NavbarText>{ context.name }</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
}
