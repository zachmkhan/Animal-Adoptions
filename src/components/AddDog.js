import React, {useRef} from 'react';
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
import {dogBreedsArray} from './breeds'

const data = require('../updated_cities_states.json');

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png"
  ];


const AddDog = () => {
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

    //const form = useRef(null);

    const url = "http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/pets"
    const storedVal = localStorage.getItem('admin');
    function changeCities(name) {

        var list = data[name];
        console.log(list);
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

    // const handleSubmit = (event) => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //          },
    //         body: JSON.stringify({
    //             sellerId: 1, //Dummy admin id
    //             status:status, 
    //             animal:"Cat", 
    //             name:name,
    //             breed:breed, 
    //             sex:sex, 
    //             age:age , 
    //             weight:weight, 
    //             size:size, 
    //             adoptionFee:fee, 
    //             aboutMe: desc, 
    //             city:city, 
    //             state:state, 
    //             photo1:photo1, 
    //             photo2:photo2, 
    //             photo3:photo3, 
    //             photo4:photo4, 
    //             photo5:photo5, 
    //             photo6:photo5, 
    //             goodWithKids:kids, 
    //             goodWithDogs:dogs, 
    //             goodWithCats:cats, 
    //             requiresFence:fence, 
    //             houseTrained:trained, 
    //             neuteredSpayed:neut, 
    //             shotsUpToDate:shots
    //         }
    //         )
    //     };
    //     fetch(url, requestOptions)
    //     .then(response => response.json())
    //     .then(json => {
    //         console.log('parsed json', json) // access json.body here
    //     })
    //     //event.preventDefault();
    // }

    const handleSubmit = (event) => {

        var data = new FormData();
        data.append("sellerId", storedVal); //Need to update
        data.append("status", status);
        data.append("animal", "Dog");
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
        if(name == "" || age == "" || weight == "" || fee == "" || city == "" || state == "" || size == "") {
            alert("Name, age, weight, city, state, size, and adoption fee cannot be null");
            event.preventDefault();
            return;
        }

        if(weight < 0 || age < 0 || fee < 0) {
            alert("Age, weight, and adoption fee cannot be negative");
            event.preventDefault();
            return;
        }

        if (files === null) {
            alert("You need to upload one image file");
            event.preventDefault();
            return;
        }
        if (files === null) {
            alert("You need to upload one image file");
            event.preventDefault();
            return;
        }
        else {
            for (let i = 0; i < files.length; i++) {
                if(!SUPPORTED_FORMATS.includes(files[i].type)) {

                    alert("Invalid file type");
                    setFiles(null);
                    event.preventDefault();
                    return;
                }
                if(files[i].size > 1048576) {
                    
                    alert("Files must be under 1MB");
                    setFiles(null);
                    event.preventDefault();
                    return;
                }
                if(i >= 6) {
                    break //cut off extra files
                }
                data.append("photo", files[i])
            }
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
        }).then(() => handleClick())
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
        <div style={{marginTop: "5%"}}>
            <h1><u>Add Dog</u></h1>
            <form id="form" onSubmit={handleSubmit}>
                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
                <TextField
                    type='text'
                    name='name'
                    label='Name'
                    onChange={e => setName(e.target.value)}
                    value={name}
                /></div>
                <div style={{display: "grid", gridTemplateColumns: "auto auto auto auto", marginLeft: "10%", marginRight: "10%"}}>
                
                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
                <InputLabel id="breed">Breed</InputLabel>
                <Select 
                    labelId="breed" 
                    onChange={e => setBreed(e.target.value)}
                    value={breed}
                >
                    {dogBreedsArray}
                </Select>
                </div>
                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
                <InputLabel id="sex">Sex</InputLabel>
                <Select 
                    labelId="sex" 
                    onChange={e => setSex(e.target.value)}
                    value={sex}
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </Select>
                </div>
                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
                <InputLabel id="age">Age (years)</InputLabel>
                <Input 
                    labelId="age" 
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                >
                </Input>
                </div>
                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
                <InputLabel id="weight">Weight (lbs)</InputLabel>
                <Input 
                    labelId="weight" 
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                >
                </Input>
                </div>
                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
                <InputLabel id="size">Expected Size When Grown</InputLabel>
                <Select 
                    labelId="size" 
                    onChange={e => setSize(e.target.value)}
                    value={size}
                >
                    <MenuItem value="Small">Small (less than 25lbs)</MenuItem>
                    <MenuItem value="Medium">Medium (25-60lbs)</MenuItem>
                    <MenuItem value="Large">Large (60-100lbs)</MenuItem>
                    <MenuItem value="XLarge">XLarge (100+ lbs)</MenuItem>

                </Select>
                </div>
                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
                <InputLabel id="fee">AdoptionFee</InputLabel>
                <Input 
                    labelId="fee" 
                    type="number"
                    value={fee}
                    onChange={e => setFee(e.target.value)}
                >
                </Input>
                </div>
                
                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
                <InputLabel id="state">State</InputLabel>
                <Select labelId="state"
                    onChange={e => {setState(e.target.value); changeCities(e.target.value)}}
                >
                    {stateList}
                </Select>
                </div>
                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
                <InputLabel id="city">City</InputLabel>
                <Select labelId="city"
                    onChange={e => {setCity(e.target.value)}}

                >
                    {cityMenuList}
                </Select>
                </div>
                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
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
                </div>

                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
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
                </div>

                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
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
                </div>

                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
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
                </div>

                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
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
                </div>

                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
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
                </div>

                <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
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
                </div>
                <div style={{width:"15vw", height: "7vh", marginLeft: "auto", marginRight: "auto"}}>
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
                </div>
                </div>
                <InputLabel id="aboutMe">About Me</InputLabel>
                <textarea
                    style={{fontSize: 18}}
                    cols="100"
                    rows="20"
                    name='aboutMe'
                    form="form"
                    onChange={e => setDesc(e.target.value)}
                    value={desc}
                ></textarea>
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

                <Button type='submit'>
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
        </div>
                  
    )
}

export default AddDog;
