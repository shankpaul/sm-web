import React from 'react';
import {Button, Table} from 'react-bootstrap';
import {NotificationManager} from 'react-notifications';
import axios from 'axios';
import {Link, useHistory} from "react-router-dom";


export default function ListInvoices(props){
	let history = useHistory();
	const handleDelete = (event) => {
		let id = event.target.value;
		axios.delete('invoices/'+id).then((resp)=>{
			props.dispatch({type: 'delete', payload: {id: id}})
			NotificationManager.success('Owner Deleted', 'Success');
			history.push('/invoices')
		});
	}

	return(
		<Table striped bordered hover size="sm">
			<thead>
			<tr>
				<th>Invoice Code</th>
				<th>Date</th>
				<th>Amount</th>
				<th>Paid</th>
				<th>Status</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
		{props.loading && <tr><td colSpan="6">Loading..</td></tr>}
		{props.invoices.map(invoice => 
			<tr key={invoice.id}>
				<td>{invoice.code}</td>
				<td>{invoice.created_at}</td>
				<td>{invoice.net_amount}</td>
				<td>{invoice.paid_amount}</td>
					<td>{invoice.status}</td>
				<td>
				<Button variant="primary" size="sm" onClick={handleDelete} value={invoice.id}>
				Delete</Button> |  
				<Link to={`/invoices/${invoice.id}/edit`}>Edit</Link> | 
				<Link to={`/invoices/${invoice.id}`}>Show</Link>
				</td>
				
			</tr>
		)}
	</tbody>
	</Table>
	)

}