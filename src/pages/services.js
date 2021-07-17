import React,{useReducer, useEffect} from 'react';
import {Table, Button} from 'react-bootstrap';
import ServiceReducer from '../reducers/service_reducer'
import axios from 'axios';
import Service from '../components/service'
import { Link } from "react-router-dom";

const initialState = {
	services: []
}

export default function Services() {
	const [state, dispatch ] = useReducer(ServiceReducer, initialState);
	useEffect(()=> {
		axios.get('services').then((resp) => {
			dispatch({type: 'index', payload: resp.data})
		});
	}, [])

	return(
		<div>
			<Link to="/service/add" className='btn btn-primary'>Add Service</Link>
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
			    <Service services={state.services} dispath={dispatch} />
			  </tbody>
			</Table>
		</div>
	);
}


