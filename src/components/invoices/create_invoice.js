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
  const [customer, setCustomer] = useState({})

  useEffect(()=>{
    if(params.id){
      loadInvoice(params.id)
    }
  },[params])

  const loadInvoice = (id) => {
    let obj = {}
    axios.get('invoices/'+id).then((resp)=>{
      setState(prevState => ({...prevState, ...resp.data}));
      const customer_data = {
        name: state.invoice.customer_name,
        phone: state.invoice.customer_phone,
        address: state.invoice.customer_address,
        email: state.invoice.customer_email,
      }
      setCustomer(prevState => ({...prevState,...customer_data}));
    });
  }

	return(<Invoice invoice={state.invoice} 
                  service={state.service} 
                  customer={customer} />);
}

