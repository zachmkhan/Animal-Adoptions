import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import {Link} from 'react-router-dom'



//dummy id used for favorites route for now
const NavBar = () => {

    const test = "";
  

    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                    AdoptPets
                </Typography>
                {/* {
                    (!test || test.length === 0) 
                    ?  <Typography>Hello</Typography>
                    : <Typography>What</Typography>

                } */}
                <Tabs value={false}>
                    <Tab label="Home" to="/userdash" component={Link} /> 
                    <Tab label="Search" to="/search" component={Link} />
                    <Tab label="Admin" to="/admin" component={Link} />
                    <Tab label="Favorite" to="/favorites" component={Link} />
                    {/* <Tab label="Home" to="/Home" component={Link} />  */}
                    <Tab label="Login" to="/userLogin" component={Link} /> 
                    <Tab label="Admin Login" to="/adminLogin" component={Link} /> 
                </Tabs>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavBar;