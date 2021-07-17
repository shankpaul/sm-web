import React from 'react';
import {Button} from 'react-bootstrap';

export default function Srvice(props){
	return(
		props.services.map(service => 
			<tr key={service.id}>
			<td>{service.check_in_at}</td>
			<td>{service.vehicle.vin}</td>
			<td>{service.complaint}</td>
			<td>{service.status}</td>
			<td>{service.expected_delivery_date_}</td>
			<td><Button variant="primary" size="sm" onClick={() => props.dispatch({type: 'delete', payload: {id: service.id} }) }>Delete</Button></td>
			</tr>
			)
		)
}