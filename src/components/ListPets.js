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

var petsData = [];
// Object.keys(pets).forEach(function(key){
//     //petsData.push(pets[key]);
//     petsData.push(  <GridListTile >
//                         <img src={test} />
//                         <GridListTileBar title={pets["name"]} />
//                      </GridListTile>  )
// });
pets.forEach(function(obj) {
    petsData.push(  <GridListTile >
        <img src={test} />
        <GridListTileBar title={obj["name"]} />
     </GridListTile>  )
})

const ListPets = () => {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <GridList cellHeight={180} cols={2} style={{
            width: '50%',
            }}>
                {petsData}
                {/* <GridListTile>
                    <img src={test} />
                    <GridListTileBar title="Dog1" />
                </GridListTile>
                <GridListTile>
                    <img src={test} />
                    <GridListTileBar title="Dog2" />
                </GridListTile>
                <GridListTile>
                    <img src={test} />
                    <GridListTileBar title="Dog3" />
                </GridListTile>
                <GridListTile>
                    <img src={test} />
                    <GridListTileBar title="Dog4" />
                </GridListTile> */}
            </GridList>
        </div>
    )
}
export default ListPets;