import React,{useReducer} from 'react';
import {Table} from 'react-bootstrap';
import ServiceReducer,{initialState} from '../reducers/service_reducer'

export default function Services() {
	const [services, dispatch] = useReducer(ServiceReducer, initialState());

	return(
		<div>
			<Table striped bordered hover size="sm">
			  <thead>
			    <tr>
			      <th>Date</th>
			      <th>Vehicle No</th>
			      <th>Complaint</th>
			      <th>Status</th>
			      <th>Delivery Date</th>
			    </tr>
			  </thead>
			  <tbody>
			  {[].map((service)=> {
			  	<tr key={service.id}>
			      <td>{service.check_in_at}</td>
			      <td>{service.vehicle.vin}</td>
			      <td>{service.complaint}</td>
			      <td>{service.status}</td>
			      <td>{service.expected_delivery_date_}</td>
			    </tr>
			  })}
			    
			  </tbody>
			</Table>
		</div>
	);
}


