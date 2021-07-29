export default function OwnerReducer(state, action){
	switch(action.type){
		case 'index': 
			return {
				 ...state, owners: action.payload
			};
		case 'create': 
			return {
				 ...state, owners: state.owners.concat(action.payload),
			};
		case 'delete': 
			return {
				 ...state, owners: state.owners.filter(owner => owner.id !== parseInt(action.payload.id)),
			};
		default:
			return state;
	}
}