import React,{useReducer, useEffect} from 'react';
import {Table, Button} from 'react-bootstrap';
import ServiceReducer from '../reducers/service_reducer'
import axios from 'axios';
import {ListServices, CreateService} from '../components'
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";


const initialState = {
	services: []
}

export default function Services() {
	const [state, dispatch ] = useReducer(ServiceReducer, initialState);
	useEffect(()=> {
		axios.get('services').then((resp) => {
			dispatch({type: 'index', payload: resp.data})
		});
	}, [])

	let { path, url } = useRouteMatch();

	return(
		<div>
		 <Switch>
        <Route exact path={path}>
        	<Link to={`${url}/add`} className='btn btn-primary'>Add Service</Link>
           <ListServices services={state.services} dispatch={dispatch} />
        </Route>
        <Route path={`${path}/:add`}>
          <CreateService dispatch={dispatch} />
        </Route>
      </Switch>
		
		</div>
	);
}


