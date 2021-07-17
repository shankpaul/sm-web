import axios from 'axios'

export default function ServiceReducer(state, action){
	switch(action.type){
		case 'index': 
			return {
				 services: action.payload
			};
		case 'delete': 
			return {
				 services: []
			};
		default:
			return state;
	}
}