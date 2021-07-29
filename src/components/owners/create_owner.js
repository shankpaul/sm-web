import React,{useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {VehicleSearch} from '../index'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';

import 'react-bootstrap-typeahead/css/Typeahead.css';

const initialState = {
	name: '', 
	email: '',
	phone: '',
	address: '',
	vehicle_id: ''
}

export default function CreateOwner(props){
	const [owner, setOwner] = useState(initialState)
	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post('owners',owner).then((resp) => {
			props.dispatch({type: 'create', payload: resp.data})
			NotificationManager.success('Owner Created', 'Success');
			setOwner(initialState);
		});		
	}

	const handleSearch = (selectedOptions) => {
		let option = selectedOptions[0]
		owner['vehicle_id'] = option.vehicle_id
    setOwner(owner)
  }

  const handleChange = (event) => {
  	owner[event.target.name] = event.target.value
  	setOwner(owner);
  }

	return(
		<div>
			<Form onSubmit={handleSubmit}>
			  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
			    <Form.Label>Name</Form.Label>
			    <Form.Control type="text" name="name" placeholder="Owner Name" onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
			    <Form.Label>Phone</Form.Label>
			    <Form.Control type="text" name="phone" placeholder="Phone" onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
			    <Form.Label>Email</Form.Label>
			    <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
			    <Form.Label>Address</Form.Label>
			    <Form.Control name="address" as="textarea" rows={3} onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
			    <Form.Label>Name</Form.Label>
			    <VehicleSearch name="v_search" onChange={handleSearch} />
			  </Form.Group>
			  
			  <Button type="submit">Save</Button>
			</Form>
		</div>
	);
}