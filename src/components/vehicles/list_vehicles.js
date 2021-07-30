import React from 'react';
import {Button, Table} from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import axios from 'axios';


export default function ListVehicles(props){
	const handleDelete = (event) => {
		let id = event.target.value;
		axios.delete('vehicles/'+id).then((resp)=>{
			props.dispatch({type: 'delete', payload: {id: id}})
			NotificationManager.success('Vehicle Deleted', 'Success');
		});
	}
	return(
		<Table striped bordered hover size="sm">
			<thead>
			<tr>
				<th>Reg No</th>
				<th>Vin</th>
				<th>Owner</th>
				<th>Make</th>
				<th>Model</th>
				<th>Color</th>
			</tr>
		</thead>
		<tbody>
		{props.loading ? <tr><td colSpan="6">Loading..</td></tr> : ''}		  
		{props.vehicles.map(vehicle => 
			<tr key={vehicle.id}>
				<td>{vehicle.reg_number}</td>
				<td>{vehicle.vin_number}</td>
				<td>{vehicle.owner && vehicle.owner.name}</td>
				<td>{vehicle.make}</td>
				<td>{vehicle.model}</td>
				<td>{vehicle.color}</td>
				<td><Button variant="primary" size="sm" onClick={handleDelete} value={vehicle.id}>
				Delete</Button></td>
			</tr>
		)}
	</tbody>
	</Table>
	)

}