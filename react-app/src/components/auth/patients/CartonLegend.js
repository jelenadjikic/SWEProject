import React from "react";
import { Row, Col } from "reactstrap";
export default function CartonLegend() {
  return (
    <div>
      <Row>
        <Col sm={{ size: 6, offset: "3" }} md={{ size: 6, offset: "3" }}>
          <div className="border border-info p-2 mb-3">
            <p className="text-center font-weight-bold  p-3">Legend</p>
            <Row>
              <Col sm="2" md="2">
                <div>
                  <div
                    className="d-inline-block ml-4 text-center   text-white font-weight-bold rounded-circle "
                    style={{
                      background: "green",
                      paddingTop: "2px",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    &nbsp;
                  </div>
                  <p style={{ fontSize: "0.9em", textAlign: "center" }}>
                    Healthy
                  </p>
                </div>
              </Col>
              <Col sm="2" md="2">
                <div>
                  <div
                    className="d-inline-block ml-4  text-center text-white font-weight-bold rounded-circle "
                    style={{
                      background: "olive",
                      paddingTop: "2px",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    &nbsp;
                  </div>
                  <p style={{ fontSize: "0.9em", textAlign: "center" }}>
                    Medicine
                  </p>
                </div>
              </Col>
              <Col sm="2" md="2">
                <div>
                  <div
                    className="d-inline-block ml-4  text-center text-white font-weight-bold rounded-circle "
                    style={{
                      background: "red",
                      paddingTop: "2px",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    &nbsp;
                  </div>
                  <p style={{ fontSize: "0.9em", textAlign: "center" }}>
                    Caries
                  </p>
                </div>
              </Col>
              <Col sm="2" md="2">
                <div>
                  <div
                    className="d-inline-block ml-4  text-center text-white font-weight-bold rounded-circle "
                    style={{
                      background: "black",
                      paddingTop: "2px",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    &nbsp;
                  </div>
                  <p style={{ fontSize: "0.9em", textAlign: "center" }}>
                    Missing
                  </p>
                </div>
              </Col>
              <Col sm="2" md="2">
                <div>
                  <div
                    className="d-inline-block ml-4  text-center text-white font-weight-bold rounded-circle "
                    style={{
                      background: "brown",
                      paddingTop: "2px",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    &nbsp;
                  </div>
                  <p style={{ fontSize: "0.9em", textAlign: "center" }}>
                    Plomb
                  </p>
                </div>
              </Col>
              <Col sm="2" md="2">
                <div>
                  <div
                    className="d-inline-block ml-4  text-center text-white font-weight-bold rounded-circle "
                    style={{
                      background: "purple",
                      paddingTop: "2px",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    &nbsp;
                  </div>
                  <p style={{ fontSize: "0.9em", textAlign: "center" }}>
                    Bridge
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}
