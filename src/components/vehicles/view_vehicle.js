import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import axios from 'axios';
import {Link, useParams, useHistory} from "react-router-dom";

export default function ViewVehicle(props){
	let params = useParams();
	const [vehicle, setVehicle] = useState({})
	let history = useHistory();

	useEffect(()=>{
		if(params.id){
			loadVehicle(params.id)
		}
	},[params])

	const loadVehicle = (id) => {
		axios.get('vehicles/'+id).then((resp)=>{
			setVehicle(resp.data)
		});
	}

	const handleDelete = (event) => {
		let id = event.target.value;
		axios.delete('vehicles/'+id).then((resp)=>{
			props.dispatch({type: 'delete', payload: {id: id}})
			NotificationManager.success('Vehicle Deleted', 'Success');
			history.push('/vehicles')
		});
	}

	return(
			vehicle &&
				<div>
					<div>Reg No: {vehicle.reg_number}</div>
					<div>Owner: {vehicle.owner && vehicle.owner.name}</div>
					<Button variant="primary" size="sm" onClick={handleDelete} value={vehicle.id}>
					Delete</Button> |  
					<Link to={`/vehicles/${vehicle.id}/edit`}>Edit</Link> 
					</div>
	)
}