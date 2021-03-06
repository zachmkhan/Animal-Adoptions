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

    useEffect(() => {
      async function fetchData() {
          try {
            //Check for empty query, need to switch routes if true
              var emptySearch = true;
              
              var keysList = Object.values(search);
              for(var i = 0; i < keysList.length; i++) {
                if(keysList[i] != "") {
                  emptySearch = false;
                  break;
                }
              }
              // emptySearch = Object.keys(search).forEach(function(key) {
              //     if(search[key] != ""){
              //       return false;
              //     };
              //   });
              console.log(emptySearch);
              var url = "";
              if(emptySearch){
                url = new URL("http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/pets/");
              }
              else{
                url = new URL("http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/pets/search");
                Object.keys(search).forEach(function(key) {
                  if(search[key] != ""){
                    url.searchParams.append(key, search[key]);
                  };
                });

              }
              const response = await fetch(url);
              const json = await response.json();
              console.log(url);
              console.log(json);
              setPets(json["rows"]);
          } catch (e) {
              console.error(e);
              alert("Search failed, please reload page and try again")
          }
      };
      fetchData();
      //console.log(pets);
    }, [search]);

    return(
        <div className={classes.root}>
            {/* <GridList>
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
            </GridList> */}
            <GridList>
            {pets.map(filteredName => (
                <GridListTile style={{ height: "auto" }}>
                    <img src={filteredName["photo1"]} style={{ width: "100%" }} className="MuiGridListTile-imgFullHeight"/>
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