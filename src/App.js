import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Gallery from './components/Gallery'
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
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
