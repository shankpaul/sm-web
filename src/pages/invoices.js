import React,{useReducer, useEffect, useState} from 'react';
import {InvoiceReducer} from '../reducers'
import axios from 'axios';
import {ListInvoices, CreateInvoice, ViewInvoice} from '../components'
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";

const initialState = {
	invoices: []
}

export default function Invoices() {
	const [state, dispatch ] = useReducer(InvoiceReducer, initialState);
	const [is_loading, setIsLoading] = useState(false);
	useEffect(()=> {
		setIsLoading(true)
	
		axios.get('invoices').then((resp) => {
			dispatch({type: 'index', payload: resp.data});
			setIsLoading(false)
		});
	}, [])

		console.log('reached page')

	let { path, url } = useRouteMatch();

	return(
		<div>
		 <Switch>
        <Route exact path={path}>
        	<Link to={`${url}/add`} className='btn btn-primary'>Add Invoice</Link>
           <ListInvoices invoices={state.invoices} dispatch={dispatch} loading={is_loading} />
        </Route>
        <Route exact path={`${path}/add`}>
          <CreateInvoice dispatch={dispatch} />
        </Route>

        <Route exact path={`${path}/:id/edit`}>
          <CreateInvoice dispatch={dispatch} />
        </Route>

        <Route exact path={`${path}/:id`}>
          <ViewInvoice dispatch={dispatch} />
        </Route>
      </Switch>
		
		</div>
	);
}


