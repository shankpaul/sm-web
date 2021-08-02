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
				 ...state, services: state.services.filter(item => item.id !== parseInt(action.payload.id)),
			};
		case 'update': 
			return {
				 ...state, services: state.services.map((item,index)=> {
				 	if(item.id==action.payload.id){
				 		return action.payload;
				 	}
				 return item })
			};
		default:
			return state;
	}
}