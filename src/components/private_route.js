import React from 'react';
import { Route, Redirect} from "react-router-dom";
import { useAuth } from '../auth/auth_provider'

export default function PrivateRoute({children, ...rest}){
  let auth = useAuth();
  return(
    <Route exact {...rest} 
    render={({location}) => 
      auth.user ? (children) : (<Redirect to={{ pathname: "/login", state: { from: location }}} />)
    }
    ></Route>
  )
}