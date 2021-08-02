import React,{useReducer, useEffect, useState} from 'react';
import {UserReducer} from '../reducers'
import axios from 'axios';
import {ListUsers, CreateUser, ViewUser} from '../components'
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";

const initialState = {
	users: []
}

export default function Users() {
	const [state, dispatch ] = useReducer(UserReducer, initialState);
	const [is_loading, setIsLoading] = useState(false);
	useEffect(()=> {
		setIsLoading(true)
		axios.get('users').then((resp) => {
			dispatch({type: 'index', payload: resp.data});
			setIsLoading(false)
		});
	}, [])

	let { path, url } = useRouteMatch();

	return(
		<div>
		 <Switch>
        <Route exact path={path}>
        	<Link to={`${url}/add`} className='btn btn-primary'>Add Users</Link>
           <ListUsers users={state.users} dispatch={dispatch} loading={is_loading} />
        </Route>
        <Route path={`${path}/add`}>
          <CreateUser dispatch={dispatch} />
        </Route>

        <Route path={`${path}/:id/edit`}>
          <CreateUser dispatch={dispatch} />
        </Route>

        <Route path={`${path}/:id`}>
          <ViewUser dispatch={dispatch} />
        </Route>
      </Switch>
		
		</div>
	);
}


