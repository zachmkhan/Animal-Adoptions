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


const petData = [
    { id: '1', animal: 'Dog', name: 'Bingo', age: 3, sex: 'male', weight: '42', dogs: false, breed: 'Doberman' },
    { id: '2', animal: 'Dog', name: 'Brutus', age: 3, sex: 'male', weight: '55', dogs: false, breed: 'Boxer' },
    { id: '3', animal: 'Cat', name: 'Luna', age: 6, sex: 'female', weight: '15', dogs: true, breed: 'Siamese' }
]


const Favorites = () => {

    const [favs, setFavs] = React.useState([]);
    const [favsLength, setFavsLength] = React.useState(false);  //useEffect hook to rerender on delete


    let {id} = useParams();
    // let id = 1;
    const url = `http://flip2.engr.oregonstate.edu:4256/favorites/${id}`

    useEffect(() => {
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
        console.log(favs);
    }, [favsLength]);

  

    function deleteHandler(petId, userId) {

        const deleteUrl = `http://flip2.engr.oregonstate.edu:4256/favorites/`
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

    return(
        <div>
            <GridList>
                {favs.map((pet) => (
                    <GridListTile key={pet.img}>
                        <img
                            src={pet.photo1}
                        />
                        {/* <Link to={`/pet/${pet.petId}`}> */}
                            <GridListTileBar
                                title={`${pet.name}: ${pet.status}`}
                                subtitle={<span>
                                            <Link to={`/pet/${pet.petId}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                                Visit
                                            </Link>
                                        </span>}
                                actionIcon={
                                    <Button variant="contained" color="primary" onClick={() => {if(window.confirm('Are you sure you want to delete?')){ deleteHandler(4, 2)};}}>
                                        Remove Favorite
                                    </Button>
                                }
                            />
                        {/* </Link> */}
                        
                    </GridListTile>
                ))}
            </GridList>
        </div>
        
    )

}
export default Favorites;