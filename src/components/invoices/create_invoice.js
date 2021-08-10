import React,{useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import {Invoice} from '../'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import {useParams, useHistory, Link} from "react-router-dom";

import 'react-bootstrap-typeahead/css/Typeahead.css';

const initialState = {
  invoice: {},
  service: {}
}

export default function CreateInvoice(props){
  const params = useParams();
  const [state, setState] = useState(initialState)

  useEffect(()=>{
    console.log('reached compnent fetch')
    if(params.id){
      loadInvoice(params.id)
    }
  },[params.id])

  const loadInvoice = (id) => {
    let obj = {}
    axios.get('invoices/'+id).then((resp)=>{
      setState(prevState => ({...prevState, ...resp.data}));
    });
  }

  const handleSave = () =>{

  }

  const handlePayment = () =>{
    
  }

  console.log("crate")

	return(
    <>
    {state.invoice.id && <Invoice invoice={state.invoice} 
                  service={state.service} 
                  onSave={handleSave} 
                  onPayment={handlePayment} disptach={props.dispatch} />}
    </>
    );
}

