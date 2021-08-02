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
	phone: ''
}

export default function CreateUser(props){
	let params = useParams();
	const [user, setUser] = useState(initialState)
	let history = useHistory();

	useEffect(()=>{
		if(params.id){
			loadUser(params.id)
		}
	},[])

	const loadUser = (id) => {
		let obj = {}
		axios.get('users/'+id).then((resp)=>{
			Object.keys(initialState).map((item) => { obj[item]=resp.data[item] })
			setUser(obj);
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		user.id ? update() : create()
	}

	const create = () =>{
		// let data = {...owner, vehicle_ids: vehicles.map(item => item['id']) }
		axios.post('users', user).then((resp) => {
			props.dispatch({type: 'create', payload: resp.data})
			NotificationManager.success('User Created', 'Success');
			setUser(initialState);
			history.push('/users')
		});		
	}

	const update = () =>{
		// let vehicle_ids = vehicles.map((item) => {
		// 	return { id: item['id'],
		// 					 delete: item['delete'] ? true : false}
		// })
		// let data = {...owner, vehicle_ids: vehicle_ids }
		axios.put('users/'+user.id, user).then((resp) => {
			props.dispatch({type: 'update', payload: resp.data})
			NotificationManager.success('User Updated', 'Success');
			setUser(initialState);
			history.push('/users')
		});		
	}

	  const handleChange = (event) => {
  	let key = event.target.name
  	setUser(prevState => ({...prevState, [key]: event.target.value}) )
  }


   // const handleRemoveRole = (event) => {
  // 	let id = event.target.value;
  // 	let index = vehicles.findIndex(item => item.id==id)
  //   setVehicle(prevState => prevState.map((item, key)=>{
  //   	if(key==index){
  //   		item['delete']=true;
  //   	}
  //   	return item;
  //   }))
  // }


	return(
		<div>
			<Form onSubmit={handleSubmit}>
			  <Form.Group className="mb-3" controlId="Form.ControlInput2">
			    <Form.Label>Name</Form.Label>
			    <Form.Control type="text" name="name" value={user.name}  placeholder="Name" onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Form.ControlInput3">
			    <Form.Label>Email</Form.Label>
			    <Form.Control type="email" name="email" value={user.email} placeholder="Email" onChange={handleChange} />
			  </Form.Group>

			  <Form.Group className="mb-3" controlId="Form.ControlTextarea4">
			    <Form.Label>Phone</Form.Label>
			    <Form.Control type="text" name="phone" value={user.phone} placeholder="Phone"  onChange={handleChange} />
			  </Form.Group>
			  
			  <Button type="submit">Save</Button>
			  <Link to="/users">Cancel</Link>
			</Form>
		</div>
	);
}