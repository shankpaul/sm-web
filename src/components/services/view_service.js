import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import axios from 'axios';
import {Link, useParams, useHistory} from "react-router-dom";

export default function ViewService(props){
	let params = useParams();
	const [service, setService] = useState({})
	let history = useHistory();

	useEffect(()=>{
		if(params.id){
			loadService(params.id)
		}
	},[])

	const loadService = (id) => {
		let obj = {}
		axios.get('services/'+id).then((resp)=>{
			setService(resp.data.service)
		});
	}

	const handleDelete = (event) => {
		let id = event.target.value;
		axios.delete('services/'+id).then((resp)=>{
			props.dispatch({type: 'delete', payload: {id: id}})
			NotificationManager.success('service Deleted', 'Success');
			history.push('/services')
		});
	}

	return(
			service &&
				<div>
					<div>Compliant: {service.complaint}</div>
					<div>Date: {service.created_at}</div>
					<Button variant="primary" size="sm" onClick={handleDelete} value={service.id}>
					Delete</Button> |  
					<Link to={`/services/${service.id}/edit`}>Edit</Link> 
					</div>
	)
}