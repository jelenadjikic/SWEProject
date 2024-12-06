import React, { useState } from "react";
import {
  Row,
  Col,
  Collapse,
  Button,
  CardBody,
  Card,
  Input,
  Form,
  FormGroup,
  Label,
  Alert,
} from "reactstrap";
import { useMutation } from "@apollo/react-hooks";
import { SET_CARTON } from "../../../mutations/carton";
import { FIND_PATIENTS } from "../../../queries/patients";

export default function SetCarton(props) {
  //const { carton }=props
  const [isOpen, setIsOpen] = useState(false);
  const [jaw, setJaw] = useState("");
  const [tooth, setTooth] = useState("");
  const [condition, setCondition] = useState("");
  const [carton, changeCarton] = useState(props.carton);
  const [setCarton, { error, data }] = useMutation(SET_CARTON, {
    refetchQueries: () => [{ query: FIND_PATIENTS }],
  });

  let number;
  const toggle = () => setIsOpen(!isOpen);
  const handleSubmit = (e) => {
    // console.log("PATIENTNAME", patient.name)
    e.preventDefault();
    console.log(jaw);
    switch (jaw) {
      case "upperLeft":
        number = tooth - 1;
        break;

      case "upperRight":
        number = tooth - 1 + 8;
        break;

      case "downLeft":
        number = tooth - 1 + 16;
        break;

      case "downRight":
        number = tooth - 1 + 24;
        break;

      default:
        number = 0;
    }

    setCarton({ variables: { id: carton._id, number, value: condition } })
      .then((result) => {
        console.log("RESULT", result.data.setCarton);
        setJaw("");
        setTooth("");
        setCondition("");
        changeCarton(result.data.setCarton);
        props.changeCarton(result.data.setCarton);
      })
      .catch((err) => {
        console.log(err);
        console.log("TOOTH", tooth, number, condition);
      });
    //  console.log("Number",number)
  };
  return (
    <div>
      <div className="text-center mt-4">
        <Button
          color="info"
          outline
          onClick={toggle}
          className="center-block"
          style={{ marginBottom: "1rem" }}
        >
          {!isOpen ? "Set Carton" : "Close"}
        </Button>
      </div>

      <Collapse isOpen={isOpen}>
        <Card>
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
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm="2" md="2">
                  <FormGroup>
                    <Label>Choose jaw</Label>
                    <Input
                      className="border border-info rounded"
                      type="select"
                      onChange={(e) => setJaw(e.target.value)}
                      value={jaw}
                    >
                      <option></option>
                      <option value="upperLeft">Upper Left</option>
                      <option value="upperRight">Upper Right</option>
                      <option value="downLeft">Down Left</option>
                      <option value="downRight">Down Right</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col sm="2" md="2">
                  <FormGroup>
                    <Label>Choose tooth</Label>
                    <Input
                      className="border border-info rounded"
                      type="select"
                      onChange={(e) => setTooth(e.target.value)}
                      value={tooth}
                    >
                      <option></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col sm="2" md="2">
                  <FormGroup>
                    <Label>Condition</Label>
                    <Input
                      className="border border-info rounded"
                      type="select"
                      onChange={(e) => setCondition(e.target.value)}
                      value={condition}
                    >
                      <option></option>
                      <option value="healthy">helthy</option>
                      <option value="medicine">medicine</option>
                      <option value="missing">missing</option>
                      <option value="plomb">plomb</option>
                      <option value="caries">caries</option>
                      <option value="bridge">bridge</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col sm="1" md="1">
                  <Button
                    style={{ marginTop: "2em" }}
                    type="submit"
                    color="info"
                    outline
                  >
                    Set
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}
