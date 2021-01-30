import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import {dogBreedsArray} from './breeds'

const SearchFilter = () => {

    var rowsAge =[];
    for (var i = 0; i < 26; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rowsAge.push(<MenuItem value={i}>{i}</MenuItem>);
    }

    return(
        <form>
                <InputLabel id="breed">Breed</InputLabel>
                <Select labelId="breed">
                    {dogBreedsArray}
                </Select>
                <br></br>
                <InputLabel id="sex">Sex</InputLabel>
                <Select labelId="sex">
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </Select>
                <br></br>
                <InputLabel id="age">Age</InputLabel>
                <Select labelId="Age">
                    {rowsAge}
                </Select>
                <br></br>
                <InputLabel id="weight">Weight</InputLabel>
                <Select labelId="weight">
                    <MenuItem value="Small">Small</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Large">Large</MenuItem>
                    <MenuItem value="Extra Large">Extra Large</MenuItem>
                </Select>
                <br></br>
                <Button type='submit'>
                    Search
                </Button>
            </form>
    )

}
export default SearchFilter;