import React, {useEffect} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/core/Menu'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Box from '@material-ui/core/Box'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom';



//dummy id used for favorites route for now
const NavBar = () => {

    const [checkUser, setCheckUser] = React.useState("");
    const [checkAdmin, setCheckAdmin] = React.useState("");

    const history = useHistory();

    useEffect(() => {
        
        const user = localStorage.getItem('user')
        const admin = localStorage.getItem('admin')
        if (user) {
            setCheckUser(user)
            console.log('user', checkUser);

        }
        if (admin) {
            setCheckAdmin(admin)
            console.log('admin', checkAdmin);

        }
    }, [checkUser, checkAdmin]);

    function logOut() {
        alert("Logging out");
        history.push("/userdash")
        localStorage.clear();
        window.location.reload();
      
      
      }


    if (checkAdmin) {
        return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        AdoptPets
                    </Typography>
                    <Box display='flex' flexGrow={1}>
                    
                    {/* {
                        (!test || test.length === 0) 
                        ?  <Typography>Hello</Typography>
                        : <Typography>What</Typography>

                    } */}
                    <Tabs value={false}>
                        <Tab label="Home" to="/userdash" component={Link} /> 
                        <Tab label="Search" to="/search" component={Link} />
                        <Tab label="Admin" to="/admin" component={Link} />
                        {/* <Tab label="Home" to="/Home" component={Link} />  */}
                        <Tab label="Admin Login" to="/adminLogin" component={Link} /> 
                        <Tab label="Profile" to="/EditAdmin" component={Link} /> 
                    </Tabs>
                    </Box>
                    <Button color="inherit" onClick={() => logOut()}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
        )
    }
    else if (checkUser) {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" align='center'>
                            AdoptPets
                        </Typography>
                        <Box display='flex' flexGrow={1}>

                        
                        {/* {
                            (!test || test.length === 0) 
                            ?  <Typography>Hello</Typography>
                            : <Typography>What</Typography>
    
                        } */}
                        <Tabs value={false}>
                            <Tab label="Home" to="/userdash" component={Link} /> 
                            <Tab label="Search" to="/search" component={Link} />
                            <Tab label="Favorite" to="/favorites" component={Link} />
                            <Tab label="Login" to="/userLogin" component={Link} />
                            <Tab label="Profile" to="/EditUser" component={Link} />  
                        </Tabs>
                        </Box>
                        <Button color="inherit" onClick={() => logOut()}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
            )
    }
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