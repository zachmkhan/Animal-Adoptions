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

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
     // backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
  }));



const ListPets = (props) => {

    const classes = useStyles();
    const [pets, setPets] = React.useState([]);

    let {search} = props;
    var petsData = [];

    // pets.forEach(function(obj) {
    //     petsData.push(  <GridListTile >
    //         <img src={test} />
    //         <GridListTileBar title={obj["name"]} />
    //      </GridListTile>  )
    // })
    // console.log(search["breed"]);
    // console.log(pets[0]["breed"]);

    // pets.filter(pet => pet.breed == search.breed).map(filteredName => (
    //     <li>
    //         {filteredName.breed}
    //     </li>
    // ))

    useEffect(() => {
      async function fetchData() {
          try {
            //Check for empty query, need to switch routes if true
              var emptySearch = true;
              emptySearch = () => 
                Object.keys(search).forEach(function(key) {
                  if(search[key] != ""){
                    return false;
                  };
                });
              if(emptySearch){
                var url = new URL("http://flip2.engr.oregonstate.edu:4256/pets/");
              }
              else{
                var url = new URL("http://flip2.engr.oregonstate.edu:4256/pets/search");
                Object.keys(search).forEach(function(key) {
                  if(search[key] != ""){
                    url.searchParams.append(key, search[key]);
                  };
                });
              }
              console.log(url);
              const response = await fetch(url);
              const json = await response.json();
              setPets(json["rows"]);
          } catch (e) {
              console.error(e);
          }
      };
      fetchData();
    }, [search]);

    return(
        <div className={classes.root}>
            {/* <GridList cellHeight={180} cols={2} style={{width: '50%'}}>
                {petsData}
            </GridList> */}
            <GridList>
            {pets.filter(function(pet) {
              for (var key in search) {
                if(pet[key] != search[key] && search[key] != ""){
                  return false;
                }
              }
              return true
            }
              ).map(filteredName => (
                <GridListTile >
                    <img src={filteredName["photo1"]} />
                    <GridListTileBar 
                      title={filteredName["name"]}
                      actionIcon={
                        <Link to={`/pet/${filteredName["petId"]}`}>
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Link>
                        }
                    />
              </GridListTile>  
              )
            )}
            </GridList>
        </div>
    )
}
export default ListPets;