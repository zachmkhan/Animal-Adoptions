import './App.css';
import NavBar from './components/NavBar'

import AddCat from './components/AddCat'
import Grid from '@material-ui/core/Grid'
import Home from './components/Home'
import Login from './components/userLogin'
import AdminLogin from './components/adminLogin'
import Gallery from './components/Gallery'
import ListPets from './components/ListPets'
import AddDog from './components/AddDog'
import AddCat from './components/AddCat'
import AddAnimal from './components/AddAnimal'
import Admin from './components/Admin'
import SearchPage from './components/SearchPage'
import SearchFilter from './components/SearchFilter'
import Grid from '@material-ui/core/Grid'
import Edit from './components/edit'
import Pet from './components/Pet'
import Favorites from './components/Favorites'

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

          <Route path="/userdash">
            <Gallery/>
          </Route> 
          <Route path="/search">
            <Grid container direction="row">
              {/* <SearchFilter/>
              <ListPets/> */}
              <SearchPage/>
            </Grid>
            
          </Route> 
          <Route path="/addDog">
            <AddDog/>
          </Route>
          <Route path="/addCat">
            <AddCat/>
          </Route>  
          <Route path="/addAnimal">
            <AddAnimal/>
          </Route>  
          <Route path="/admin">
            <Admin/>
          </Route> 
          <Route path="/edit/:id">
            <Edit  />
          </Route>
          <Route path="/pet/:id">
            <Pet/>
          </Route>
          <Route path="/favorites/:id">
            <Favorites/>

          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;