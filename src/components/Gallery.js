import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ReactDOM from 'react-dom';



const Gallery = () => {

    

    const [value, setValue] = React.useState("No user");
    

    useEffect(() => {

        const check = localStorage.getItem('user')
        if (check) {
            setValue(check)
        }
    }, []);

    return(
        
        <div>
            <Grid container spacing={10} direction="row" alignItems="center" justify="space-between">
                <Grid item>
                   
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
            </Grid>
            <hr></hr>
            <h1>Welcome to AdoptPets!</h1>
            <h2>We are here to help you find your new best friend!</h2>
            <h3>Here are some of our many features:</h3>
            <p> &bull; Create a user account to favorite animals on the site</p>
            <p> &bull; Create an admin account to manage animals on the site</p>
            <p>&bull; Upload pictures and bios of your animals</p>
            <p>&bull; Search for animals with many different options</p>
            <p>&bull; Keep track of your favorite animals</p>
 
        </div>
    )
}
export default Gallery;