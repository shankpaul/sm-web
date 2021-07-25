import React,{useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {VehicleSearch} from '../index'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';

import 'react-bootstrap-typeahead/css/Typeahead.css';

const initialState = {
	complaint: '', 
	vehicle_id: ''
}

export default function CreateService(props){
	const [service, setService] = useState(initialState)
	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post('services',service).then((resp) => {
			props.dispatch({type: 'create', payload: resp.data})
			NotificationManager.success('Service Created', 'Success');
			setService(initialState);
		});		
	}

	const handleSearch = (selectedOptions) => {
		let option = selectedOptions[0]
		service['vehicle_id'] = option.vehicle_id
    setService(service)
  }

  const handleChange = (event) => {
  	service[event.target.name] = event.target.value
  	setService(service);
  }

	return(
		<div>
			<Form onSubmit={handleSubmit}>
			  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
			    <Form.Label>Vehicle</Form.Label>
			    <VehicleSearch name="v_search" onChange={handleSearch} />
			  </Form.Group>
			  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
			    <Form.Label>Complaint</Form.Label>
			    <Form.Control name="complaint" as="textarea" rows={3} onChange={handleChange}/>
			  </Form.Group>
			  <Button type="submit">Save</Button>
			</Form>
		</div>
	);
}