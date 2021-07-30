import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import axios from 'axios';
import {Link, useParams, useHistory} from "react-router-dom";

export default function ViewOwner(props){
	let params = useParams();
	const [owner, setOwner] = useState({})
	let history = useHistory();

	useEffect(()=>{
		if(params.id){
			loadOwner(params.id)
		}
	},[])

	const loadOwner = (id) => {
		let obj = {}
		axios.get('owners/'+id).then((resp)=>{
			setOwner(resp.data)
		});
	}

	const handleDelete = (event) => {
		let id = event.target.value;
		axios.delete('owners/'+id).then((resp)=>{
			props.dispatch({type: 'delete', payload: {id: id}})
			NotificationManager.success('Owner Deleted', 'Success');
			history.push('/owners')
		});
	}

	return(
			owner &&
				<div>
					<div>Name: {owner.name}</div>
					<div>Phone: {owner.phone}</div>
					<div>Address: {owner.address}</div>
					<div>Email: {owner.email}</div>
					<div>
					<Button variant="primary" size="sm" onClick={handleDelete} value={owner.id}>
					Delete</Button> |  
					<Link to={`/owners/${owner.id}/edit`}>Edit</Link> 
					</div>
				</div>
	)
}