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


const AddDog = () => {
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
        data.append("sellerId", 1); //Need to update
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
        <form onSubmit={handleSubmit}>
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
                    {dogBreedsArray}
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
                <InputLabel id="size">Size</InputLabel>
                <Select 
                    labelId="size" 
                    onChange={e => setSize(e.target.value)}
                    value={size}
                >
                    <MenuItem value="Small">Small</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Large">Large</MenuItem>
                    <MenuItem value="XLarge">XLarge</MenuItem>

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
                <Input 
                    labelId="status" 
                    type="text"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                >
                </Input>
                <br></br>
                <TextField
                    type='text'
                    name='city'
                    label='City'
                    onChange={e => setCity(e.target.value)}
                    value={city}
                />
                <br></br>
                <TextField
                    type='text'
                    name='state'
                    label='State'
                    onChange={e => setState(e.target.value)}
                    value={state}
                />
                <br></br>
                <TextField
                    type='text'
                    name='desc'
                    label='About me'
                    onChange={e => setDesc(e.target.value)}
                    value={desc}
                    multiline='true'
                />
                {/* <br></br>
                <TextField
                    type='text'
                    name='photo1'
                    label='photo1'
                    onChange={e => setPhoto1(e.target.value)}
                    value={photo1}
                />
                <br></br>
                <TextField
                    type='text'
                    name='photo2'
                    label='photo2'
                    onChange={e => setPhoto2(e.target.value)}
                    value={photo2}
                />
                <br></br>
                <TextField
                    type='text'
                    name='photo3'
                    label='photo3'
                    onChange={e => setPhoto3(e.target.value)}
                    value={photo3}
                />
                <br></br>
                <TextField
                    type='text'
                    name='photo4'
                    label='photo4'
                    onChange={e => setPhoto4(e.target.value)}
                    value={photo4}
                />
                <br></br>
                <TextField
                    type='text'
                    name='photo5'
                    label='photo5'
                    onChange={e => setPhoto5(e.target.value)}
                    value={photo5}
                />
                <br></br>
                <TextField
                    type='text'
                    name='photo6'
                    label='photo6'
                    onChange={e => setPhoto6(e.target.value)}
                    value={photo6}
                /> */}
                <br></br>
                <InputLabel id="checkDogs">Good with dogs</InputLabel>
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
                <InputLabel id="checkCats">Good with cats</InputLabel>
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
                <InputLabel id="checkKids">Good with kids</InputLabel>
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
                <InputLabel id="checkFence">Fenced yard required</InputLabel>
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
                <InputLabel id="checkTrained">Housetrained</InputLabel>
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
                <InputLabel id="checkShots">Shots up to date</InputLabel>
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

export default AddDog;