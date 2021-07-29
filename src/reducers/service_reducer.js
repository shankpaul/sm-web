export default function ServiceReducer(state, action){
	switch(action.type){
		case 'index': 
			return {
				 ...state, services: action.payload
			};
		case 'create': 
			return {
				 ...state, services: state.services.concat(action.payload),
			};
		case 'delete': 
			return {
				 ...state, services: state.services.filter(service => service.id !== parseInt(action.payload.id)),
			};
		default:
			return state;
	}
}