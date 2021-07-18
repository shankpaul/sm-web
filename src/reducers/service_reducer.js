import axios from 'axios'

export default function ServiceReducer(state, action){
	switch(action.type){
		case 'index': 
			return {
				 ...state, services: action.payload
			};
		case 'delete': 
			return {
				 ...state, services: state.services.filter(service => service.id !== action.payload.id),
			};
		default:
			return state;
	}
}