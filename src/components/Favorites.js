import React, {useState, useEffect} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import test from '../testImg.jpg'
import { makeStyles } from '@material-ui/core/styles';
import pets from './dummyPetData';
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';



const Favorites = () => {

    const [favs, setFavs] = React.useState([]);
    const [favsLength, setFavsLength] = React.useState(false);  //useEffect hook to rerender on delete
    const [value, setValue] = React.useState("");


    // let {id} = useParams();

    useEffect(() => {
        const check = localStorage.getItem('user')
        if (check) {
            setValue(check)
        }
        else {
            return;
        }
        const url = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/favorites/${check}`
        async function fetchData() {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setFavs(json["rows"]);
                setFavsLength(json["rows"].length);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
        
    }, [favsLength]);

  

    function deleteHandler(petId, userId) {

        const deleteUrl = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/favorites/`
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
            body: JSON.stringify({
                petId:petId,
                userId:userId
             })
        };
        fetch(deleteUrl, requestOptions).then(response => (response.json()).then(data => setFavsLength(data.length)))
        //console.log(`You have removed the ${petId} and ${userId}`)
        //setFavs(favs);
    }

    if(!value || value.length === 0) {
        return(
            <Typography>
                You do not have permission to access this page.
            </Typography>
        )
    }

    function hasFavorites() {
        if (favsLength > 0) {
            return (<h1>Your Favorites! Don't wait too long to decide!</h1>);
        }
        else {
            return (<h1>You don't have any favorites yet.</h1>);
        }
    }

    return(
        <div>
            {hasFavorites()}
            <div style={{width: "60vw", display: "grid", gridTemplateColumns: "auto auto auto", marginLeft: "auto", marginRight: "auto"}}>
                {favs.map((pet) => (
                    <div style={{textAlign: "center", width: "20vw", height: "40vh", backgroundColor: "rgb(220,220,220)", borderStyle: "solid", color: 'inherit', textDecoration: 'inherit'}}>
                    <a href={`/pet/${pet.petId}`} style={{color: 'inherit', textDecoration: 'inherit'}}>
                        <div style={{width: "20vw", height: "70%"}}>
                            <img src={pet.photo1} style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                        </div>
                        <div>
                            {pet.name}
                            <br></br>
                            {`${pet.sex}, ${pet.ageGroup}`}
                            <br></br>
                            {`${pet.city}, ${pet.state}`}
                            <br></br>
                            
                        </div>
                    </a>
                    <Button variant="contained" color="primary" onClick={() => {if(window.confirm('Are you sure you want to delete?')){ deleteHandler(pet.petId, value)};}}>
                        😢 Remove Favorite 😢
                    </Button></div>                      
                ))}
            </div>
        </div>
        
    )

}
export default Favorites;
