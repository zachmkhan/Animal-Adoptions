import './App.css';
import NavBar from './components/NavBar'
import AddCat from './components/AddCat'
import Grid from '@material-ui/core/Grid'
import Home from './components/Home'
import Login from './components/userLogin'
import AdminLogin from './components/adminLogin'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/home">
            <Home/>
          </Route>  
          <Route path="/userLogin">
            <Login/>
          </Route> 
          <Route path="/adminLogin">
            <AdminLogin/>
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;