import './App.css';
import LoginPage from './pages/loginpage'
import Dashboard from './pages/dashboard'
import PrivateRoute from './components/private_route'
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


export default App;
