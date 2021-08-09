import React,{useState, useEffect} from 'react';
import {Form,ButtonGroup, Button, Container, Row, Col, Table, Modal} from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";

import 'react-bootstrap-typeahead/css/Typeahead.css';
import './invoice.css'

function InvoiceTotal(props){
	const balance = props.gross - props.paid;
	return(
		<>
		<tr>
			<td colSpan="3"></td>
			<td align="right">Gross</td>
			<td>{props.gross || 0}</td>
		</tr> 
		<tr>
			<td colSpan="3"></td>
			<td align="right">Paid</td>
			<td>-{props.paid || 0}</td>
		</tr> 
		<tr>
			<td colSpan="3"></td>
			<td align="right"><h3>Total</h3></td>
			<td><h3>{balance || 0}</h3></td>
		</tr>  
		</>
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

function ServiceInfo(props){
	return(
		<Col>
			<h4>Service</h4>
			<div>Service Code: <Link to={`/services/${props.id}`}>#{props.invoice_code}</Link></div>
			<div>Service Date: {props.date}</div>
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
		  <Form.Control type="text" name="description" 
		  	item_id={props.item.id}
			  value={props.item.description} placeholder="Description" 
			  onChange={props.onEdit} />
		  </td>
		  <td>
		  	 <Form.Control type="number" name="rate" 
		  	item_id={props.item.id}
			  value={props.item.rate} placeholder="Unit Price" 
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
		description: '',
		quantity: 1,
		rate: '',
		amount: '0.00'
	}
	const [item, setItem] = useState(initalState)

	useEffect(()=>{
		console.log('reached component')
		let amount = item.rate * item.quantity;
		if(!isNaN(amount)){
			setItem(prevState => ({...prevState, amount: amount}) )		
		}		
	},[item.rate,item.quantity])

	const handleChange = (event) => {
  	const key = event.target.name;
  	const value = event.target.value
  	// const unique_id = new Date().getTime();
  	setItem(prevState => ({...prevState, [key]: value}))
  }

  const handleKeyPress = (event) => {
  	if(event.key === 'Enter'){
  		if(item.description!=="" && item.rate !== "" && item.quantity > 0){
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
		  	<Form.Control autoFocus type="text" name="description"  tabIndex="1" value={item.description} onKeyPress={handleKeyPress}  placeholder="Description" onChange={handleChange} />
		  </td>
		  <td>
		  	<Form.Control type="text" name="rate" tabIndex="2"  value={item.rate} onKeyPress={handleKeyPress}   placeholder="Unit Price" onChange={handleChange} />
		  </td>
		   <td>
		  	<Form.Control type="text" name="quantity" tabIndex="3"  value={item.quantity} onKeyPress={handleKeyPress}  placeholder="Quantity" onChange={handleChange} />
		  </td>
		  <td>{item.amount}</td>
		</tr>
	)
}

function InvoicePaymentForm(props){
	const [payment, setPayment]=useState({
		payment_mode: 'Cash',
		card_number:'',
		amount: props.amount
	});

	const handlePaymentEdit = (event) => {
		const key = event.target.name;
		setPayment(prevState => ({...prevState, [key]: event.target.value}))
	}
	return(
		 <Modal
		  show={props.show}
      onHide={props.onHide}
      size="sm"
      aria-labelledby="payment-form"
      centered
    >
      <Modal.Header closeButton>
	      <Modal.Title >Payment Mode</Modal.Title>
	    </Modal.Header>
	      <Modal.Body>
	        <Form.Group controlId="Mode">
			      <Form.Label>Payment Mode</Form.Label>
			      <Form.Control as="select" name="payment_mode" onChange={handlePaymentEdit} 
			      							defaultValue={payment.payment_mode}>
			        <option>Cash</option>
			        <option>Card</option>
			      </Form.Control>
			    </Form.Group>
			  
			  { payment.payment_mode == 'Card' &&
			    <Form.Group controlId="ModeNumber">
			      <Form.Label>Number (last 4 digit)</Form.Label>
			      <Form.Control onChange={handlePaymentEdit} name="card_number"
			      							value={payment.card_number} />
			    </Form.Group>
			  }

		    <Form.Group controlId="Amount">
		      <Form.Label>Amount</Form.Label>
		      <Form.Control value={payment.amount} name="amount" onChange={handlePaymentEdit}/>
		    </Form.Group>


      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.addPayment(payment, props.onHide)}>Pay</Button>
      </Modal.Footer>
    </Modal>
	)
}

function InvoiceActions(props){
	const [modalShow, setModalShow] = useState(false);

  return (
    <>
    	<Row> 
				<Button variant="success" onClick={() => setModalShow(true)} >Pay Now</Button>
			</Row>
      <InvoicePaymentForm 
        amount={props.amount}
        addPayment={props.onAddPayment}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

export default function Invoice(props){
	const [items, setItems] = useState(props.invoice['invoice_items'])
	const [payments, setPayments] = useState(props.invoice['invoice_payments'])
	const gross = items.map(h=>h.amount).reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
	const paid = payments.map(h=>h.amount).reduce((a, b) => parseFloat(a) + parseFloat(b), 0)

	const handlePayment = (payment, cb) => {
		axios.post('invoices/'+props.invoice.id+'/invoice_payments', payment).then((resp)=>{
			setPayments(prevState => [...prevState, resp.data]);
			cb();
		});
	}

	const handleAdd = (item) =>{
		axios.post('invoices/'+props.invoice.id+'/invoice_items',item).then((resp)=>{
			setItems(prevState => [...prevState, resp.data]);
		});
	}

	const handleDelete = (event) => {
		const id = event.target.id;
		axios.delete('invoices/'+props.invoice.id+'/invoice_items/'+id).then((resp)=>{
			setItems(prevState => [...prevState.filter(item => item.id!==parseInt(id))])
		});
		
	}

	const handleEdit = (event) =>{
		const id = event.target.attributes.item_id.value;
		const key = event.target.name;
		const value = event.target.value;		

		setItems(prevState => prevState.map(item=>{
    	if(String(item.id)===id){
    		item[key]=value;
    		let amount = item.rate * item.quantity;
				if(!isNaN(amount)){
					item.amount=amount;
				}		
    	}
    	return item;
    }));

    if(value!==""){
			axios.put('invoices/'+props.invoice.id+'/invoice_items/'+id, {[key]: value}).then((resp)=>{
				setItems(prevState => prevState.map(item=>{
					if(parseInt(item.id)==parseInt(id)){
						item = resp.data;
					}
					return item;
				}));

			});
		}	
	}

	return(
	<Container>
		<ExportActions />	
		<Row>
			<CustomerInfo name={props.invoice.customer_name}
								   	email={props.invoice.customer_email} 
									  address={props.invoice.customer_address} />
			<InvoiceInfo invoice_code={props.invoice.code} 
									 date={props.invoice.created_at}
									 status={props.status} />
			<ServiceInfo service_code={props.service.code} id={props.service.id}
									 date={props.service.created_at} />	        
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
					{items && items.map((item, index) => <InvoiceItem key={item.id}
																									 onEdit={handleEdit} 
																									 item={item} 
																									 sl_no={index+1}
																									 onDelete={handleDelete} /> )}		            
					<AddInvoiceItem onAdd={handleAdd}/>	 
					<InvoiceTotal gross={gross} paid={paid} />
				</tbody>
			</Table>			
		</Row>  
		<InvoiceActions onAddPayment={handlePayment} amount={gross-paid} />
	</Container>
	);
}

