import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Test from '../testImg.jpg'

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
                    <img src={Test} />
                </Grid>
                <Grid item>
                    <img src={Test} />
                </Grid>
                <Grid item>
                    <img src={Test} />
                </Grid>
            </Grid>
            <hr></hr>
            <Typography>
                {value}
            </Typography>
        </div>
    )
}
export default Gallery;