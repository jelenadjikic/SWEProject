import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavLink,
  Spinner,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from "reactstrap";
import { checkToken } from "../../../middleware/check-token";
import AuthContext from "../../../context/auth-context";

import Reservation from "./Reservation";
export default function ReservationModal() {
  const context = useContext(AuthContext);
  useEffect(() => {
    checkToken(context);
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  //   const { loading,error, data}=useQuery(SCHEDULES, { variables:{ id:localStorage.getItem("id")} } )

  //   if (loading) return <Spinner color="success" />
  //     console.log("Loading",loading)
  //     if (data) {
  //         console.log(data)
  //     }
  return (
    <div>
      <NavLink onClick={toggle} style={{ cursor: "pointer" }}>
        Reservation
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {" "}
          <p className="text-center text-success display-4">
            {" "}
            Reservation{" "}
          </p>{" "}
        </ModalHeader>

        <ModalBody>
          <Reservation />
        </ModalBody>
      </Modal>
    </div>
  );
}
