import React from 'react';
import {
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
				<Link to="/invoices">Invoices</Link>
		</div>
	);
}