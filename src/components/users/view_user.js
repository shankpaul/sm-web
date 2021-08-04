import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import axios from 'axios';
import {Link, useParams, useHistory} from "react-router-dom";

export default function ViewUser(props){
	let params = useParams();
	const [user, setUser] = useState({})
	let history = useHistory();

	useEffect(()=>{
		if(params.id){
			loadUser(params.id)
		}
	},[params])

	const loadUser = (id) => {
		axios.get('users/'+id).then((resp)=>{
			setUser(resp.data)
		});
	}

	const handleDelete = (event) => {
		let id = event.target.value;
		axios.delete('users/'+id).then((resp)=>{
			props.dispatch({type: 'delete', payload: {id: id}})
			NotificationManager.success('User Deleted', 'Success');
			history.push('/users')
		});
	}

	return(
			user &&
				<div>
					<div>Name: {user.name}</div>
					<div>Phone: {user.phone}</div>
					<div>Email: {user.email}</div>
					<div>
					<Button variant="primary" size="sm" onClick={handleDelete} value={user.id}>
					Delete</Button> |  
					<Link to={`/users/${user.id}/edit`}>Edit</Link> 
					</div>
				</div>
	)
}