import React from 'react';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import MainArea from '../components/mainarea';
import PrivateRoute from '../components/privateroute'
import Services from './services'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default function Dashboard(){
	return(
		<div>
			<Topbar />
			<Sidebar />
			<MainArea>
				<Router>
					<Switch>
						<PrivateRoute path="/services">
			        <Services />
			      </PrivateRoute>
			      <PrivateRoute path="/">
			        Main
			      </PrivateRoute>
		      </Switch>
	      </Router>
			</MainArea>
		</div>
	)
}
