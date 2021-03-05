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
import { useHistory } from 'react-router-dom';

const adminData = [
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

const EditAdmin = () => {

    const [admin, setAdmin] = React.useState({});
    const [photo, setPhoto] = React.useState(null);
    const [cityList, setCityList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [id, setId] = React.useState("");

    const history = useHistory();


    useEffect(() => {

        async function fetchData() {
            try {
                const val = localStorage.getItem('admin');
                const url = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/admin/${val}`
                const response = await fetch(url);
                const json = await response.json();
                setAdmin(json["rows"][0]);
                setId(val);
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

    
    
    const handleSubmit = (event) => {

        var array = Object.values(admin);
        for(var i = 0; i < array.length; i++) {
            if(array[i] == "") {
                alert("All fields are required");
                return;
            }
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                aboutMe: admin.aboutMe,
                password: admin.password,
                shelterName: admin.shelterName,
                fname: admin.fname,
                lname: admin.lname,
                email: admin.email,
                website: admin.website,
                phone: admin.phone,
                city: admin.city,
                sellerId: id,
                state: admin.state,
            })
        };

        const editUrl = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/admin/${id}`
        fetch(editUrl, requestOptions)
            .then(response => response.json()).then(alert("Profile updated"))
           // .then(data => setAdmin(data["rows"][0]));
        console.log(admin);
        
        event.preventDefault();
    }

    
    function deleteHandler() {

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sellerId: id,
            })
        };

        var deleteUrl = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/admin/${id}`;

        fetch(deleteUrl, requestOptions)
            .then(response => response.json())
            .then(history.push("/userdash"))
            .then(localStorage.clear())
            .then(window.location.reload())
        //localStorage.clear();
    }

    return(

        <div>
            <form onSubmit={handleSubmit}>
                <InputLabel id="shelterName">
                    Shelter Name
                </InputLabel>
                <TextField
                    type='text'
                    name='shelterName'
                    focused="true"
                    onChange={e => {
                        const {name, value} = e.target;
                        setAdmin(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={admin.shelterName}
                />
                <br></br>
                <InputLabel id="password">
                    Password
                </InputLabel>
                <TextField
                    type='password'
                    name='password'
                    onChange={e => {
                        const {name, value} = e.target;
                        setAdmin(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={admin.password}
                />
                <br></br>
                <InputLabel id="fname">
                    First Name
                </InputLabel>
                <TextField
                    type='text'
                    name='fname'
                    onChange={e => {
                        const {name, value} = e.target;
                        setAdmin(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={admin.fname}
                />
                <br></br>
                <InputLabel id="lname">
                    Last Name
                </InputLabel>
                <TextField
                    type='text'
                    name='lname'
                    onChange={e => {
                        const {name, value} = e.target;
                        setAdmin(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={admin.lname}
                />
                <br></br>
                <InputLabel id="phone">
                    Phone Number
                </InputLabel>
                <TextField
                    type='tel'
                    name='phone'
                    onChange={e => {
                        const {name, value} = e.target;
                        setAdmin(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={admin.phone}
                />
                <br></br>
                <InputLabel id="email">
                    Email
                </InputLabel>
                <TextField
                    type='email'
                    name='email'
                    onChange={e => {
                        const {name, value} = e.target;
                        setAdmin(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={admin.email}
                />
                <br></br>
                <TextField
                    type='text'
                    name='website'
                    onChange={e => {
                        const {name, value} = e.target;
                        setAdmin(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={admin.website}
                />
                <br></br>
                <InputLabel id="state">State: {admin.state}</InputLabel>
                <Select 
                    labelId="state"
                    name='state'
                    value={admin.state}
                    onChange={e => {
                        const {name, value} = e.target;
                        setAdmin(prevState => ({
                            ...prevState,
                            [name]: value
                        })); 
                        changeCities(e.target.value);}}
                >
                    {stateList}
                </Select>
                <br></br>
                <InputLabel id="city">City: {admin.city}</InputLabel>
                <Select 
                    labelId="city"
                    name='city'
                    value={admin.city}
                    onChange={e => {
                        const {name, value} = e.target;
                        setAdmin(prevState => ({
                            ...prevState,
                            [name]: value
                        })); 
                    }}

                >
                    {cityMenuList}
                </Select>
                <br></br>
                <InputLabel id="aboutMe">
                    About Me
                </InputLabel>
                <TextField
                    type='text'
                    name='aboutMe'
                    onChange={e => {
                        const {name, value} = e.target;
                        setAdmin(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={admin.aboutMe}
                    multiline='true'
                />
                <br></br>
               

                    <Button type='submit'>
                        Update
                    </Button>
                    
            </form>
            <Button color='secondary' onClick={() => {if(window.confirm('Are you sure you want to delete?')){ deleteHandler()};}}>
                Delete
            </Button>
        </div>
        
    )

}
export default EditAdmin;