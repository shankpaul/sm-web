import React,{useReducer, useEffect, useState} from 'react';
import {Table, Button} from 'react-bootstrap';
import {ServiceReducer} from '../reducers'
import axios from 'axios';
import {ListServices, CreateService, ViewService} from '../components'
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";

const initialState = {
	services: []
}

export default function Services() {
	const [state, dispatch ] = useReducer(ServiceReducer, initialState);
	const [is_loading, setIsLoading] = useState(false);
	useEffect(()=> {
		setIsLoading(true)
		axios.get('services').then((resp) => {
			dispatch({type: 'index', payload: resp.data});
			setIsLoading(false)
		});
	}, [])

	let { path, url } = useRouteMatch();

	return(
		<div>
		 <Switch>
        <Route exact path={path}>
        	<Link to={`${url}/add`} className='btn btn-primary'>Add Service</Link>
           <ListServices services={state.services} dispatch={dispatch} loading={is_loading} />
        </Route>
        <Route exact path="services/add">
          <CreateService dispatch={dispatch} />
        </Route>
        <Route exact path="/services/:id/edit">
          <CreateService dispatch={dispatch} />
        </Route>

         <Route exact path="/services/:id">
          <ViewService dispatch={dispatch} />
        </Route>
      </Switch>
		
		</div>
	);
}


