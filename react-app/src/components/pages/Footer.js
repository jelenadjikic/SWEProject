import React from 'react'
import { Jumbotron,Row,Col } from 'reactstrap'
export default function Footer() {
    return (
        <div className="mt-5">
           
        <Jumbotron className="border-top border-info bg-info" style={{ paddingBottom:"0", marginBottom:"0",paddingTop:"1em"}} >
        <Row>
            <Col md="4 "sm="4" xs="12">
               <div className="d-flex mb-3">
               {/* <img src="logo.png" width="100" height="100" /> */}
                <p className="text-white  border-bottom border-white " style={{ fontFamily:"Dancing script, cursive", fontSize:"2em" }}>Jat Dentist</p>  
                <hr className="text-white" style={{ borderTop:"3px solid blue" }}></hr>  
               </div>
                <p className="text-white p-3 font-italic" style={{ fontSize:"1.2em"}}> 
                We and our professional team are looking forward to seeing you, at your disposal for top service and expert
                 advice from all areas of aesthetic and general dentistry
                </p>
               
                
            </Col>
            <Col md="4 "sm="4" xs="12">
            <p className="text-white" style={{ fontSize:"1.5em", fontWeight:"100"}}>
                Address
             </p> 
             <div>
             <Row>
             <Col sm="1" md="1">
             <i className="fa fa-home text-white" style={{ fontSize:"1.5em" }}/>
             </Col>  
            <Col sm="11" md="11">
                <p className="text-white">
                  Bulevar Nemanjića 67 18000 Niš
                </p>
            </Col>
             </Row> 
             </div>
             <div>
             <Row>
             <Col sm="1" md="1">
             <i className="fa fa-phone text-white" style={{ fontSize:"1.5em" }}/>
             </Col>  
            <Col sm="11" md="11">
                <p className="text-white">
                  018 555 555  /  064 555 555
                </p>
            </Col>
             </Row> 
             </div>
             <div>
             <Row>
             <Col sm="1" md="1">
             <i className="fa fa-envelope text-white" style={{ fontSize:"1.5em" }}/>
             </Col>  
            <Col sm="11" md="11">
                <p className="text-white">
                  info@jatdentist.rs
                </p>
                <p className="text-white">
                  jatdentist@gmail.com
                </p>
            </Col>
             </Row> 
             </div>
            </Col>
            <Col md="4 "sm="4" xs="12">
            <p className="text-white" style={{ fontSize:"1.5em", fontWeight:"100"}}>
                Visiting hours
            </p> 
            <p className="text-white" > 
                Monday-Friday: 10-18
            </p>
            <p className="text-white" style={{ fontSize:"1.5em", fontWeight:"100"}}>
                Payment 
            </p>
            <p className="mt-4">
                <img className="mr-2" src="visa.jpg" width="90"  height="60"/>
                <img src="dina.jpg" width="90"  height="60"/>
            </p>
            </Col>
        </Row>
        {/* <p className="text-center text-white font-weight-bold text-uppercase mt-3">Follow us</p>
        <p className="text-center pb-2" style={{ fontSize:"1.5em" }}> <i class="fa fa-facebook-f text-white mr-3"></i> <i class="fa fa-twitter text-white mr-3"></i> <i class="fa fa-instagram text-white mr-3"></i> <i class="fa fa-youtube text-white mr-3"></i> </p> */}
        </Jumbotron>
        </div>
    )
}