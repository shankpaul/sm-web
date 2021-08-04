import React,{useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import {VehicleSearch} from '../index'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import {useParams, useHistory, Link} from "react-router-dom";

import 'react-bootstrap-typeahead/css/Typeahead.css';

const initialState = {
	id: '',
	name: '', 
	email: '',
	phone: '',
	address: ''
}

export default function CreateOwner(props){
	const params = useParams();
	const [owner, setOwner] = useState(initialState)
	const [vehicles, setVehicle] = useState([])
	let history = useHistory();

	useEffect(()=>{
		if(params.id){
			loadOwner(params.id)
		}
	},[params])

	const loadOwner = (id) => {
		let obj = {}
		axios.get('owners/'+id).then((resp)=>{
			Object.keys(initialState).forEach((item) => { obj[item]=resp.data[item] })
			setVehicle(resp.data.vehicles)
			setOwner(obj);
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		owner.id ? update() : create()
	}

	const create = () =>{
		let data = {...owner, vehicle_ids: vehicles.map(item => item['id']) }
		axios.post('owners', data).then((resp) => {
			props.dispatch({type: 'create', payload: resp.data})
			NotificationManager.success('Owner Created', 'Success');
			setOwner(initialState);
			setVehicle([]);
			history.push('/owners')
		});		
	}

	const update = () =>{
		let vehicle_ids = vehicles.map((item) => {
			return { id: item['id'],
							 delete: item['delete'] ? true : false}
		})
		console.log(vehicle_ids)
		let data = {...owner, vehicle_ids: vehicle_ids }
		axios.put('owners/'+data.id, data).then((resp) => {
			props.dispatch({type: 'update', payload: resp.data})
			NotificationManager.success('Owner Updated', 'Success');
			setOwner(initialState);
			setVehicle([]);
			history.push('/owners')
		});		
	}

	const handleVehicleSearch = (selectedOptions) => {
		let option = selectedOptions[0]
    setVehicle(prevState =>[...prevState, 
    	{reg_number: option.reg_number, 
    	 id: option.id}
    ])
  }

  const handleChange = (event) => {
  	let key = event.target.name;
  	setOwner(prevState => ({...prevState, [key]: event.target.value}) )
  }

  const handleRemoveVehicle = (event) => {
  	let id = event.target.value;
  	let index = vehicles.findIndex(item => item.id===id)
    setVehicle(prevState => prevState.map((item, key)=>{
    	if(key===index){
    		item['delete']=true;
    	}
    	return item;
    }))
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
			    <Form.Label>Vehicle (if any already added)</Form.Label>
			    <VehicleSearch name="v_search" onChange={handleVehicleSearch} />
			  </Form.Group>
			  
			  <Button type="submit">Save</Button>
			  <Link to="/owners">Cancel</Link>
			</Form>
		
			<MyVehicle vehicles={vehicles} handleDelete={handleRemoveVehicle} />
		
		</div>
	);
}


const MyVehicle = (props) => {
	return(
		<ul>
			{props.vehicles.filter(item=>item.delete!==true).map(item => 
				<li key={item.id}>{item.reg_number} 
					<Button value={item.id} onClick={props.handleDelete}>x</Button>
				</li>				
			)}
		</ul>
	)
}