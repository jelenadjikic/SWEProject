import React from "react";
import {Row,Col} from 'reactstrap'
import LightboxExample from "./LightboxExample";
import LightboxExample1 from "./LightboxExample1";
import LightboxExample2 from "./LightboxExample2";

export default function Gallery() {
  return (
    <div>
      <Row>
        <Col md="4" sm="4" xs="12">
          <div className="text-center">
          <LightboxExample />
          </div>
        </Col>
        <Col md="4" sm="4" xs="12">
          <div className="text-center">
          <LightboxExample1 />
          </div>
        </Col>
        <Col md="4" sm="4" xs="12">
          <div className="text-center">
          <LightboxExample2 />
          </div>
        </Col>
      </Row>
    </div>
  );
}
