export default function UserReducer(state, action){
	switch(action.type){
		case 'index': 
			return {
				 ...state, users: action.payload
			};
		case 'create': 
			return {
				 ...state, users: state.users.concat(action.payload),
			};
		case 'delete': 
			return {
				 ...state, users: state.users.filter(item => item.id !== parseInt(action.payload.id)),
			};
		case 'update': 
			return {
				 ...state, users: state.users.map((item,index)=> {
				 	if(item.id==action.payload.id){
				 		return action.payload;
				 	}
				 return item
				 })};
		default:
			return state;
	}
}