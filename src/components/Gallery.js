import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import test from '../testImg.jpg'

const Gallery = () => {
    return(
        <div>
            <Grid container spacing={10} direction="row" alignItems="center" justify="space-evenly">
                <Grid item>
                    <img src={test} />
                </Grid>
                <Grid item>
                    <img src={test} />
                </Grid>
                <Grid item>
                    <img src={test} />
                </Grid>
            </Grid>
        </div>
    )
}
export default Gallery;