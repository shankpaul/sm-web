import React,{useReducer, useEffect, useState} from 'react';
import {Table, Button} from 'react-bootstrap';
import {VehicleReducer} from '../reducers'
import axios from 'axios';
import {ListVehicles, CreateVehicle,ViewVehicle} from '../components'
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";


const initialState = {
	vehicles: []
}

export default function Vehicles() {
	const [state, dispatch ] = useReducer(VehicleReducer, initialState);
	const [is_loading, setIsLoading] = useState(false);
	useEffect(()=> {
		setIsLoading(true)
		axios.get('vehicles').then((resp) => {
			dispatch({type: 'index', payload: resp.data});
			setIsLoading(false)
		});
	}, [])

	let { path, url } = useRouteMatch();

	return(
		<div>
		 <Switch>
        <Route exact path={path}>
        	<Link to={`${url}/add`} className='btn btn-primary'>Add Vehicles</Link>
           <ListVehicles vehicles={state.vehicles} dispatch={dispatch} loading={is_loading} />
        </Route>

          <Route exact path={`${path}/add`}>
          <CreateVehicle dispatch={dispatch} />
        </Route>

         <Route exact path={`${path}/:id/edit`}>
          <CreateVehicle dispatch={dispatch} />
        </Route>


      
         <Route exact path={`${path}/:id`}>
          <ViewVehicle dispatch={dispatch} />
        </Route>

       
      </Switch>
		
		</div>
	);
}


