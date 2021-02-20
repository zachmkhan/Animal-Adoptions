import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import test from '../testImg.jpg'
import { useParams } from 'react-router-dom';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//       justifyContent: "center",
//       height: 500,
//       //direction: 'column',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//   }));
  


  

const Pet = () => {

    const [pet, setPet] = React.useState({});
    let {id} = useParams();
    const url = `http://flip2.engr.oregonstate.edu:4256/pet/${id}`

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setPet(json["rows"][0]);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
        console.log(pet);
    }, []);

    //const classes = useStyles();
  
    return (

    <div>
        <Grid
            container
            alignContent="center"
            justifyContent="center"
            alignItems="flex-end"
            style={{height: "100vh",width: "100vw"}}
        >
        <Grid item style={{textAlign:'center',width:"50vw"}} >
            <img src={pet["photo1"]} height="500px" width="500px"></img>
        </Grid>
        <Grid item style={{textAlign:'center',width:"50vw"}} >
            {
                Object.keys(pet).map(function(key) {
                        if(String(key).includes("photo")) {
                            return;
                        }
                        else return <Typography>
                                {key} : {pet[key]}
                                </Typography>
                        
                } 
                )
                
            }
        </Grid>


        </Grid>
    </div>
    );
}

export default Pet;