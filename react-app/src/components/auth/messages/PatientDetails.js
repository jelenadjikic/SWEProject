import React, { useState } from "react";

import { ListGroupItem } from "reactstrap";
import UserPopover from "./UserPopover";

import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
export default function PatientDetails({ patient }) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <ListGroupItem size="sm" color="success">
        <UserPopover patient={patient} key={patient._id} />
        {/* <span className="font-weight-bold" style={{ cursor:"pointer" }} id={ patient.email }  > { patient.name} </span>      */}
      </ListGroupItem>
    </div>
  );
}
