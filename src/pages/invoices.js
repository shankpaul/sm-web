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
		console.log('reached page')
		axios.get('invoices').then((resp) => {
			dispatch({type: 'index', payload: resp.data});
			setIsLoading(false)
		});
	}, [])

	let { path, url } = useRouteMatch();

	return(
		<div>
		 <Switch>
        <Route exact path={path}>
        	<Link to={`${url}/add`} className='btn btn-primary'>Add Invoice</Link>
           <ListInvoices invoices={state.invoices} dispatch={dispatch} loading={is_loading} />
        </Route>
        <Route path={`${path}/add`}>
          <CreateInvoice dispatch={dispatch} />
        </Route>

        <Route path={`${path}/:id/edit`}>
          <CreateInvoice dispatch={dispatch} />
        </Route>

        <Route path={`${path}/:id`}>
          <ViewInvoice dispatch={dispatch} />
        </Route>
      </Switch>
		
		</div>
	);
}


