import React from 'react';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import MainArea from '../components/mainarea';



export default function Dashboard(){
	return(
		<div>
			<Topbar />
			<Sidebar />
			<MainArea>
			<div>main</div>
			</MainArea>
		</div>
	)
}
