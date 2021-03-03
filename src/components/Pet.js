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
import { keys } from '@material-ui/core/styles/createBreakpoints';
import ImageGallery from 'react-image-gallery';
import './petStyles.css';

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
    const [check, setCheck] = React.useState(false);
    const [images, setImages] = React.useState([]);
    const [random, setRandom] = React.useState(0);

    let {id} = useParams();
    const dummyUser = 2;
    const url = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/pet/${id}`
    const favsUrl = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/favorites/${dummyUser}`

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url);
                const json = await response.json();

                const favsReponse = await fetch(favsUrl);
                const favsJson = await favsReponse.json();
                for(var i = 0; i < favsJson["rows"].length; i++) {  //Check if pet is already in favorites
                    if(favsJson["rows"][i]["petId"] == id) {
                        
                        setCheck(true);
                        break;
                    } 
                }
                setPet(json["rows"][0]);
                // var photoArray = []; Attempt to randomly pick an image
                // Object.keys(json["rows"][0]).map(function(key){
                //     if(key.includes("photo") && pet[key] != "") {
                //         photoArray.push(pet[key]);
                //     }
                // })
                // setImages(photoArray);
                // if(photoArray.length != 0) {
                //     setRandom(Math.floor(Math.random() * photoArray.length));
                // }
                
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
        
    }, []);

    function favoriteHandler() {

        if(check) {
            alert("Pet is already in your favorites");
            return;
        }
        const favsUrl = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/favorites`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
            body: JSON.stringify({
                userId:dummyUser,
                petId:id
            })
        };
        console.log(`Added pet ${id} and user ${dummyUser}`);
        //fetch(favsUrl, requestOptions).then(response => response.json())
    }
  
    return (

    <div>
        <Grid
            container
            alignContent="center"
            justifyContent="center"
            alignItems="flex-end"
            style={{height: "100vh",width: "100vw"}}
        >
        <Grid item style={{display:'flex', height:"75vh", width:"50vw", alignItems:'center', justifyContent:'center'}} >
            <Paper>
                <img src={pet["photo1"]} height="500px" width="500px"></img>
                <br></br>
                <Button onClick={() => favoriteHandler()}>
                    Add to Favorites
                </Button>
            </Paper>
            
        </Grid>
        <Grid item style={{textAlign:'center',width:"50vw"}} >
            <Paper style={{height:"75vh", textAlign:'center', alignItems:'center', justifyContent:'center', verticalAlign:'center'}}>
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
            </Paper>
        </Grid>


        </Grid>
    </div>
    );
}

export default Pet;