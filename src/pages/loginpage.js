import React from 'react';
import Login from '../components/login'
import {useAuth} from '../auth/auth_provider'
import{ useHistory, useLocation} from "react-router-dom";

function LoginPage() {
	let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/dashboard" } };
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

	return(
		<div className="h-100 d-flex justify-content-center align-items-center">
		  <div>
		    <Login />
		  </div>
		</div>
	);
}

export default LoginPage;


