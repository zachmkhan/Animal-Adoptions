import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Gallery from './components/Gallery'
import ListPets from './components/ListPets'
import AddPet from './components/AddDog'
import Admin from './components/Admin'
import SearchFilter from './components/SearchFilter'
import Grid from '@material-ui/core/Grid'
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
          <Route path="/userdash">
            <Gallery/>
          </Route> 
          <Route path="/search">
            <Grid container direction="row">
              <SearchFilter/>
              <ListPets/>
              
            </Grid>
            
          </Route> 
          <Route path="/addDog">
            <AddPet/>
          </Route> 
          <Route path="/admin">
            <Admin/>
          </Route> 
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
