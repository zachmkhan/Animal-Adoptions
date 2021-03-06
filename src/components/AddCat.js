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

const cityStates = require('../updated_cities_states.json');


const AddCat = () => {

    const { register, handleSubmit, errors, control } = useForm({
            resolver: yupResolver(schema)
       });


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

        var list = cityStates[name];
        setCityList(list);
    }

    var stateList = [];
    Object.keys(cityStates).forEach(state =>
        stateList.push(<MenuItem value={state}>{state}</MenuItem>)
    )
    var cityMenuList = [];
    cityList.forEach(city =>
        cityMenuList.push(<MenuItem value={city}>{city}</MenuItem>)
    )
    

    const submitData = (data, e) => 
    {
        var sendData = new FormData();
        sendData.append("sellerId", value); //Need to update
        sendData.append("status", data.status);
        sendData.append("animal", "Cat");
        sendData.append("name", data.name);
        sendData.append("breed", data.breed);
        sendData.append("sex", data.sex);
        sendData.append("age", data.age);
        sendData.append("weight", data.weight);
        sendData.append("size", data.size);
        sendData.append("adoptionFee", data.fee);
        sendData.append("aboutMe", data.desc);
        sendData.append("city", data.city);
        sendData.append("state", data.state);
        sendData.append("goodWithKids", data.goodWithKids);
        sendData.append("goodWithDogs", data.goodWithDogs);
        sendData.append("goodWithCats", data.goodWithCats);
        sendData.append("requiresFence", data.requiresFence);
        sendData.append("houseTrained", data.houseTrained);
        sendData.append("neuteredSpayed", data.neuteredSpayed);
        sendData.append("shotsUpToDate", data.shotsUpToDate);
        //console.log(files);

        if (files === null) {
            alert("You need to upload one image file");
            return;
        }
        else {
            for (let i = 0; i < files.length; i++) {
                if(!SUPPORTED_FORMATS.includes(files[i].type)) {
                    alert("Invalid file type");
                    setFiles(null);
                    return;
                }
                if(i >= 6) {
                    break //cut off extra files
                }
                sendData.append("photo", files[i])
            }
        }

        for (var value of sendData.values()) {
            console.log(value);
        }

       const requestOptions = {
            method: 'POST',
            body: sendData
        };
    
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(json => {
            console.log('parsed json', json) // access json.body here
        })
        handleClick()
        e.preventDefault();
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


    const [value, setValue] = React.useState("");
    useEffect(() => {

        const check = localStorage.getItem('admin')
        if (check) {
            setValue(check)
        }
    }, []);
    if(!value || value.length === 0) {
        return(
            <Typography>
                You do not have permission to access this page.
            </Typography>
        )
    }
    
    return(
        <form onSubmit={handleSubmit(submitData)}>
                <TextField
                    inputRef={register}
                    type='text'
                    name='name'
                    label='Name'
                    //onChange={e => setName(e.target.value)}
                    //value={name}
                />
                <p>{errors.name?.message}</p>
                <br></br>
                <InputLabel id="breed">Breed</InputLabel>
                <Controller
                    name="breed"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={props =>
                    <Select 
                        labelId="breed" 
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                    >
                        {catBreedsArray}
                    </Select>
                    } // props contains: onChange, onBlur and value
                />
                <p>{errors.breed?.message}</p>

                <br></br>
                <InputLabel id="sex">Sex</InputLabel>
                <Controller
                    name="sex"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={props =>
                    <Select 
                        labelId="sex" 
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                    } // props contains: onChange, onBlur and value
                />
                <p>{errors.sex?.message}</p>
                
                <br></br>
                <InputLabel id="age">Age</InputLabel>
                <Controller
                    name="age"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={props =>
                    <Input
                        labelId="age" 
                        type="number"
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                    >
                    </Input>
                    } // props contains: onChange, onBlur and value
                />
                <p>{errors.age?.message}</p>
                <br></br>
                <InputLabel id="weight">Weight (lbs)</InputLabel>
                <Controller
                    name="weight"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={props =>
                    <Input
                        labelId="weight" 
                        type="number"
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                    >
                    </Input>
                    } // props contains: onChange, onBlur and value
                />
                <p>{errors.weight?.message}</p>
                <br></br>
                <InputLabel id="size">Expected Size When Grown</InputLabel>
                <Controller
                    name="size"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={props =>
                    <Select 
                        labelId="size" 
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                    >
                        <MenuItem value="Small">Small (less than 10lbs)</MenuItem>
                        <MenuItem value="Medium">Medium (10-15lbs)</MenuItem>
                        <MenuItem value="Large">Large (15-20lbs)</MenuItem>
                        <MenuItem value="XLarge">XLarge (20+ lbs)</MenuItem>
                    </Select>
                    } // props contains: onChange, onBlur and value
                />
                <p>{errors.size?.message}</p>
                <br></br>
                <InputLabel id="fee">Adoption Fee</InputLabel>
                <Controller
                    name="fee"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={props =>
                    <Input
                        labelId="fee" 
                        type="number"
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                    >
                    </Input>
                    } // props contains: onChange, onBlur and value
                />
                <p>{errors.fee?.message}</p>
                <br></br>
                
                
                <TextField
                    type='text'
                    inputRef={register}
                    name='status'
                    label='Status'
                    //value={city}
                />
                <p>{errors.status?.message}</p>
                <br></br>
                <InputLabel id="state">State</InputLabel>
                <Controller
                    name="state"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={props =>
                    <Select 
                        labelId="state" 
                        onChange={e => {props.onChange(e.target.value); changeCities(e.target.value)}}
                        value={props.value}
                    >
                        {stateList}
                    </Select>
                    } // props contains: onChange, onBlur and value
                />
                <p>{errors.state?.message}</p>
                <br></br>
                <InputLabel id="city">City</InputLabel>
                <Controller
                    name="city"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={props =>
                    <Select 
                        labelId="city" 
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                    >
                        {cityMenuList}
                    </Select>
                    } // props contains: onChange, onBlur and value
                />
                <p>{errors.city?.message}</p>
                <br></br>
                
                <TextField
                    inputRef={register}
                    type='text'
                    name='desc'
                    label='About me'
                    //onChange={e => setDesc(e.target.value)}
                    //value={desc}
                    multiline='true'
                />
                <p>{errors.desc?.message}</p>

                <br></br>
                <InputLabel id="goodWithDogs">Good with dogs</InputLabel>
                <Controller
                    name="goodWithDogs"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={props =>
                    <Select 
                        labelId="goodWithDogs" 
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                    </Select>
                    } // props contains: onChange, onBlur and value
                />
                <p>{errors.goodWithDogs?.message}</p>

                <br></br>
                <InputLabel id="goodWithCats">Good with cats</InputLabel>
                <Controller
                    name="goodWithCats"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={props =>
                    <Select 
                        labelId="goodWithCats" 
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                    </Select>
                    } // props contains: onChange, onBlur and value
                />
                <p>{errors.goodWithCats?.message}</p>
                <br></br>
                <InputLabel id="goodWithKids">Good with kids</InputLabel>
                <Controller
                    name="goodWithKids"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={props =>
                    <Select 
                        labelId="goodWithKids" 
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                    </Select>
                    } // props contains: onChange, onBlur and value
                />
                <p>{errors.goodWithKids?.message}</p>
                <br></br>
                <InputLabel id="requiresFence">Fenced yard required</InputLabel>
                <Controller
                    name="requiresFence"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={props =>
                    <Select 
                        labelId="requiresFence" 
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                    </Select>
                    } // props contains: onChange, onBlur and value
                />
                <p>{errors.requiresFence?.message}</p>
                <br></br>
                <InputLabel id="houseTrained">House trained</InputLabel>
                <Controller
                    name="houseTrained"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={props =>
                    <Select 
                        labelId="houseTrained" 
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                    </Select>
                    } // props contains: onChange, onBlur and value
                />
                <p>{errors.houseTrained?.message}</p>
                <br></br>
                <InputLabel id="neuteredSpayed">Neutered/Spayed</InputLabel>
                <Controller
                    name="neuteredSpayed"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={props =>
                    <Select 
                        labelId="neuteredSpayed" 
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                    </Select>
                    } // props contains: onChange, onBlur and value
                />
                <p>{errors.neuteredSpayed?.message}</p>
                <br></br>
                <InputLabel id="shotsUpToDate">Shots up to date</InputLabel>
                <Controller
                    name="shotsUpToDate"
                    control={control}
                    defaultValue={""}
                    rules={{ required: true }}
                    render={props =>
                    <Select 
                        labelId="shotsUpToDate" 
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                    </Select>
                    } // props contains: onChange, onBlur and value
                />
                <p>{errors.shotsUpToDate?.message}</p>
                
                <br></br>
                <br></br>
                <br></br>
                <input
                    //ref={register}
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    //style={{display: 'none'}}
                    name="photo"
                    onChange={e => setFiles(e.target.files)}
                />

                {/* <p>{errors.photo?.message}</p> */}
                <br></br>
                <Button type='submit' >
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
                    message="Pet added - Refresh page to add another pet"
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
