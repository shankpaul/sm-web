import React,{useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import {OwnerSearch} from '../index'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import {useParams, useHistory} from "react-router-dom";

import 'react-bootstrap-typeahead/css/Typeahead.css';

const initialState = {
	id: '',
	make: '', 
	model: '',
	year: '',
	fuel: '',
	body_type: '',
	transmission: '',
	color: '',
	vin_number: '',
	reg_number: '',
	owner_id:'',
	owner: {}
}

export default function CreateVehicle(props){
	let params = useParams();
	let history = useHistory();

	const [vehicle, setVehicle] = useState(initialState)

	useEffect(()=>{
		if(params.id){
			loadVehicle(params.id)
		}
	},[params.id])

	const loadVehicle = (id) => {
		let obj = {}
		axios.get('vehicles/'+id).then((resp)=>{
			Object.keys(initialState).forEach((item) => { obj[item]=resp.data[item] })
			setVehicle(prevState =>({...prevState, ...obj}))
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		vehicle.id ? update() : create()
	}

	const create = () =>{
		axios.post('vehicles',vehicle).then((resp) => {
			props.dispatch({type: 'create', payload: resp.data})
			NotificationManager.success('Vehicle Created', 'Success');
			setVehicle(initialState);
			history.push('/vehicles')
		});			
	}

	const update = () =>{
		axios.put('vehicles/'+vehicle.id, vehicle).then((resp) => {
			props.dispatch({type: 'update', payload: resp.data})
			NotificationManager.success('Vehicle Updated', 'Success');
			setVehicle(initialState);
			history.push('/vehicles')
		});		
	}

	const handleOwnerSearch = (selectedOptions) => {
		let option = selectedOptions[0]
		setVehicle(prevState =>({...prevState, owner_id: option.id}))
  }

  const handleChange = (event) => {
  	let key = event.target.name
  	setVehicle(prevState => ({...prevState, [key]: event.target.value}) )
  }

	return(
		<div>
			<Form onSubmit={handleSubmit}>
			  <Form.Group className="mb-3" controlId="Form.ControlInput1">
			    <Form.Label>Owner</Form.Label>
			    <OwnerSearch name="o_search" onChange={handleOwnerSearch} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Form.ControlInput2">
			    <Form.Label>Reg No</Form.Label>
			    <Form.Control type="text" value={vehicle.reg_number} name="reg_number" placeholder="Owner Name" onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Form.ControlInput3">
			    <Form.Label>Vin No</Form.Label>
			    <Form.Control type="text" value={vehicle.vin_number} name="vin_number" placeholder="Phone" onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Form.ControlInput4">
			    <Form.Label>Make</Form.Label>
			    <Form.Control type="text" value={vehicle.make}  name="make" placeholder="Make" onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Form.ControlTextarea5">
			    <Form.Label>Model</Form.Label>
			    <Form.Control type="text" value={vehicle.model} name="model" placeholder="Model" onChange={handleChange} />
			  </Form.Group>

			   <Form.Group className="mb-3" controlId="Form.ControlTextarea6">
			    <Form.Label>Year</Form.Label>
			    <Form.Control type="text" value={vehicle.year} name="year" placeholder="Year" onChange={handleChange} />
			  </Form.Group>

			   <Form.Group className="mb-3" controlId="Form.ControlTextarea7">
			    <Form.Label>Fuel</Form.Label>
			    <Form.Control type="text" value={vehicle.fuel} name="fuel" placeholder="Fuel" onChange={handleChange} />
			  </Form.Group>

			   <Form.Group className="mb-3" controlId="Form.ControlTextarea8">
			    <Form.Label>Body Type</Form.Label>
			    <Form.Control type="text" value={vehicle.body_type} name="body_type" placeholder="Body Type" onChange={handleChange} />
			  </Form.Group>

			   <Form.Group className="mb-3" controlId="Form.ControlTextarea9">
			    <Form.Label>Transmission</Form.Label>
			    <Form.Control type="text" value={vehicle.transmission} name="transmission" placeholder="Transmission" onChange={handleChange} />
			  </Form.Group>

			   <Form.Group className="mb-3" controlId="Form.ControlTextarea10">
			    <Form.Label>Color</Form.Label>
			    <Form.Control type="text" value={vehicle.color} name="color" placeholder="Color" onChange={handleChange} />
			  </Form.Group> 

			 
			  
			  <Button type="submit">Save</Button>
			</Form>
		</div>
	);
}