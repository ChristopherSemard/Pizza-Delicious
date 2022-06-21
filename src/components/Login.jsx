import React from 'react'
import { useState } from 'react';
import { Container, Form, Button } from "react-bootstrap";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <>
    <Container  style={{marginTop : '50px'}}>
      <h1>CONNEXION</h1>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" z>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
    </>
  )
}

export default Login