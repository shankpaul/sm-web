import React from 'react';
import {Button, Table} from 'react-bootstrap';

export default function ListServices(props){
	return(
		<Table striped bordered hover size="sm">
			<thead>
			<tr>
				<th>Date</th>
				<th>Vehicle No</th>
				<th>Complaint</th>
				<th>Status</th>
				<th>Delivery Date</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>		  
		{props.services.map(service => 
			<tr key={service.id}>
				<td>{service.check_in_at}</td>
				<td>{service.vehicle.reg_number}</td>
				<td>{service.complaint}</td>
				<td>{service.status}</td>
				<td>{service.expected_delivery_date_}</td>
				<td><Button variant="primary" size="sm" onClick={() => props.dispatch({type: 'delete', payload: {id: service.id} }) }>
				Delete</Button></td>
			</tr>
		)}
	</tbody>
	</Table>
	)

}