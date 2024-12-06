import React from 'react'
import {Row, Col } from 'reactstrap'
export default function About() {
    return (
        <div>

        <Row>
            <Col md="6" sm="6" xa="12">

            <img className="pl-3 img-fluid" src="d1.jpg" />
            </Col>

        <Col md="3" sm="3" xs="12">
            <div className=" p-3 text-justify">


            <h1 className="display-4 text-center mb-3 font-italic" style={{ fontWeight:"100" }}>JAT Dentist Office</h1>
            <p style={{ fontSize:"1.2em"}}>
            JAT dentist is a Niš dentist practice that treats patients
             of all ages. We are committed to delivering the highest quality
            dental care and do so using advanced dental equipment.
            We are a cosmetic dentist that offers
            services like checkups, teeth cleaning,
            crowns, veneers and more.
            </p>
            </div>

        </Col>
        <Col md="3" sm="3" xs="12">
        <p className="my-4 p-3 text-justify" style={{ fontSize:"1.2em"}}>
        We also perform emergency dentist services that include bonding,
        root canals, crowns, and bridges. As a local dentist,
        we create lifelong relationships with our patients and
        their families and work to ensure that they receive treatments
        in a comfortable and relaxed environment.
        Our staff invite you to schedule an appointment by calling
        018/555-555 and experience why our patients think
        JAT dentist teanm is the best dentist team in Niš.
       </p>
        </Col>

        </Row>

       <div className="mt-5">
       <Row>
        <Col md="7" sm="7" xs="12">
            <h2 className="font-weight-bold text-center my-5">
            Your health and your time are valuable.
            </h2>
            <p className="about">
            Our conveniently located in central location
            offers modern high-tech care and a one-of-a-kind experience.
            We believe you’ll feel better and more confident if your
            appointment is relaxed and unhurried.
            That’s why we set aside a full hour for every patient appointment.
            </p>
            <p className="about">
            Don’t worry — if you’re on a tight schedule,
            headed to work, or don’t need the full hour,
             that’s not a problem.
            We simply believe it’s best to have extra time if we need it.
            </p>
            <p className="about">
            Most importantly, your appointment at JAT dentist will be caring and without judgment.
             No matter how long it’s been since your last dental appointment,
             you’ll leave feeling confident and empowered.
            </p>
            <p className="about font-weight-bold">
            Everyone deserves a smile they love!
            </p>
        </Col>

        <Col md="5" sm="5" xs="12">
            <div className="bg-info text-white mt-5 py-4" style={{ borderRadius:"35px" }}>
                <p className="my-5 font-weight-bold text-center" style={{ fontSize:"1.7em" }} >
                During your first visit to our office, our team will:
                </p>
                <ul className="about">
                <li> Show you around our office </li>
                <li> Discuss your dental and medical history</li>
                <li> Answer any questions you may have </li>
                <li> Perform a thorough teeth cleaning </li>
                <li> Examine your teeth and gums, creating a treatment plan just for you</li>

                </ul>

            </div>
        </Col>
        </Row>
       </div>



       <div
       className="text-center  font-weight-light"
       style={{ width:"70%", fontSize:"2em", marginTop:"150px", marginLeft:"auto", marginRight:"auto" }}
       >   
       “One of the most wonderful dentists I
        have ever been to. They are kind, compassionate,
         and truly care about their patients. I was always
         afraid of dentists until I met them.
         Highly recommend them for any dentistry needs –
         and if you would like your dentist to be your new best friend!”
         </div> 
         <p className="text-center font-weight-bolder"> John Doe</p>
         </div>
    )
}
