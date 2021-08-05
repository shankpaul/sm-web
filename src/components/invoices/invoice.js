import React,{useState, useEffect} from 'react';
import {Form,ButtonGroup, Button, Container, Row, Col, Table} from 'react-bootstrap';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import './invoice.css'

function InvoiceTotal(props){
	return(
		<tr>
			<td colSpan="3"></td>
			<td align="right">Total</td>
			<td>{props.total || 0}</td>
		</tr>  
	)
}

function CustomerInfo(props){
	return(
		<Col>
			<h4>To</h4>
			<div>{props.name}</div>
			<div>{props.address}</div>
			<div>{props.email}</div>
		</Col>
	)
}

function InvoiceInfo(props){
	return(
		<Col>
			<h4>Invoice</h4>
			<div>Invoice ID: #{props.invoice_code}</div>
			<div>Invoice Date: {props.date}</div>
			<div>Invoice State: {props.status}</div>
		</Col>
  )
}

function ExportActions(props){
	return(
		<Row>
		 <ButtonGroup className="float-right" >
			  <Button variant="secondary">Print</Button>
			  <Button variant="secondary">Excel</Button>
			  <Button variant="secondary">Email</Button>
			</ButtonGroup>
		</Row>
  )
}

function InvoiceItem(props){
	return(
		<tr>
		  <td>{props.sl_no}</td>
		  <td>
		  <Form.Control type="text" name="name" 
		  	item_id={props.item.id}
			  value={props.item.name} placeholder="Description" 
			  onChange={props.onEdit} />
		  </td>
		  <td>
		  	 <Form.Control type="number" name="unit_price" 
		  	item_id={props.item.id}
			  value={props.item.unit_price} placeholder="Unit Price" 
			  onChange={props.onEdit} />
		  </td>
		  <td>
		  	<Form.Control type="number" name="quantity" 
		  	item_id={props.item.id}
			  value={props.item.quantity} placeholder="Quantity" 
			  onChange={props.onEdit} />
		  </td>		  
		  <td>{props.item.amount}</td>
		  <td>
		  	<Button size="sm" id={props.item.id} onClick={props.onDelete} variant="danger">x</Button>
		  </td>
		</tr>
	)
}

function AddInvoiceItem(props){
	const initalState = {
		id: '',
		name: '',
		quantity: 1,
		unit_price: '',
		amount: '0.00'
	}
	const [item, setItem] = useState(initalState)

	useEffect(()=>{
		console.log('reached component')
		let amount = item.unit_price * item.quantity;
		if(!isNaN(amount)){
			setItem(prevState => ({...prevState, amount: amount}) )		
		}		
	},[item.unit_price,item.quantity])

	const handleChange = (event) => {
  	const key = event.target.name;
  	const value = event.target.value
  	const unique_id = new Date().getTime();
  	setItem(prevState => ({...prevState, [key]: value, id: unique_id}))
  }

  const handleKeyPress = (event) => {
  	if(event.key === 'Enter'){
  		if(item.name!=="" && item.unit_price !== "" && item.quantity > 0){
  			props.onAdd(item);
    		setItem(initalState)	
  		}else if(event.target.value !=="")
  		{
  			 const next_tabindex = parseInt(event.target.tabIndex)+1;
  			 document.querySelector('input[tabindex="'+next_tabindex+'"]').focus();
  		}    	
  	}
  }

	return(
		<tr>
		  <td></td>
		  <td>
		  	<Form.Control autoFocus type="text" name="name"  tabIndex="1" value={item.name} onKeyPress={handleKeyPress}  placeholder="Description" onChange={handleChange} />
		  </td>
		  <td>
		  	<Form.Control type="text" name="unit_price" tabIndex="2"  value={item.unit_price} onKeyPress={handleKeyPress}   placeholder="Unit Price" onChange={handleChange} />
		  </td>
		   <td>
		  	<Form.Control type="text" name="quantity" tabIndex="3"  value={item.quantity} onKeyPress={handleKeyPress}  placeholder="Quantity" onChange={handleChange} />
		  </td>
		  <td>{item.amount}</td>
		</tr>
	)
}

function InvoiceActions(props){
	return(
		<Row>
			<Button variant="warning">Save</Button> | 
			<Button variant="success" onClick={props.onPayment} >Pay Now</Button>
		</Row>
	)
}

export default function Invoice(props){
	const [items, setItems] = useState(props.invoice.invoice_items || [])

	const handleAdd = (item) =>{
		setItems(prevState => [...prevState, item])
	}

	const total = items.map(h=>h.amount).reduce((a, b) => a + b, 0)

	const handleDelete = (event) => {
		const id = event.target.id;
		setItems(prevState => [...prevState.filter(item => item.id===id)])
	}

	const handleEdit = (event) =>{
		const id = event.target.attributes.item_id.value;
		const key = event.target.name;
		const value = event.target.value;

		setItems(prevState => prevState.map(item=>{
    	if(String(item.id)===id){
    		item[key]=value;
    		let amount = item.unit_price * item.quantity;
				if(!isNaN(amount)){
					item.amount=amount;
				}		
    	}
    	return item;
    }))
	}

	return(
	<Container>
		<ExportActions />	
		<Row>
			<CustomerInfo name={props.invoice.customer_name} 
								   	email={props.invoice.customer_email} 
									  address={props.invoice.customer_address} />
			<InvoiceInfo invoice_code={props.invoice.code} 
									 data={props.invoice.created_at}
									 status={props.status} />		          
		</Row>	
		<hr />
		<Row>
			<Table>
				<thead>
					<tr>
						<th>Sl No.</th>
						<th>Description</th>
						<th>Unit Price</th>
						<th>Qty</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item, index) => <InvoiceItem key={item.id}
																									 onEdit={handleEdit} 
																									 item={item} 
																									 sl_no={index+1}
																									 onDelete={handleDelete} /> )}		            
					<AddInvoiceItem onAdd={handleAdd}/>	 
					<InvoiceTotal total={total} />
				</tbody>
			</Table>			
		</Row>  
		<InvoiceActions onSave={props.onSave} onPay={props.onPayment} />
	</Container>
	);
}

