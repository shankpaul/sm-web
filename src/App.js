import './App.css';
import LoginPage from './pages/loginpage'
import Dashboard from './pages/dashboard'
import {AuthProvider, useAuth} from './auth/auth_provider'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";



function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
           <PrivateRoute path="/">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthProvider>
    );
}


function PrivateRoute({children, ...rest}){
  let auth = useAuth();
  return(
    <Route {...rest} 
    render={({location}) => 
      auth.user ? (children) : (<Redirect to={{ pathname: "/login", state: { from: location }}} />)
    }
    ></Route>
  )

}




export default App;
