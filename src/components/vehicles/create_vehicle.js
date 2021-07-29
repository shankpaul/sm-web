import React,{useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {OwnerSearch} from '../index'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import {useHistory} from "react-router-dom";

import 'react-bootstrap-typeahead/css/Typeahead.css';

const initialState = {
	make: '', 
	model: '',
	year: '',
	fuel: '',
	body_type: '',
	transmission: '',
	color: '',
	vin_number: '',
	reg_number: '',
	owner: {}
}

export default function CreateVehicle(props){
	const [vehicle, setVehicle] = useState(initialState)
	let history = useHistory();
	
	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post('vehicles',vehicle).then((resp) => {
			props.dispatch({type: 'create', payload: resp.data})
			NotificationManager.success('Vehicle Created', 'Success');
			setVehicle(initialState);
			history.push('/vehicles')
		});		
	}

	const handleSearch = (selectedOptions) => {
		let option = selectedOptions[0]
		vehicle.owner['id'] = option.owner_id
    setVehicle(vehicle)
  }

  const handleChange = (event) => {
  	vehicle[event.target.name] = event.target.value
  	setVehicle(vehicle);
  }

	return(
		<div>
			<Form onSubmit={handleSubmit}>
			  <Form.Group className="mb-3" controlId="Form.ControlInput1">
			    <Form.Label>Owner</Form.Label>
			    <OwnerSearch name="o_search" onChange={handleSearch} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Form.ControlInput2">
			    <Form.Label>Reg No</Form.Label>
			    <Form.Control type="text" name="reg_number" placeholder="Owner Name" onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Form.ControlInput3">
			    <Form.Label>Vin No</Form.Label>
			    <Form.Control type="text" name="vin_number" placeholder="Phone" onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Form.ControlInput4">
			    <Form.Label>Make</Form.Label>
			    <Form.Control type="text" name="make" placeholder="Make" onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Form.ControlTextarea5">
			    <Form.Label>Model</Form.Label>
			    <Form.Control type="text" name="model" placeholder="Model" onChange={handleChange} />
			  </Form.Group>

			   <Form.Group className="mb-3" controlId="Form.ControlTextarea6">
			    <Form.Label>Year</Form.Label>
			    <Form.Control type="text" name="year" placeholder="Year" onChange={handleChange} />
			  </Form.Group>

			   <Form.Group className="mb-3" controlId="Form.ControlTextarea7">
			    <Form.Label>Fuel</Form.Label>
			    <Form.Control type="text" name="fuel" placeholder="Fuel" onChange={handleChange} />
			  </Form.Group>

			   <Form.Group className="mb-3" controlId="Form.ControlTextarea8">
			    <Form.Label>Body Type</Form.Label>
			    <Form.Control type="text" name="body_type" placeholder="Body Type" onChange={handleChange} />
			  </Form.Group>

			   <Form.Group className="mb-3" controlId="Form.ControlTextarea9">
			    <Form.Label>Transmission</Form.Label>
			    <Form.Control type="text" name="transmission" placeholder="Transmission" onChange={handleChange} />
			  </Form.Group>

			   <Form.Group className="mb-3" controlId="Form.ControlTextarea10">
			    <Form.Label>Color</Form.Label>
			    <Form.Control type="text" name="color" placeholder="Color" onChange={handleChange} />
			  </Form.Group> 

			 
			  
			  <Button type="submit">Save</Button>
			</Form>
		</div>
	);
}