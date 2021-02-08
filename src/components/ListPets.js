import React from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import test from '../testImg.jpg'
import { makeStyles } from '@material-ui/core/styles';
import pets from './dummyPetData';

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
                    <img src={test} />
                    <GridListTileBar title={filteredName["name"]} />
              </GridListTile>  
              )
            )}
            </GridList>
        </div>
    )
}
export default ListPets;