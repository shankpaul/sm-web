import React from 'react';
import {Button, Table} from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import axios from 'axios';
import {Link, useHistory} from "react-router-dom";


export default function ListUsers(props){
	let history = useHistory();
	const handleDelete = (event) => {
		let id = event.target.value;
		axios.delete('users/'+id).then((resp)=>{
			props.dispatch({type: 'delete', payload: {id: id}})
			NotificationManager.success('User Deleted', 'Success');
			history.push('/users')
		});
	}

	return(
		<Table striped bordered hover size="sm">
			<thead>
			<tr>
				<th>Name</th>
				<th>Phone</th>
				<th>Email</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
		{ props.loading ? <tr><td colSpan="6">Loading..</td></tr> : '' }		  
		{props.users.map(user => 
			<tr key={user.id}>
				<td>{user.name}</td>
				<td>{user.phone}</td>
				<td>{user.email}</td>
				<td>
				<Button variant="primary" size="sm" onClick={handleDelete} value={user.id}>
				Delete</Button> |  
				<Link to={`/users/${user.id}/edit`}>Edit</Link> | 
				<Link to={`/users/${user.id}`}>Show</Link>
				</td>
				
			</tr>
		)}
	</tbody>
	</Table>
	)

}