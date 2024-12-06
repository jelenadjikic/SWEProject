import React, { useState, useContext} from 'react'
import AuthContext  from '../context/auth-context'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN_PATIENT } from '../mutations/patients'
import { Form, Input, FormGroup, Label, Button,Alert,
    Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle,
    InputGroup, InputGroupAddon, InputGroupText, Row, Col } from 'reactstrap'

export default function Login(props) {
    const context=useContext(AuthContext)
    const [ email, setEmail]=useState("")
    const [ password, setPassword ]=useState("")

    const [ loginPatient, { error, data }]=useMutation(LOGIN_PATIENT)

  const handleSubmit=e=>{
    e.preventDefault()
    console.log("EMAIL AND PASS", email,password)
    loginPatient({ variables:{ loginPatientInput:{ email,password } } })
    .then(result=>{
      console.log(result)
      localStorage.setItem("id", result.data.loginPatient.id)
      localStorage.setItem("token", result.data.loginPatient.token)
      localStorage.setItem("role",result.data.loginPatient.role)
      localStorage.setItem("name",result.data.loginPatient.name)
      localStorage.setItem("tokenExpiration", result.data.loginPatient.tokenExpiration)
      context.setName(result.data.loginPatient.name)
      context.setRole(result.data.loginPatient.role)
      context.setToken(result.data.loginPatient.token)
      context.setTokenExpiration( result.data.loginPatient.tokenExpiration)
      setEmail("")
      setPassword("")
      props.history.push("/patientSchedule")
    
    }).catch(err=>{
      console.log(err)
      setEmail("")
      setPassword("")
    })
  }

    return (
        <div>
        
            <Row>
    <Col sm={{size:4, offset:4 }}>
    <Card className="bg-info">
        <CardBody>
            <div className=" text-center text-white display-3">
            <i className="fa fa-user"></i>

            </div>
          <CardTitle className="text-center display-4 mb-4 text-white">Login</CardTitle>
          <CardText>
          { error && <pre > {error.graphQLErrors.map(({ message }, i) => (
        <span key={i} className="text-center"> <Alert color="danger"> {message} </Alert>   </span>
      ))}
      </pre> }
            <Form onSubmit={ handleSubmit}>
            
                <FormGroup>
               
                <InputGroup className="mb-4 py-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText> <i class="fa fa-envelope"></i> </InputGroupText>
                 </InputGroupAddon>
                 {/* <Label>User name</Label> */}
                 <Input type="text" onChange={ (e)=>setEmail(e.target.value) } placeholder="Enter email"/>
                 </InputGroup>

                </FormGroup>
          
                <FormGroup className="mb-4">
               
                <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i class="fa fa-key"></i></InputGroupText>
                 </InputGroupAddon>
                 {/* <Label>User name</Label> */}
                 <Input type="password" onChange={ (e)=>setPassword(e.target.value) } placeholder="Enter password" />
                 </InputGroup>

                </FormGroup >
                <Button className="text-white" type="submit" color="info" outline>Login</Button>
                </Form>
          </CardText>
        </CardBody>
      </Card>
    </Col>
</Row>
        </div>
    )
}
