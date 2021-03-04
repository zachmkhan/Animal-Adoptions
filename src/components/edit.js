import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import { LaptopWindowsOutlined, SettingsPhoneTwoTone } from '@material-ui/icons';
import {catBreedsArray} from './breeds'
import {dogBreedsArray} from './breeds'

const petData = [
    { id: '1', animal: 'Dog', name: 'Bingo', age: 3, sex: 'male', weight: '42', dogs: false, breed: 'Doberman' },
    { id: '2', animal: 'Dog', name: 'Brutus', age: 3, sex: 'male', weight: '55', dogs: false, breed: 'Boxer' },
    { id: '3', animal: 'Cat', name: 'Luna', age: 6, sex: 'female', weight: '15', dogs: true, breed: 'Siamese' }
]

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
  ];

const cityStates = require('../updated_cities_states.json');

const Edit = () => {

    const [pet, setPet] = React.useState({});
    const [photo, setPhoto] = React.useState(null);
    const [cityList, setCityList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    let {id} = useParams();
    const url = `http://flip2.engr.oregonstate.edu:4256/pet/${id}`
    const editUrl = `http://flip2.engr.oregonstate.edu:4256/pets/${id}`


    // useEffect(() => {
	// 	fetch(url)
	// 		.then((response) => response.json())
	// 		.then((data) => setPet(data["rows"][0]))
	// }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setPet(json["rows"][0]);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

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

    function selectBreedList() {
        if(pet.animal == "Dog") {
            return dogBreedsArray;
        }
        else if(pet.animal == "Cat") {
            return catBreedsArray;
        }
        else {
            return null;
        }
    }
    
    const handleSubmit = (event) => {

        if(pet.name == "" || pet.age == "" || pet.weight == "" || pet.adoptionFee == "") {
            alert("Name, age, weight, and adoption fee cannot be null");
            return;
        }

        if(pet.weight < 0 || pet.age < 0 || pet.adoptionFee < 0) {
            alert("Age, weight, and adoption fee cannot be negative");
            return;
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                aboutMe: pet.aboutMe,
                animal: pet.animal,
                adoptionFee: pet.adoptionFee,
                age: pet.age,
                breed: pet.breed,
                city: pet.city,
                goodWithCats: pet.goodWithCats,
                goodWithDogs: pet.goodWithDogs,
                goodWithKids: pet.goodWithKids,
                houseTrained: pet.houseTrained,
                name: pet.name,
                neuteredSpayed: pet.neuteredSpayed,
                petId: pet.petId,
                requiresFence: pet.requiresFence,
                sellerId: 1,
                sex: pet.sex,
                shotsUpToDate: pet.shotsUpToDate,
                size: pet.size,
                state: pet.state,
                status: pet.status,
                weight: pet.weight,
            })
        };
        fetch(editUrl, requestOptions)
            .then(response => response.json())
           // .then(data => setPet(data["rows"][0]));
        console.log(pet);
        event.preventDefault();
    }

    function deleteHandler(id, photoNum, petUrl) {
        
        const deleteUrl = `http://flip2.engr.oregonstate.edu:4256/photo`
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
            body: JSON.stringify({
                petId:id,
                photoX:photoNum,
                photoUrl:petUrl
            })
        };
        console.log(JSON.stringify({
            petId:id,
            photoX:photoNum,
            photoUrl:petUrl
        }))
        fetch(deleteUrl, requestOptions).then(response => {response.json(); window.location.reload()});
        //window.location.reload();
    }

    function editHandler(id, photoNum) {

        if (photo === null) {
            alert("You need to upload an image file");
            return;
        }
        if(!SUPPORTED_FORMATS.includes(photo.type)) {
            alert("Invalid file type");
            setPhoto(null);
            return;
        }
        var data = new FormData();
        data.append("petId", id);
        data.append("photoX", photoNum);
        data.append("photo", photo);
        const editUrl = `http://flip2.engr.oregonstate.edu:4256/photo`
        const requestOptions = {
            method: 'POST',
            //headers: { 'Content-Type': 'application/json' },
            body: data
        };
        for (var value of data.values()) {
            console.log(value);
        }
        fetch(editUrl, requestOptions).then(response => {response.json(); window.location.reload()});
        //window.location.reload();
    }


    return(

        <div>
            <form onSubmit={handleSubmit}>
            <TextField
                    type='text'
                    name='name'
                    label={pet.name ? "" : 'Name'}
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={pet.name}
                />
                <br></br>
                <InputLabel id="breed">Breed: {pet.breed}</InputLabel>
                <Select 
                    labelId="breed"
                    name="breed" 
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={pet.breed}
                >
                    {selectBreedList()}
                </Select>
                <br></br>
                <InputLabel id="sex">Sex: {pet.sex}</InputLabel>
                <Select 
                    labelId="sex"
                    name="sex" 
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={pet.sex}
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </Select>
                <br></br>
                <InputLabel id="age">Age</InputLabel>
                <Input 
                    labelId="age"
                    name="age" 
                    type="number"
                    value={pet.age}
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                >
                </Input>
                <br></br>
                <InputLabel id="weight">Weight (lbs)</InputLabel>
                <Input 
                    labelId="weight" 
                    type="number"
                    name="weight"
                    value={pet.weight}
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                >
                </Input>
                <br></br>
                <InputLabel id="size">Size: {pet.size}</InputLabel>
                <Select 
                    labelId="size"
                    name="size" 
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={pet.size}
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
                    name="adoptionFee"
                    value={pet.adoptionFee}
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                >
                </Input>
                <br></br>
                <InputLabel id="status">Status</InputLabel>
                <Input 
                    labelId="status"
                    name="status" 
                    type="text"
                    value={pet.status}
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                >
                </Input>
                <br></br>
                <InputLabel id="state">State: {pet.state}</InputLabel>
                <Select 
                    labelId="state"
                    name='state'
                    value={pet.state}
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        })); 
                        changeCities(e.target.value);}}
                >
                    {stateList}
                </Select>
                <br></br>
                <InputLabel id="city">City: {pet.city}</InputLabel>
                <Select 
                    labelId="city"
                    name='city'
                    value={pet.city}
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        })); 
                    }}

                >
                    {cityMenuList}
                </Select>
                <br></br>
                {/* <TextField
                    type='text'
                    name='city'
                    label={pet.city ? "" : 'City'}
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={pet.city}
                />
                <br></br>
                <TextField
                    type='text'
                    name='state'
                    label={pet.state ? "" : 'State'}
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={pet.state}
                />
                <br></br> */}
                <TextField
                    type='text'
                    name='aboutMe'
                    label={pet.aboutMe ? "" : 'About me'}
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={pet.aboutMe}
                    multiline='true'
                />
             
                <br></br>
                <InputLabel id="checkDogs">Good with dogs: {pet.goodWithDogs}</InputLabel>
                <Select 
                    labelId="checkDogs"
                    name="goodWithDogs" 
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={pet.goodWithDogs}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                </Select>
                <br></br>
                <InputLabel id="checkCats">Good with cats: {pet.goodWithCats}</InputLabel>
                <Select 
                    labelId="checkCats"
                    name="goodWithCats" 
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={pet.goodWithCats}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                </Select>
                <br></br>
                <InputLabel id="checkKids">Good with kids: {pet.goodWithKids}</InputLabel>
                <Select 
                    labelId="checkKids"
                    name="goodWithKids" 
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={pet.goodWithKids}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                </Select>
                <br></br>
                <InputLabel id="checkFence">Fenced yard required: {pet.requiresFence}</InputLabel>
                <Select 
                    labelId="checkFence"
                    name="requiresFence" 
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={pet.requiresFence}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                </Select>
                <br></br>
                <InputLabel id="checkNeut">Neutered/Spayed: {pet.neuteredSpayed}</InputLabel>
                <Select 
                    labelId="checkNeut"
                    name="neuteredSpayed" 
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={pet.neuteredSpayed}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                </Select>
                {/* <br></br> */}
                <InputLabel id="checkTrained">Housetrained: {pet.houseTrained}</InputLabel>
                <Select 
                    labelId="checkTrained"
                    name="houseTrained"
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={pet.houseTrained}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                </Select>
                <br></br>
                <InputLabel id="checkShots">Shots up to date: {pet.shotsUpToDate}</InputLabel>
                <Select 
                    labelId="checkShots" 
                    name="shotsUpToDate"
                    onChange={e => {
                        const {name, value} = e.target;
                        setPet(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={pet.shotsUpToDate}
                >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                </Select>
                <br></br>
                {/* {
                    Object.keys(pet).map(function(key) {

                        if(key.includes("photo")) {
                            return null;
                        }
                        return <div>
                                        <TextField
                                            type='text'
                                            name={key}
                                            label={key}
                                            onChange={e => {
                                                const {name, value} = e.target;
                                                setPet(prevState => ({
                                                    ...prevState,
                                                    [name]: value
                                                }));
                                            }}
                                            value={pet[key]}
                                        />
                                    </div>            
                        } 
                    )
                    
                } */}

                    <Button type='submit'>
                        Update
                    </Button>
            </form>
            <hr></hr>
            <div>
            {
                Object.keys(pet).map(function(key) {

                    if(!key.includes("photo")) {
                        return null;
                    }
                    else if (key == "photo1") {
                        return <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                                    {pet[key] ? <img src={pet[key]} width="300" height="300" ></img> : null}
                                    <div>
                                        <input type="file" name="photo" onChange={e => setPhoto(e.target.files[0])}/>
                                        <Button onClick={() => {editHandler(pet["petId"], key)}}>
                                            Change
                                        </Button>
                                    </div>
                                </div>       
                    }
                    else if (pet[key] !== null) {
                        return <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                                    {<img src={pet[key]} width="300" height="300" ></img>}
                                   
                                    <Button onClick={() => {if(window.confirm('Are you sure you want to delete?')){ deleteHandler(pet["petId"], key, pet[key])};}}>
                                        Delete
                                    </Button>
                                    {/* <div>
                                        <input type="file" name="photo" onChange={e => setPhoto(e.target.files[0])}/>
                                        <Button onClick={() => {editHandler(pet["petId"], key)}}>
                                            Add
                                        </Button>
                                    </div> */}
                                    
                        </div>      
                    }
                    else {
                        return <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                                    {/* {pet[key] ? <img src={pet[key]} width="300" height="300" ></img> : null}
                                   
                                    <Button onClick={() => {if(window.confirm('Are you sure you want to delete?')){ deleteHandler(pet["petId"], key, pet[key])};}}>
                                        Delete
                                    </Button> */}
                                    <div>
                                        <input type="file" name="photo" onChange={e => setPhoto(e.target.files[0])}/>
                                        <Button onClick={() => {editHandler(pet["petId"], key)}}>
                                            Add
                                        </Button>
                                    </div>
                                    {/* <form method="POST" enctype="multipart/form-data" action="/photo">
                                        <input type="hidden" name="petId" name={pet["petId"]}/>
                                        <input type="hidden" name="photoX" value={key}/>
                                        Photo<input type="file" name="photo"/>
                                        <input type="submit"/>
                                    </form> */}
                                    
                                </div>     
                        }       
                    } 
                )
            }
            </div>
        </div>
        
    )

}
export default Edit;