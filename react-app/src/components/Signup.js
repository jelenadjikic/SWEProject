import React, { useState} from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ADD_PATIENT } from "../mutations/patients"
import { Row,Col,Form, FormGroup,Label, Input, Button, Alert, Spinner } from 'reactstrap'
import Message from './Message'

export default function AddPatient() {
    const [ name,setName]=useState("")
    const [ city,setCity]=useState("")
    const [ address,setAddress]=useState("")
    const [ phone,setPhone]=useState("")
    const [ email,setEmail]=useState("")
    const [ password,setPassword]=useState("")
    const [ messages, setMessages]=useState([])

    const [ registerPatient, { error, data}]=useMutation( ADD_PATIENT)
    
    const handleSubmit=e=>{
        console.log("Submitted", name)
        e.preventDefault()
        registerPatient({ variables:{ patientInput:{ name, city,address, phone,email, password } } })
        .then(result=>{
            console.log(result.data)
              setName("")
              setCity("")
              setAddress("")
              setPhone("")
              setEmail("")
              setPassword("")
              setMessages([])
        })
        .catch(err=>{ 
            console.log(err)
            setMessages(err.graphQLErrors)
        })
        
    }
    return (
        <div className="container">
           {/* { data &&  <Alert> <Message /> </Alert>   }
             { error && <pre > {error.graphQLErrors.map(({ message }, i) => (
        <span key={i} className="text-center"> <Alert color="danger"> {message} </Alert>   </span>
      ))}
      </pre> } */}
         { data &&  <Alert> <Message /> </Alert>   }
             { error && <pre > {messages.map(({ message }, i) => (
        <span key={i} className="text-center"> <Alert color="danger"> {message} </Alert>   </span>
      ))}
      </pre> }
      <h2 className="my-4" style={{ fontWeight:"300" }}>To sign up please fill up following fields: </h2>
           <Form onSubmit={ handleSubmit}>
               <Row>
                   <Col sm="4" md="4">
                   <FormGroup>
                        <Label>Name</Label>
                        <Input className="border-left border-info rounded" type="text" value={ name } onChange={(e)=>setName(e.target.value)} />
                  </FormGroup>
                   </Col>
                   <Col sm="4" md="4">
                   <FormGroup>
                        <Label>City</Label>
                        <Input  className="border-left border-info rounded" type="text" onChange={(e)=>setCity(e.target.value)} value={ city} />
                  </FormGroup>
                   </Col>
                   <Col sm="4" md="4">
                   <FormGroup>
                        <Label>Adress</Label>
                        <Input  className="border-left border-info rounded" type="text" onChange={(e)=>setAddress(e.target.value)} value={ address} />
                  </FormGroup>
                   </Col>
               </Row>
               <Row>
                   <Col sm="4" md="4">
                   <FormGroup>
                        <Label>Phone</Label>
                        <Input  className="border-left border-info rounded" type="text" onChange={(e)=>setPhone(e.target.value)} value={ phone} />
                  </FormGroup>
                   </Col>
                   <Col sm="4" md="4">
                   <FormGroup>
                        <Label>E mail</Label>
                        <Input  className="border-left border-info rounded" type="text" onChange={(e)=>setEmail(e.target.value)} value={ email }/>
                  </FormGroup>
                   </Col>
                   <Col sm="4" md="4">
                   <FormGroup>
                        <Label>Password</Label>
                        <Input  className="border-left border-info rounded" type="password" onChange={(e)=>setPassword(e.target.value)} value={ password} />
                  </FormGroup>
                   </Col>
               </Row>
               <Button type="submit" color="info" outline>Sign up</Button>
           </Form>
        </div>
    )
}