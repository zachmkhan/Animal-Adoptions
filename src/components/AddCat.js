import React, {useRef, useEffect} from 'react';
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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {catBreedsArray} from './breeds'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import test from '../testImg.jpg';
import { Typography } from '@material-ui/core';

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
  ];

const schema = yup.object().shape({
    status: yup.string().required(),
    name: yup.string().required(),
    breed: yup.string().required(),
    sex: yup.string().required(),
    age: yup.number().positive().required(),
    weight: yup.number().positive().required(),
    size: yup.string().required(),
    fee: yup.number().positive().required(),
    desc: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    goodWithKids: yup.string().required(),
    goodWithDogs: yup.string().required(),
    goodWithCats: yup.string().required(),
    requiresFence: yup.string().required(),
    houseTrained: yup.string().required(),
    neuteredSpayed: yup.string().required(),
    shotsUpToDate: yup.string().required(),
    // photoHere: yup.mixed().required().test("type", "Unsupported Format", (value) => {
    //     //console.log(value)
    //     return value && SUPPORTED_FORMATS.includes(value[0].type)}
    // )
  });

  const data = require('../updated_cities_states.json');


const AddCat = () => {


    const [cityList, setCityList] = React.useState([]);
    const [name, setName] = React.useState("");
    const [breed, setBreed] = React.useState("");
    const [age, setAge] = React.useState("");
    const [sex, setSex] = React.useState("");
    const [weight, setWeight] = React.useState("");
    const [fee, setFee] = React.useState("");
    const [size, setSize] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [photo1, setPhoto1] = React.useState("");
    const [photo2, setPhoto2] = React.useState("");
    const [photo3, setPhoto3] = React.useState("");
    const [photo4, setPhoto4] = React.useState("");
    const [photo5, setPhoto5] = React.useState("");
    const [photo6, setPhoto6] = React.useState("");
    const [dogs, setDogs] = React.useState("");
    const [cats, setCats] = React.useState("");
    const [kids, setKids] = React.useState("");
    const [fence, setFence] = React.useState("");
    const [trained, setTrained] = React.useState("");
    const [neut, setNeut] = React.useState("");
    const [shots, setShots] = React.useState("");
    const [files, setFiles] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    

    const url = "http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/pets"

    function changeCities(name) {

        var list = data[name];
        setCityList(list);
    }

    var stateList = [];
    Object.keys(data).forEach(state =>
        stateList.push(<MenuItem value={state}>{state}</MenuItem>)
    )
    var cityMenuList = [];
    cityList.forEach(city =>
        cityMenuList.push(<MenuItem value={city}>{city}</MenuItem>)
    )
    

    const handleSubmit = (event) => {

        var data = new FormData();
        data.append("sellerId", 1); //Need to update
        data.append("status", status);
        data.append("animal", "Cat");
        data.append("name", name);
        data.append("breed", breed);
        data.append("sex", sex);
        data.append("age", age);
        data.append("weight", weight);
        data.append("size", size);
        data.append("adoptionFee", fee);
        data.append("aboutMe", desc);
        data.append("city", city);
        data.append("state", state);
        data.append("goodWithKids", kids);
        data.append("goodWithDogs", dogs);
        data.append("goodWithCats", cats);
        data.append("requiresFence", fence);
        data.append("houseTrained", trained);
        data.append("neuteredSpayed", neut);
        data.append("shotsUpToDate", shots);
        for (let i = 0; i < files.length; i++) {
            data.append("photo", files[i])
        }
        // data.append("photo", files[0]);
        for (var value of data.values()) {
            console.log(value);
        }
        const requestOptions = {
            //headers: { 'content-type': 'multipart/form-data' },
            method: 'POST',
            body: data
        };
        
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(json => {
            console.log('parsed json', json) // access json.body here
        })
        event.preventDefault();
    }


    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    
    return(
        <form id="form" onSubmit={handleSubmit}>
                <TextField
                    type='text'
                    name='name'
                    label='Name'
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
                <br></br>
                <InputLabel id="breed">Breed</InputLabel>
                <Select 
                    labelId="breed" 
                    onChange={e => setBreed(e.target.value)}
                    value={breed}
                >
                    {catBreedsArray}
                </Select>
                <br></br>
                <InputLabel id="sex">Sex</InputLabel>
                <Select 
                    labelId="sex" 
                    onChange={e => setSex(e.target.value)}
                    value={sex}
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </Select>
                <br></br>
                <InputLabel id="age">Age</InputLabel>
                <Input 
                    labelId="age" 
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                >
                </Input>
                <br></br>
                <InputLabel id="weight">Weight (lbs)</InputLabel>
                <Input 
                    labelId="weight" 
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                >
                </Input>
                <br></br>
                <InputLabel id="size">Expected Size When Grown</InputLabel>
                <Select 
                    labelId="size" 
                    onChange={e => setSize(e.target.value)}
                    value={size}
                >
                    <MenuItem value="Small">Small (less than 10lbs)</MenuItem>
                    <MenuItem value="Medium">Medium (10-15)</MenuItem>
                    <MenuItem value="Large">Large (15-20)</MenuItem>
                    <MenuItem value="XLarge">XLarge (20+ lbs)</MenuItem>

                </Select>
                <br></br>
                <InputLabel id="fee">Adoption Fee</InputLabel>
                <Input 
                    labelId="fee" 
                    type="number"
                    value={fee}
                    onChange={e => setFee(e.target.value)}
                >
                </Input>
                <br></br>
                <InputLabel id="status">Status</InputLabel>
                <Select 
                    labelId="status" 
                    type="text"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Unvailable">Unvailable</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                </Select>
                <br></br>
                <InputLabel id="state">State</InputLabel>
                <Select labelId="state"
                    onChange={e => {setState(e.target.value); changeCities(e.target.value)}}
                >
                    {stateList}
                </Select>
                
                <InputLabel id="city">City</InputLabel>
                <Select labelId="city"
                    onChange={e => {setCity(e.target.value)}}

                >
                    {cityMenuList}
                </Select>
                <br></br>
                
                <InputLabel id="aboutMe">About Me</InputLabel>
                <textarea
                    cols="100"
                    rows="20"
                    name='aboutMe'
                    form="form"
                ></textarea>
                <br></br>
                <InputLabel id="checkDogs">Good With Dogs</InputLabel>
                <Select 
                    labelId="checkDogs" 
                    onChange={e => setDogs(e.target.value)}
                    value={dogs}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                </Select>
                <br></br>
                <InputLabel id="checkCats">Good With Cats</InputLabel>
                <Select 
                    labelId="checkCats" 
                    onChange={e => setCats(e.target.value)}
                    value={cats}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                </Select>
                <br></br>
                <InputLabel id="checkKids">Good With Kids</InputLabel>
                <Select 
                    labelId="checkKids" 
                    onChange={e => setKids(e.target.value)}
                    value={kids}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                </Select>
                <br></br>
                <InputLabel id="checkFence">Fenced Yard Required</InputLabel>
                <Select 
                    labelId="checkFence" 
                    onChange={e => setFence(e.target.value)}
                    value={fence}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                </Select>
                <br></br>
                <InputLabel id="checkNeut">Neutered/Spayed</InputLabel>
                <Select 
                    labelId="checkNeut" 
                    onChange={e => setNeut(e.target.value)}
                    value={neut}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                </Select>
                {/* <br></br> */}
                <InputLabel id="checkTrained">House Trained</InputLabel>
                <Select 
                    labelId="checkTrained" 
                    onChange={e => setTrained(e.target.value)}
                    value={trained}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                </Select>
                <br></br>
                <InputLabel id="checkShots">Shots Up To Date</InputLabel>
                <Select 
                    labelId="checkShots" 
                    onChange={e => setShots(e.target.value)}
                    value={shots}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                </Select>
                <br></br>
                <br></br>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    //style={{display: 'none'}}
                    name="photo"
                    onChange={e => setFiles(e.target.files)}
                />
                {/* <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                    Upload Images
                    </Button>
                </label> */}
                <br></br>

                <Button type='submit' onClick={handleClick}>
                    Add
                </Button>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Pet added"
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
            </form>
    )
}

export default AddCat;
