import React,{useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import {OwnerSearch} from '../index'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import {useParams, useHistory} from "react-router-dom";
import { serialize } from 'object-to-formdata';
// import Camera,{FACING_MODES}from 'react-html5-camera-photo';

// import 'react-html5-camera-photo/build/css/index.css';
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
	owner: {},
	images:[],
	camera:[],
	deleted_image_ids:[]
}

export default function CreateVehicle(props){
	let params = useParams();
	let history = useHistory();

	const [vehicle, setVehicle] = useState(initialState)
	const [vehicle_images, setVehicleImages] = useState([])

	useEffect(()=>{
		if(params.id){
			loadVehicle(params.id)
		}
	},[params.id])

	const loadVehicle = (id) => {
		let obj = {}
		axios.get('vehicles/'+id).then((resp)=>{
			Object.keys(initialState).forEach((item) => { 
				if(typeof(resp.data[item])!=='undefined'){
				 obj[item]=resp.data[item];
				}
			})

			if(resp.data.image_urls.length >0)
			{
				setVehicleImages(resp.data.image_urls);
			}
			setVehicle(prevState =>({...prevState, ...obj}))
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		vehicle.id ? update() : create()
	}

	const create = () =>{
		axios.post('vehicles', serialize(vehicle)).then((resp) => {
			props.dispatch({type: 'create', payload: resp.data})
			NotificationManager.success('Vehicle Created', 'Success');
			setVehicle(initialState);
			history.push('/vehicles')
		});			
	}

	const update = () =>{
		axios.put('vehicles/'+vehicle.id, serialize(vehicle)).then((resp) => {
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

  const handleImageChange = (event) => {
  	setVehicle(prevState => ({...prevState, images: [...vehicle.images, ...event.target.files]}) )
  }

  const handlePhoto = (cam_data) => {
  	console.log(vehicle.camera)
  	let images = vehicle.camera ? [...vehicle.camera, cam_data] : [cam_data];
  	setVehicle(prevState => ({...prevState, camera: images }) )
  }

  const handleImageDelete = (key, file) => {
  	let deleted_image_ids = vehicle.deleted_image_ids;
  	if(typeof(file.id)!=='undefined'){
  		deleted_image_ids = [...deleted_image_ids, file['id']]
  		setVehicleImages(prevState => (vehicle_images.filter((item) => item.id!==file.id)))
  		setVehicle(prevState => ({...prevState, deleted_image_ids: deleted_image_ids }))
  	}
  	else
  	{
  		setVehicle(prevState => ({...prevState, images: vehicle.images.filter((item, index) => index!==key) }))
  	} 	
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

			   <Form.Group className="mb-3" controlId="Form.ControlTextarea6">
			    <Form.Label>Vehicle Pictures</Form.Label>
			    <input type="file" multiple="multiple" accept="image/*" capture="environment" onChange={handleImageChange} placeholder="Vehicle Picture" />
			    {/*<Camera onTakePhoto={handlePhoto} idealFacingMode={FACING_MODES.ENVIRONMENT} isImageMirror={false} />
			    <Form.Control type="file" capture multiple name="images"  />*/}
			  </Form.Group>

			  <ImagePreview images={[...vehicle.images, ...vehicle_images]} handleImageDelete={handleImageDelete} />
			  
			  <Button type="submit">Save</Button>
			</Form>
		</div>
	);
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