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
        console.log(obj);
        // console.log({
        //     test:"test1",
        //     test2:"test2"
        // })
    };
    


    

    return(
        <div>
            <SearchFilter search={search} handleSearch={handleSearch}/>
            <ListPets search={search}/>
        </div>
    )
}

export default SearchPage;