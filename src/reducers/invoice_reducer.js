export default function InvoiceReducer(state, action){
	switch(action.type){
		case 'index': 
			return {
				 ...state, invoices: action.payload
			};
		case 'create': 
			return {
				 ...state, invoices: state.vehicles.concat(action.payload),
			};
		case 'delete': 
			return {
				 ...state, invoices: state.invoices.filter(item => item.id !== parseInt(action.payload.id)),
			};
		case 'update': 
			return {
				 ...state, invoices: state.invoices.map((item,index)=> {
				 	if(item.id===action.payload.id){
				 		return action.payload;
				 	}
				 return item
				 })};
		default:
			return state;
	}
}