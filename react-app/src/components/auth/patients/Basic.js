import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { checkToken } from "../../../middleware/check-token";
import AuthContext from "../../../context/auth-context";
import { FIND_PATIENT_BY_ID } from "../../../queries/patients";
import ChangePatientModal from "./ChangePatientModal";
import DeletePatientModal from "./DeletePatientModal";
import { Redirect } from "react-router-dom";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Spinner,
} from "reactstrap";

export default function Basic(props) {
  const context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
  });

  if (context.token === "") {
    props.history.push("/");
  }

  const { patient } = props;
  const { loading, error, data } = useQuery(FIND_PATIENT_BY_ID, {
    variables: { id: patient._id },
  });

  // const [ name,setName]=useState(patient.name)
  // const [ city,setCity]=useState(patient.city)
  // const [ address,setAddress]=useState(patient.address)
  // const [ phone,setPhone]=useState(patient.phone)
  // const [ email,setEmail]=useState(patient.email)

  // const setPatient=(p)=>{
  //     setName(p.name)
  //     setCity(p.city)
  //     setAddress(p.address)
  //     setPhone(p.phone)
  //     setEmail(p.email)
  // }

  if (loading) return <Spinner color="success" />;
  const { _id, name, city, address, phone, email } = data.findPatient;
  console.log("DATA PATIENT", data.findPatient);
  return (
    <div>
      <Card body outline color="info" className="mt-5 p-4">
        <CardTitle>
          <span className="font-weight-bold mr-2">Name:</span>
          {name}
        </CardTitle>
        <CardText>
          <span className="font-weight-bold mr-2">City:</span>

          {city}
        </CardText>
        <CardText>
          <span className="font-weight-bold mr-2">Address:</span>
          {address}
        </CardText>
        <CardText>
          <span className="font-weight-bold mr-2">Phone:</span>
          {phone}
        </CardText>
        <CardText>
          <span className="font-weight-bold mr-2">E mail</span>
          {email}
        </CardText>
        <Row>
          <Col sm="4" md="4" xs="4">
            <ChangePatientModal
              id={_id}
              name={name}
              city={city}
              address={address}
              phone={phone}
              email={email}
            />
          </Col>
          <Col sm="4" md="4" xs="4">
            <DeletePatientModal id={_id} name={name} />
          </Col>
        </Row>
      </Card>
    </div>
  );
}
