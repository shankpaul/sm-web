import React, {useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';

const initialState = [
	{name: 'admin', label: 'Admin', checked: false},
	{name: 'service_advisor',label: 'Service Advisor', checked: false}
]

export default function UserRole(props) {

	const [roles, setRoles] = useState(initialState);
	useEffect(()=>{
		let filtered_roles = props.selected_roles.filter(item=>item.checked).map(item=> item.name)
		setRoles(prevState => prevState.map((item, key)=>{
    	item.checked = filtered_roles.includes(item.name)
    	return item;
    }));
	},[props.selected_roles])

	const handleChange = (event) => {
		let name = event.target.name;
		let checked = event.target.checked;
  	let index = roles.findIndex(item => item.name===name);
		setRoles(prevState => prevState.map((item, key)=>{
    	if(key===index){
    		 item.checked = checked
    	}
    	return item;
    }));
    props.onChange(roles)
	}

	return(
		<div>
			<h3>Roles</h3>
			<ul>
			{roles.map(item => 
				<li key={item.name}> 
					<Form.Check  label={item.label} 
										 	 name={item.name} 
										 	 checked={item.checked}
											 onChange={handleChange} />
				</li>
			)}
				
			</ul>
		</div>
		)
}