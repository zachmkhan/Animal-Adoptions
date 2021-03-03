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
    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                {/* <IconButton>
                    Test
                </IconButton> */}
                <Typography variant="title" color="inherit">
                    AdoptPets
                </Typography>
                <Tabs value={false}>
                    <Tab label="Home" to="/Home" component={Link} /> 
                </Tabs>
                <Tabs value={false}>
                    <Tab label="Login" to="/userLogin" component={Link} /> 
                </Tabs>
                <Tabs value={false}>
                    <Tab label="Admin Login" to="/adminLogin" component={Link} /> 
                </Tabs>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavBar;