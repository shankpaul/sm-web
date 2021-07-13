import axios from 'axios'

export const initialState = () => {
let data=	axios.get('/services').then(function(resp){
 		return resp.data
 	});
	console.log(data)
}

export default function ServiceReducer(){
	
}