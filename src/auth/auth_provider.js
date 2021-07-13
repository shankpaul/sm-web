import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Api-key"] = process.env.REACT_APP_API_KEY

const authContext = createContext();

function AuthProvider({children}){
	const auth = useAuthProvider();
	return(
		<authContext.Provider value={auth}>
			{children}
		</authContext.Provider>
	)
}

function useAuth() {
  return useContext(authContext);
}

function initUser(){
	return JSON.parse(localStorage.getItem('user'))
}

function useAuthProvider(){
	const [user, setUser] = useState(initUser);
	useEffect(()=>{
		localStorage.setItem('user',JSON.stringify(user));
		if(user)
		{
			axios.defaults.headers.common["Access-token"] = user.headers['access-token']
			axios.defaults.headers.common["Client"] =user.headers['client']
			axios.defaults.headers.common["Uid"] = user.headers['uid']
		}
	},[user]);

	

	const signIn = function(email, password, callback) {
		axios.post('auth/sign_in',{email: email, password: password})
         .then(function(resp){   
         let data = (resp.data.data); 	
          data['headers']=resp.headers
          setUser(data)
          callback();
         })
         .catch(function (error) {
            return error;
         });
	};

	const signout = () => { 
		// let history = useHistory();
	  setUser(null) 
	  // history.push('/')
	};

	return {user, signIn, signout};

}

export { AuthProvider, useAuth }