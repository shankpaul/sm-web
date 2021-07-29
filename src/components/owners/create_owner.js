import React,{useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import {VehicleSearch} from '../index'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import {useParams} from "react-router-dom";
import {ListVehicles} from '../'

import 'react-bootstrap-typeahead/css/Typeahead.css';

const initialState = {
	id: '',
	name: '', 
	email: '',
	phone: '',
	address: '',
	vehicle_id: ''
}

export default function CreateOwner(props){
	let params = useParams();
	const [owner, setOwner] = useState(initialState)
	const [vehicles, setVehicle] = useState([])

	useEffect(()=>{
		if(params.id){
			loadOwner(params.id)
		}
	},[])

	const loadOwner = (id) => {
		let obj = {}
		axios.get('owners/'+id).then((resp)=>{
			console.log(resp.data)
			Object.keys(initialState).map((item) => { obj[item]=resp.data[item] })
			setVehicle(resp.data.vehicles)
			setOwner(obj);
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		owner.id ? update() : create()
	}

	const create = () =>{
		axios.post('owners', owner).then((resp) => {
			props.dispatch({type: 'create', payload: resp.data})
			NotificationManager.success('Owner Created', 'Success');
			setOwner(initialState);
		});		
	}

	const update = () =>{
		axios.put('owners/'+owner.id, owner).then((resp) => {
			props.dispatch({type: 'create', payload: resp.data})
			NotificationManager.success('Owner Updated', 'Success');
			setOwner(initialState);
		});		
	}

	const handleSearch = (selectedOptions) => {
		let option = selectedOptions[0]
    setOwner(prevState => ({...prevState, vehicle_id: option.vehicle_id}) )
    setVehicle(prevState =>[...prevState, {reg_number: option.reg_number, id: option.vehicle_id}])
  }

  const handleChange = (event) => {
  	let key = event.target.name;
  	setOwner(prevState => ({...prevState, [key]: event.target.value}) )
  }

	return(
		<div>
			<Form onSubmit={handleSubmit}>
			  <Form.Group className="mb-3" controlId="Form.ControlInput1">
			    <Form.Label>Name</Form.Label>
			    <Form.Control type="text" name="name" value={owner.name} placeholder="Owner Name" onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Form.ControlInput2">
			    <Form.Label>Phone</Form.Label>
			    <Form.Control type="text" name="phone" value={owner.phone}  placeholder="Phone" onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Form.ControlInput3">
			    <Form.Label>Email</Form.Label>
			    <Form.Control type="email" name="email" value={owner.email} placeholder="Email" onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Form.ControlTextarea4">
			    <Form.Label>Address</Form.Label>
			    <Form.Control name="address" as="textarea" value={owner.address} rows={3} onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Form.ControlInput5">
			    <Form.Label>Name</Form.Label>
			    <VehicleSearch name="v_search" onChange={handleSearch} />
			  </Form.Group>
			  
			  <Button type="submit">Save</Button>
			</Form>
		
			<MyVehicle vehicles={vehicles} />
		
		</div>
	);
}


const MyVehicle = (props) => {
	return(
		<ul>
			{props.vehicles.map(item => <li>{item.reg_number}</li> )}
		</ul>
	)
}