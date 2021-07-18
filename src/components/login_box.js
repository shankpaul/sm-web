import React,{useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useAuth} from '../auth/auth_provider'
import{ useHistory, useLocation} from "react-router-dom";
import axios from 'axios';

export default function LoginBox(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let auth = useAuth();
  let history = useHistory();
  
	return(
			<Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="button" onClick={() => { auth.signIn(email, password, function(){ history.push('/dashboard')}) }}>
          Submit
        </Button>
      </Form>
			)
}
