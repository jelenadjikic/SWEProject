import React, { useContext, useEffect } from "react";
import { checkToken } from "../../../middleware/check-token";
import AuthContext from "../../../context/auth-context";
import { Row, Col } from "reactstrap";
export default function CartonDetails({ carton, history }) {
  const context = useContext(AuthContext);

  useEffect(() => {
    checkToken(context);
  });

  if (context.token === "") {
    history.push("/");
  }

  const getStyle = (val) => {
    switch (val) {
      case "healthy":
        return "green";
      case "caries":
        return "red";
      case "missing":
        return "black";
      case "plomb":
        return "brown";
      case "medicine":
        return "olive";
      case "bridge":
        return "purple ";
      default:
        return "black";
    }
  };
  return (
    <div>
      <Row>
        <Col sm="6" md="6">
          <p className="text-center font-weight-bold">Up Left</p>
          <div className="d-flex justify-content-center">
            {carton.teeth
              .slice(0, 8)
              .reverse()
              .map((tooth, index) => {
                return (
                  <div
                    className="d-inline-block mx-2  text-center text-white font-weight-bold rounded-circle "
                    style={{
                      background: getStyle(tooth),
                      paddingTop: "2px",
                      width: "30px",
                      height: "30px",
                    }}
                    key={index}
                  >
                    {/* &nbsp; */}
                    {Math.abs(index - 8)}
                  </div>
                );
              })}
          </div>
        </Col>

        <Col sm="6" md="6">
          <p className="text-center font-weight-bold">Up Right</p>
          <div className="d-flex justify-content-center">
            {carton.teeth.slice(8, 16).map((tooth, index) => {
              return (
                <div
                  className="d-inline-block mx-2  text-center text-white font-weight-bold rounded-circle "
                  style={{
                    background: getStyle(tooth),
                    paddingTop: "2px",
                    width: "30px",
                    height: "30px",
                  }}
                  key={index}
                >
                  {/* &nbsp; */}
                  {index + 1}
                </div>
              );
            })}
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col sm="6" md="6">
          <p className="text-center font-weight-bold">Down Left</p>
          <div className="d-flex justify-content-center">
            {carton.teeth
              .slice(16, 24)
              .reverse()
              .map((tooth, index) => {
                return (
                  <div
                    className="d-inline-block mx-2  text-center text-white font-weight-bold rounded-circle "
                    style={{
                      background: getStyle(tooth),
                      paddingTop: "2px",
                      width: "30px",
                      height: "30px",
                    }}
                    key={index}
                  >
                    {/* &nbsp; */}
                    {Math.abs(index - 8)}
                  </div>
                );
              })}
          </div>
        </Col>

        <Col sm="6" md="6">
          <p className="text-center font-weight-bold">Down Right</p>
          <div className="d-flex justify-content-center">
            {carton.teeth.slice(24, 32).map((tooth, index) => {
              return (
                <div
                  className="d-inline-block mx-2  text-center text-white font-weight-bold rounded-circle "
                  style={{
                    background: getStyle(tooth),
                    paddingTop: "2px",
                    width: "30px",
                    height: "30px",
                  }}
                  key={index}
                >
                  {/* &nbsp; */}
                  {index + 1}
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
}
