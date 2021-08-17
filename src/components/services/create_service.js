import React,{useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import {VehicleSearch} from '../index'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import {useParams, Link} from "react-router-dom";
import { serialize } from 'object-to-formdata';

import 'react-bootstrap-typeahead/css/Typeahead.css';

const initialState = {
	id:'',
	complaint: '',
	vehicle: {}, 
	vehicle_id: '',
	images:[],
	deleted_image_ids:[]
}

export default function CreateService(props){
	let params = useParams();
	// let history = useHistory();
	
	const [service, setService] = useState(initialState)
	const [service_history, setServiceHistory] = useState([])
	const [selected_vehicle, setSelectedVehicle] = useState([])
	const [service_images, setServiceImages] = useState([])

	useEffect(()=>{
		if(params.id){
			loadService(params.id)
		}
	},[params.id])

	const loadService = (id) => {
		let obj = {}
		axios.get('services/'+id).then((resp)=>{
			Object.keys(initialState).forEach((item) => { 
				if(typeof(resp.data.service[item])!=='undefined'){
				 obj[item]=resp.data.service[item]
				}
			});

			if(resp.data.service.image_urls.length >0){
				setServiceImages(resp.data.service.image_urls);
			}

			setService(prevState =>({...prevState, ...obj}))
			setServiceHistory(resp.data.history)
			setSelectedVehicle([{id: obj.vehicle_id, reg_number: obj.vehicle.reg_number}])
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		service.id ? update() : create()
	}

	const create = () =>{
		axios.post('services',serialize(service)).then((resp) => {
			props.dispatch({type: 'create', payload: resp.data})
			NotificationManager.success('Service Created', 'Success');
			setService(initialState);
			// history.push('/services')
		});			
	}

	const update = () =>{
		axios.put('services/'+service.id, serialize(service)).then((resp) => {
			props.dispatch({type: 'update', payload: resp.data})
			NotificationManager.success('Service Updated', 'Success');
			// history.push('/services')
		});		
	}

	const handleVehicleSearch = (selectedOptions) => {
		let option = selectedOptions[0]
		setSelectedVehicle([option]);
    setService(prevState =>({...prevState, vehicle_id: option.id}))
  }

  const handleChange = (event) => {
  	let key = event.target.name;
  	setService(prevState => ({...prevState, [key]: event.target.value}) )
  }

  const handleImageChange = (event) => {
  	setService(prevState => ({...prevState, images: [...service.images, ...event.target.files]}) )
  }


  const handleImageDelete = (key, file) => {
  	let deleted_image_ids = service.deleted_image_ids;
  	if(typeof(file.id)!=='undefined'){
  		deleted_image_ids = [...deleted_image_ids, file['id']]
  		setServiceImages(prevState => (service_images.filter((item) => item.id!==file.id)))
  		setService(prevState => ({...prevState, deleted_image_ids: deleted_image_ids }))
  	}
  	else
  	{
  		setService(prevState => ({...prevState, images: service.images.filter((item, index) => index!==key) }))
  	} 	
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
			  <Form.Group className="mb-3" controlId="Form.ControlTextarea6">
			    <Form.Label>Vehicle Pictures</Form.Label>
			    	<input type="file" multiple="multiple" accept="image/*" capture="environment" onChange={handleImageChange} placeholder="Vehicle Picture" />
			   	</Form.Group>
			  <Button type="submit">Save</Button>
			</Form>

			<ImagePreview images={[...service.images, ...service_images]} handleImageDelete={handleImageDelete} />
			  
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



 const ImagePreview = (props) => {
  return (
    <div>
    {
    	props.images && props.images.map((image, key) => 
    		<div key={key} >
	    		<img width="150" src={ typeof(image.id)==='undefined'? URL.createObjectURL(image) : image.url } />
	    		<Button onClick={()=>props.handleImageDelete(key, image)}>delete</Button>
    		</div>
    	)
    }
    </div>
  );
};