import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import {dogBreedsArray} from './breeds'
import SearchFilter from './SearchFilter';
import ListPets from './ListPets'
import pets from './dummyPetData';

const SearchPage = () => {

    //const [pets, setPets] = React.useState([]);
    const [search, setSearch] = React.useState({});

    const handleSearch = obj => {
        setSearch(obj);
    };
    
    

    return(
        <div style={{width: "95%", display: "grid", gridTemplateColumns: "auto auto", marginLeft: "auto", marginRight: "auto", fontSize: "1vw}}>
            <div style={{width: "25vw", marginLeft: "auto", marginRight: "auto", marginTop: "15%"}}>
                <h1>Search Filters:</h1>
                <SearchFilter search={search} handleSearch={handleSearch}/>
            </div>
            <div style={{width: "65vw", marginLeft: "auto", marginRight: "auto", marginTop: "5%"}}>
                <h1>Pets Matching Your Search</h1>
                <ListPets search={search}/>
            </div>
            
        </div>
    )
}

export default SearchPage;
