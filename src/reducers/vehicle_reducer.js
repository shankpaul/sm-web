export default function VehicleReducer(state, action){
	switch(action.type){
		case 'index': 
			return {
				 ...state, vehicles: action.payload
			};
		case 'create': 
			return {
				 ...state, vehicles: state.vehicles.concat(action.payload),
			};
		case 'delete': 
			return {
				 ...state, vehicles: state.vehicles.filter(item => item.id !== parseInt(action.payload.id)),
			};
		case 'update': 
			return {
				 ...state, vehicles: state.vehicles.map((item,index)=> {
				 	if(item.id==action.payload.id){
				 		return action.payload;
				 	}
				 return item
				 })};
		default:
			return state;
	}
}