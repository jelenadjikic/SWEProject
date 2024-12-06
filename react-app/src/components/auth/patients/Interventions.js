import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { checkToken } from "../../../middleware/check-token";
import AuthContext from "../../../context/auth-context";
import { INTERVENTONS_BY_PATIENT } from "../../../queries/interventions";
import InterventionDetail from "./InterventionDetail";

import {
  Spinner,
  Row,
  Col,
  CardGroup,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardText,
  Card,
  Button,
  Collapse,
} from "reactstrap";
import AddIntervention from "./AddIntervention";

export default function Interventions(props) {
  const context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
  });

  if (context.token === "") {
    props.history.push("/");
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const id = props.patient._id;
  console.log("PATIENT", props.patient._id);
  const { error, loading, data, refetch } = useQuery(
    INTERVENTONS_BY_PATIENT,
    { variables: { id } },
    { errorPolicy: "all" }
  );

  console.log("INTERVENTIONS", data);

  const forceUpdateComp = () => {
    console.log("UPDDDDDD");
    refetch();
  };

  if (loading) return <Spinner color="success" />;

  //    setInterventions(data.interventions)

  return (
    <div>
      <h2 className="display-5 text-center"> Interventions </h2>
      <Button
        color="info"
        outline
        onClick={toggle}
        style={{ marginBottom: "1rem" }}
      >
        {!isOpen ? "New intervention" : "Close"}
      </Button>
      <Collapse isOpen={isOpen}>
        <AddIntervention
          id={props.patient._id}
          forceUpdateComp={forceUpdateComp}
          toggle={toggle}
        />
      </Collapse>

      <Row>
        {data.interventions.map((intervention) => {
          return (
            <InterventionDetail
              intervention={intervention}
              id={props.patient._id}
              key={intervention._id}
            />
          );
        })}
      </Row>

      {/* </Col>
         
          </Row> */}
    </div>
  );
}
