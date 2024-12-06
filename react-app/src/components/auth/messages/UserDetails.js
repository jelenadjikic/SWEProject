import React, { useState } from "react";

import { ListGroupItem } from "reactstrap";
import PatientPopover from "./PatientPopover";

export default function UserDetails({ user }) {
  return (
    <div>
      <ListGroupItem size="sm" color="success">
        <PatientPopover user={user} />
        {/* <span className="font-weight-bold" style={{ cursor:"pointer" }} id={ patient.email }  > { patient.name} </span>      */}
      </ListGroupItem>
    </div>
  );
}
