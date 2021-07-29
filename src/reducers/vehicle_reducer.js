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
				 ...state, vehicles: state.vehicles.filter(vehicle => vehicle.id !== parseInt(action.payload.id)),
			};
		default:
			return state;
	}
}