import React from 'react';
import {Button, Table} from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import axios from 'axios';
import {Link, useHistory} from "react-router-dom";


export default function ListOwners(props){
	let history = useHistory();
	const handleDelete = (event) => {
		let id = event.target.value;
		axios.delete('owners/'+id).then((resp)=>{
			props.dispatch({type: 'delete', payload: {id: id}})
			NotificationManager.success('Owner Deleted', 'Success');
			history.push('/owners')
		});
	}

	return(
		<Table striped bordered hover size="sm">
			<thead>
			<tr>
				<th>Name</th>
				<th>Phone</th>
				<th>Address</th>
				<th>Email</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
		{ props.loading ? <tr><td colSpan="6">Loading..</td></tr> : '' }		  
		{props.owners.map(owner => 
			<tr key={owner.id}>
				<td>{owner.name}</td>
				<td>{owner.phone}</td>
				<td>{owner.address}</td>
				<td>{owner.email}</td>
				<td>
				<Button variant="primary" size="sm" onClick={handleDelete} value={owner.id}>
				Delete</Button> |  
				<Link to={`/owners/${owner.id}/edit`}>Edit</Link> | 
				<Link to={`/owners/${owner.id}`}>Show</Link>
				</td>
				
			</tr>
		)}
	</tbody>
	</Table>
	)

}