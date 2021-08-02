import React,{useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import {VehicleSearch} from '../index'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import {useParams, useHistory, Link} from "react-router-dom";

import 'react-bootstrap-typeahead/css/Typeahead.css';

const initialState = {
	id:'',
	complaint: '',
	vehicle: {}, 
	vehicle_id: ''
}

export default function CreateService(props){
	let params = useParams();
	let history = useHistory();
	let selected_vehicle = []

	const [service, setService] = useState(initialState)
	const [service_history, setServiceHistory] = useState([])

	useEffect(()=>{
		if(params.id){
			loadService(params.id)
		}
	},[])

	const loadService = (id) => {
		let obj = {}
		axios.get('services/'+id).then((resp)=>{
			Object.keys(initialState).map((item) => { obj[item]=resp.data.service[item] })
			setService(prevState =>({...prevState, ...obj}))
			setServiceHistory(resp.data.history)
			selected_vehicle = [{id: obj.vehicle_id, reg_number: 'as'}]
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		service.id ? update() : create()
	}

	const create = () =>{
		axios.post('services',service).then((resp) => {
			props.dispatch({type: 'create', payload: resp.data})
			NotificationManager.success('Service Created', 'Success');
			setService(initialState);
			// history.push('/services')
		});			
	}

	const update = () =>{
		axios.put('services/'+service.id, service).then((resp) => {
			props.dispatch({type: 'update', payload: resp.data})
			NotificationManager.success('Service Updated', 'Success');
			// history.push('/services')
		});		
	}

	const handleVehicleSearch = (selectedOptions) => {
		let option = selectedOptions[0]
    setService(prevState =>({...prevState, vehicle_id: option.id}))
  }

  const handleChange = (event) => {
  	let key = event.target.name;
  	setService(prevState => ({...prevState, [key]: event.target.value}) )
  }

	return(
		<div>
			<Form onSubmit={handleSubmit}>
				<div>{service.vehicle && service.vehicle.reg_number}</div>

			  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
			    <Form.Label>Vehicle</Form.Label>
			    <VehicleSearch name="v_search" onChange={handleVehicleSearch} selected={selected_vehicle}/>
			  </Form.Group>
			  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
			    <Form.Label>Complaint</Form.Label>
			    <Form.Control name="complaint" value={service.complaint} as="textarea" rows={3} onChange={handleChange}/>
			  </Form.Group>
			  <Button type="submit">Save</Button>
			</Form>
			<h3>Service History </h3>
			{service_history ? <ServiceHistory history={service_history}/> : 'No History'}
		</div>
	);
}

const ServiceHistory = (props) => {
	return (
		<ul>
		{props.history.map(item => <li><Link to={`/services/${item.id}`}>{item.created_at}</Link></li>)}
		</ul>
		)
}