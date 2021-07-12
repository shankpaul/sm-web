import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

export default function Sidebar(){
	return(		
		<div class="sidenav">
			<a href="#about">About</a>
			<a href="#services">Services</a>
			<a href="#clients">Clients</a>
			<a href="#contact">Contact</a>
		</div>
	);
}