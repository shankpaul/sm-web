import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function Sidebar(){
	return(		
		<div className="sidenav">
				<Link to="/main">Main</Link>
				<Link to="/services">Home</Link>
		</div>
	);
}