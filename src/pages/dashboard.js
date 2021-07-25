import React from 'react';
import {Topbar, Sidebar,MainArea,PrivateRoute} from '../components';
import Services from './services'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
				    <PrivateRoute path="/">
				      Main
				    </PrivateRoute>
			    </Switch>	    
				</MainArea>
			</Router>
		</div>
	)
}
