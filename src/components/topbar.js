import React from 'react';
import {Navbar, NavDropdown, Nav, Button} from 'react-bootstrap';
import{ useHistory} from "react-router-dom";

import {useAuth} from '../auth/auth_provider'

export default function Topbar(){
	let auth = useAuth();
	return(
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
		  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
		  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  <Navbar.Collapse className="justify-content-end">
		    <Nav>
		      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
		        <NavDropdown.Item>Profile</NavDropdown.Item>
		        <NavDropdown.Item>Lock</NavDropdown.Item>
		        <NavDropdown.Divider />
		        <NavDropdown.Item><AuthButton/></NavDropdown.Item>
		      </NavDropdown>

		       <Navbar.Text>{auth.user.name}</Navbar.Text>

		    </Nav>
		  </Navbar.Collapse>
		</Navbar>
	)
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
      <Button
        onClick={() => {
          auth.signout(() => history.push("/login"));
        }}
      >
        Sign out
      </Button>
  ) : (
    <p>You are not logged in.</p>
  );
}