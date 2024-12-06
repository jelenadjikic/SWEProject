import React from 'react'
import Carous from './Carous'
import {Row,Col,Button} from 'reactstrap'
import {Link} from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <div style={{ width:"90%", margin:"auto"}}>
            <Carous />
            </div>

            <div className=" my-5" style={{ fontSize:"1.5em" }}>
            <Row >
                <Col md="4" sm="4" xs="12">
                    <div className="text-white p-4 bg-info border rounded mx-3" >
                    <p className="text-center font-weight-bolder">AESTETHIC DENTISRY</p>
                    <p> A healthy and pleasant smile may be a the most strikig
                        feature in the face of person
                    </p>
                    <Button tag={Link} to="/aesthetic"  className="border-white text-white" color="white" outline>Read more</Button>
                    </div>     
                </Col>
                <Col md="4" sm="4" xs="12">
                <div className="text-white p-4 bg-info mr-3 border rounded">
                    <p className="text-center font-weight-bolder">ORAL SURGERY</p>
                    <p> Our department of oral surgery interventions performs any type
                        of local or total anestesia
                    </p>
                    <Button tag={Link} to="/surgery" className="border-white text-white" color="white" outline>Read more</Button>
                    </div>
                </Col>
                <Col md="4" sm="4" xs="12">
                <div className="text-white p-4 bg-info mr-3 border rounded">
                    <p className="text-center font-weight-bolder">ENDODONTICS</p>
                    <p>
                    The branch of dentistry that deals with
                    the diagnosis and treatment of pathological processes
                    </p>
                    <Button  tag={Link} to="/endodontics" className="border-white text-white" color="white" outline>Read more</Button>
                    </div>
                </Col>
                <Col md="4" sm="4" xs="12">

                </Col>

            </Row>
            </div>

            <div className="border border-info text-info" style={{ width:"75%", padding:"3em", margin:"auto", fontSize:"1.7em" }} >
                <div className="text-center display-4 font-weight-bold" style={{ margin:"0 0 30px 0" }}>
                <p>1 St visit free</p>
                <p>018/555-555</p>
                </div>             
                <p className=" font-italic text-center" >- Make an appointment -</p>
                <p> Login and make an appontment. First you have to make your free registration. If you want any assists, please call us  </p>
            </div>

        </div>
    )
}
