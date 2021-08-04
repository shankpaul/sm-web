import React from 'react';
import {Topbar, Sidebar,MainArea,PrivateRoute} from '../components';
import {Services, Owners, Vehicles, Users, Invoices} from './'
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import {NotificationContainer} from 'react-notifications';

export default function Dashboard(){
	return(
		<div>
			<Router>
      	<NotificationContainer/>
				<Topbar />
				<Sidebar />
				<MainArea>				
					<Switch>
						<PrivateRoute path="/services">
				       <Services />
				    </PrivateRoute>
				    <PrivateRoute path="/owners">
				       <Owners />
				    </PrivateRoute>
				    <PrivateRoute path="/vehicles">
				       <Vehicles />
				    </PrivateRoute>
				    <PrivateRoute path="/users">
				       <Users />
				    </PrivateRoute>
				    <PrivateRoute path="/invoices">
				       <Invoices />
				    </PrivateRoute>
				    <PrivateRoute path="/">
				      Main
				    </PrivateRoute>
			    </Switch>	    
				</MainArea>
			</Router>
		</div>
	)
}
