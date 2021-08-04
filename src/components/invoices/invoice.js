import React,{useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import './invoice.css'

function InvoiceTotal(props){
	return(
		<>
			<div className="row my-2 align-items-center bgc-primary-l3 p-2">
			  <div className="col-7 text-right">
			    Total Amount
			  </div>
			  <div className="col-5">
			    <span className="text-150 text-success-d3 opacity-2">{props.total_amount}</span>
			  </div>
			</div>
		</>
	)
}

function CustomerInfo(props){
	return(
		<>
			<div className="col-sm-6">
			  <div>
			    <span className="text-sm text-grey-m2 align-middle">To:</span>
			    <span className="text-600 text-110 text-blue align-middle">{props.customer.name}</span>
			  </div>
			  <div className="text-grey-m2">
			    <div className="my-1">
			     {props.customer.address}
			    </div>
			    <div className="my-1">
			      {props.customer.email}
			    </div>
			    <div className="my-1">
				    <i className="fa fa-phone fa-flip-horizontal text-secondary"></i>
				    <b className="text-600">{props.customer.phone}</b>
			    </div>
			  </div>
			</div>
		</>
	)
}

function InvoiceInfo(props){
	return(
		<div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
		  <hr className="d-sm-none" />
		  <div className="text-grey-m2">
		    <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
		      Invoice
		    </div>

		    <div className="my-2">
		      <i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> 
		      <span className="text-600 text-90">ID:</span> #{props.invoice_code}
		    </div>

		    <div className="my-2">
		      <i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> 
		      <span className="text-600 text-90">Issue Date:</span> {props.date}
		    </div>

		    <div className="my-2">
		      <i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> 
		      <span className="text-600 text-90">Status:</span> 
		      <span className="badge badge-warning badge-pill px-25">{props.status}</span>
		    </div>
		  </div>
		</div>
  )
}

function ExportActions(props){
	return(
		<div className="page-tools">
		  <div className="action-buttons">
		    <a className="btn bg-white btn-light mx-1px text-95" href="#" data-title="Print">
		      <i className="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
		      Print
		    </a>
		    <a className="btn bg-white btn-light mx-1px text-95" href="#" data-title="PDF">
		      <i className="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
		      Export
		    </a>
		  </div>
		</div>
  )
}

function InvoiceItem(props){
	return(
		<div className="row mb-2 mb-sm-0 py-25">
		  <div className="d-none d-sm-block col-1">1</div>
		  <div className="col-9 col-sm-5">Domain registration</div>
		  <div className="d-none d-sm-block col-2">2</div>
		  <div className="d-none d-sm-block col-2 text-95">$10</div>
		  <div className="col-2 text-secondary-d2">$20</div>
		</div>
	)
}

function AddInvoiceItem(props){
	const [item, setItem] = useState({})
	return(
		<div className="row mb-2 mb-sm-0 py-25">
		  <div className="d-none d-sm-block col-1">#</div>
		  <div className="col-9 col-sm-5">
		  	<Form.Control type="text" name="name" value={owner.name} placeholder="Owner Name" onChange={handleChange} />
		  </div>
		  <div className="d-none d-sm-block col-2">
		  	<Form.Control type="text" name="name" value={owner.name} placeholder="Owner Name" onChange={handleChange} />
		  </div>
		  <div className="d-none d-sm-block col-2 text-95">
		  	<Form.Control type="text" name="name" value={owner.name} placeholder="Owner Name" onChange={handleChange} />
		  </div>
		  <div className="col-2 text-secondary-d2">
		  	<Form.Control type="text" name="name" value={owner.name} placeholder="Owner Name" onChange={handleChange} />
		  </div>
		</div>
	)
}

export default function Invoice(props){

	return(
		<div className="page-content container">
		  <div className="page-header text-blue-d2">
		    <h1 className="page-title text-secondary-d1">
		      Invoice 
		      <small className="page-info">
		        <i className="fa fa-angle-double-right text-80"></i>
		        ID: #{props.invoice.code}
		      </small>
		    </h1>
		    <ExportActions />		    
		  </div>

		  <div className="container px-0">
		    <div className="row mt-4">
		      <div className="col-12 col-lg-10 offset-lg-1">
		        <div className="row">
		          <CustomerInfo customer={props.customer} />
		          <InvoiceInfo invoice_code={props.invoice.code} 
		          						 data={props.invoice.created_at}
		          						 status={props.status} />		          
		        </div>

		        <div className="mt-4">
		          <div className="row text-600 text-white bgc-default-tp1 py-25">
		            <div className="d-none d-sm-block col-1">#</div>
		            <div className="col-9 col-sm-5">Description</div>
		            <div className="d-none d-sm-block col-4 col-sm-2">Qty</div>
		            <div className="d-none d-sm-block col-sm-2">Unit Price</div>
		            <div className="col-2">Amount</div>
		          </div>

		          <div className="text-95 text-secondary-d3">		            
		            <InvoiceItem />		            
		          </div>
		          <div className="row border-b-2 brc-default-l2"></div>	          

		          <div className="row mt-3">
		            <div className="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">
		              Extra note such as company or payment information...
		            </div>

		            <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
		              <InvoiceTotal total_amount={props.invoice.total_amount} />
		            </div>
		          </div>

		          <hr />

		          <div>
		            <span className="text-secondary-d1 text-105">Thank you for your business</span>
		            <a href="#" className="btn btn-info btn-bold px-4 float-right mt-3 mt-lg-0">Pay Now</a>
		          </div>

		        </div>
		      </div>
		    </div>
		  </div>
		</div>
	);
}

