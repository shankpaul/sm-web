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
				<Link to="/services">Sevices</Link>
				<Link to="/owners">Owners</Link>
				<Link to="/vehicles">Vehicles</Link>
				<Link to="/users">Users</Link>
		</div>
	);
}