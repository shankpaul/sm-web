import React from 'react';
import {Button, Table} from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import axios from 'axios';

export default function ListServices(props){
	const handleDelete = (event) => {
		let id = event.target.value;
		axios.delete('services/'+id).then((resp)=>{
			props.dispatch({type: 'delete', payload: {id: id}})
			NotificationManager.success('Vehicle Deleted', 'Success');
		});
	}

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
		{ props.loading ? <tr><td colSpan="6">Loading..</td></tr> : '' }		  
		{props.services.map(service => 
			<tr key={service.id}>
				<td>{service.check_in_at}</td>
				<td>{service.vehicle ? service.vehicle.reg_number : 'Vehicle not found' }</td>
				<td>{service.complaint}</td>
				<td>{service.status}</td>
				<td>{service.expected_delivery_date_}</td>
				<td><Button variant="primary" size="sm" onClick={handleDelete} value={service.id}>
				Delete</Button></td>
			</tr>
		)}
	</tbody>
	</Table>
	)

}