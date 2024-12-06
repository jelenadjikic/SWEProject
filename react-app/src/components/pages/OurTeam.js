import React from "react";
import { Row, Col } from "reactstrap";
export default function OurTeam() {
  return (
    <div>
      <h1 className="text-center mx-4 my-5 display-3">
        {" "}
        Personal. Advanced. Quality you can trust.{" "}
      </h1>

      <h1
        className="text-center mx-4 display-5 mb-5"
        style={{ fontWeight: "100" }}
      >
        Our advanced technology and quality dentistry combined with our
        personal, patient-focused touch deliver an exceptional experience at
        every visit. We’re a team you can trust.
      </h1>
      <h1 className="text-center mb-4">OUR DENTAL TEAM</h1>
      <div>
        <Row className="mx-4">
          <Col md="4" sm="4" xs="12">
            <div className="img-hover-zoom img-hover-zoom--xyz">
              <img
                src="j.jpg"
                className="img-fluid"
                alt="Another Image zoom-on-hover effect"
              />
            </div>

            <p className="text-center mt-3 mb-0" style={{ fontSize: "1.5em" }}>
              Dr Jelena Đikić
            </p>
            <p className="font-italic font-weight-bold text-center mt-0">
              jelena@gmail.com
            </p>
          </Col>
          <Col md="4" sm="4" xs="12">
            <div className="img-hover-zoom img-hover-zoom--xyz">
              <img
                src="a.jpg"
                className="img-fluid"
                alt="Another Image zoom-on-hover effect"
              />
            </div>
            <p className="text-center mt-3 mb-0" style={{ fontSize: "1.5em" }}>
              Dr Aleksa Dugonjivac
            </p>
            <p className="font-italic font-weight-bold text-center mt-0">
              aleksa@gmail.com
            </p>
          </Col>
          <Col md="4" sm="4" xs="12">
            <div className="img-hover-zoom img-hover-zoom--xyz">
              <img
                src="tam.jpg"
                className="img-fluid"
                alt="Another Image zoom-on-hover effect"
              />
            </div>
            <p className="text-center mt-3 mb-0" style={{ fontSize: "1.5em" }}>
              Dr Tamara Nikolić
            </p>
            <p className="font-italic font-weight-bold text-center mt-0">
              tamara@gmail.com
            </p>
          </Col>
        </Row>
      </div>
      <p className="text-center mx-4 my-5" style={{ fontSize: "1.5em" }}>
        The skilled doctors at the JAT dentis proudly serve the cosmetic and
        restorative dental needs of Niš. If you are seeking dental care, the JAT
        dentist and our skilled, friendly team members would be happy to serve
        you! We are dedicated to providing our patients with personalized
        service and a comfortable environment, because we realize that such
        qualities can be hard to find in today’s busy world. We consider your
        dental health our top priority, and strive to make sure you feel
        comfortable and satisfied with our service.
      </p>

      <h1 className="display-3 text-info text-center">
        THE DOCTOR YOU CHOOSE MATTERS
      </h1>
      <h1 className="display-3 text-info text-center mb-5">
        Invisalign is not the same at every office.
      </h1>
      <hr className="border-top border-info " style={{ width: "60%" }} />
    </div>
  );
}
