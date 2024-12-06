import React, { useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CHANGE_PATIENT } from "../../../mutations/patients";
import AuthContext from "../../../context/auth-context";
import { checkToken } from "../../../middleware/check-token";
import {
  Row,
  Col,
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
  DropdownItem,
} from "reactstrap";
import { FIND_PATIENT_BY_ID } from "../../../queries/patients";

export default function ChangePatientModal({
  id,
  name,
  city,
  address,
  phone,
  email,
}) {
  const context = useContext(AuthContext);
  useEffect(() => {
    checkToken(context);
  });
  console.log("ID", id);

  const [newname, setName] = useState(name);
  const [newcity, setCity] = useState(city);
  const [newaddress, setAddress] = useState(address);
  const [newphone, setPhone] = useState(phone);
  const [newemail, setEmail] = useState(email);
  const [modal, setModal] = useState(false);

  const [updatePatinet, { error, data }] = useMutation(CHANGE_PATIENT, {
    refetchQueries: () => [{ query: FIND_PATIENT_BY_ID, variables: { id } }],
  });

  const toggle = () => {
    setModal(!modal);
    setName(name);
    setCity(city);
    setAddress(address);
    setPhone(phone);
    setEmail(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePatinet({
      variables: {
        updatePatientInput: {
          id,
          newname,
          newcity,
          newaddress,
          newphone,
          newemail,
        },
      },
    })
      .then((result) => {
        console.log("UPDATED");
        // setPatient({ name,city,address,phone,email })
        toggle();
        //  handleRefetch()
      })
      .catch((err) => console.log("err"));
  };

  return (
    <div>
      {context.role === "patient" ? (
        <DropdownItem onClick={toggle}>Update your profile</DropdownItem>
      ) : (
        <Button color="info" outline onClick={toggle}>
          Change
        </Button>
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-info" toggle={toggle}>
          {context.role === "user" ? "Change patient data" : "Change your data"}
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
              <Label>Name</Label>
              <Input
                className="border-info"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={newname}
              />
            </FormGroup>
            <FormGroup>
              <Label>City</Label>
              <Input
                className="border-info"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={newcity}
              />
            </FormGroup>
            <FormGroup>
              <Label>Address</Label>
              <Input
                className="border-info"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={newaddress}
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone</Label>
              <Input
                className="border-info"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={newphone}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                className="border-info"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={newemail}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter className="d-flex justify-content-start">
            <Button color="success" outline type="submit">
              Change
            </Button>{" "}
            <Button color="secondary" outline onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}
