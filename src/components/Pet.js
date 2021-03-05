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
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


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
    var photos = [];
    let {id} = useParams();
    const url = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/pet/${id}`
    const val = localStorage.getItem('user');
    const favsUrl = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/favorites/${val}`
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url);
                const json = await response.json();

                const favsReponse = await fetch(favsUrl);
                const favsJson = await favsReponse.json();
                for(var i = 0; i < favsJson["rows"].length; i++) {
                    if(favsJson["rows"][i]["petId"] == id) {
                        
                        setCheck(true);
                        break;
                    } 
                }
                setPet(json["rows"][0]);

            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
        console.log(pet);
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
                userId:val,
                petId:id
            })
        };
        console.log(`Added pet ${id} and user ${val}`);
        fetch(favsUrl, requestOptions).then(response => response.json())
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
        <Grid item style={{textAlign:'center', width:"50vw"}} >
            <div style={{verticalAlign: 'middle', paddingLeft: "60px", paddingTop: "100px", width: "50%"}}>
                
                {Object.keys(pet).map(function(key) {
                    if (String(key).includes("photo") && pet[key] ) {
                        photos.push(pet[key]);
                        return 
                    }
                    else {return;}
                })}
                <Carousel dynamicHeight={true}>
                    {photos.map(function(image) {
                        return (
                            <div>
                                <img src={image}/>
                            </div>
                        )
                    })}
                </Carousel>
                <br></br>
                <Button onClick={() => favoriteHandler()}>
                    Add to Favorites
                </Button>
            </div>
            
        </Grid>
        <Grid item style={{textAlign:'center', width:"50vw"}} >
            {
                Object.keys(pet).map(function(key) {
                        if(String(key).includes("photo")) {
                            return;
                        }
                        else return <Typography>
                                {key} : {pet[key]}
                                </Typography>      
                }) 
            }
        </Grid>


        </Grid>
    </div>
    );
}

export default Pet;
