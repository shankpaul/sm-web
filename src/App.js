import './App.css';
import {Login, Dashboard} from './pages'
import {PrivateRoute} from './components'
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
            <Login />
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
