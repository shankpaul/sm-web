import React,{useReducer, useEffect, useState} from 'react';
import {Table, Button} from 'react-bootstrap';
import {OwnerReducer} from '../reducers'
import axios from 'axios';
import {ListOwners, CreateOwner} from '../components'
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";


const initialState = {
	owners: []
}

export default function Owners() {
	const [state, dispatch ] = useReducer(OwnerReducer, initialState);
	const [is_loading, setIsLoading] = useState(false);
	useEffect(()=> {
		setIsLoading(true)
		axios.get('owners').then((resp) => {
			dispatch({type: 'index', payload: resp.data});
			setIsLoading(false)
		});
	}, [])

	let { path, url } = useRouteMatch();

	return(
		<div>
		 <Switch>
        <Route exact path={path}>
        	<Link to={`${url}/add`} className='btn btn-primary'>Add Owners</Link>
           <ListOwners owners={state.owners} dispatch={dispatch} loading={is_loading} />
        </Route>
        <Route path={`${path}/:add`}>
          <CreateOwner dispatch={dispatch} />
        </Route>
      </Switch>
		
		</div>
	);
}


