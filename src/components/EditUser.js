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

const userData = [
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

    const [user, setUser] = React.useState({});
    const [photo, setPhoto] = React.useState(null);
    const [cityList, setCityList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    let {id} = useParams();
    const url = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/users/${id}`
    const editUrl = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/users/${id}`



    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setUser(json["rows"][0]);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    
    
    const handleSubmit = (event) => {

        if(user.fname == "" || user.lname == "" || user.email == "" || user.password == "") {
            alert("All fields are required");
            return;
        }


        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: id,
                password: user.password,
                fname: user.fname,
                lname: user.lname,
                email: user.email,
            })
        };
        fetch(editUrl, requestOptions)
            .then(response => response.json()).then(alert("Profile updated"))
           // .then(data => setUser(data["rows"][0]));
        console.log(user);
        event.preventDefault();
    }

    


    return(

        <div>
            <form onSubmit={handleSubmit}>
                <InputLabel id="fname">
                    First Name
                </InputLabel>
                <TextField
                    type='text'
                    name='fname'
                    label={user.fname ? "" : 'First Name'}
                    onChange={e => {
                        const {name, value} = e.target;
                        setUser(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={user.fname}
                />
                <br></br>
                <InputLabel id="lname">
                    Last Name
                </InputLabel>
                <TextField
                    type='text'
                    name='lname'
                    label={user.lname ? "" : 'Last Name'}
                    onChange={e => {
                        const {name, value} = e.target;
                        setUser(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={user.lname}
                />
                <br></br>
                <InputLabel id="password">
                    Password
                </InputLabel>
                <TextField
                    type='password'
                    name='password'
                    label={user.password ? "" : 'Password'}
                    onChange={e => {
                        const {name, value} = e.target;
                        setUser(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={user.password}
                />
                <br></br>
                <InputLabel id="email">
                    Email
                </InputLabel>
                <TextField
                    type='email'
                    name='email'
                    label={user.email ? "" : 'Email'}
                    onChange={e => {
                        const {name, value} = e.target;
                        setUser(prevState => ({
                            ...prevState,
                            [name]: value
                        }));
                    }}
                    value={user.email}
                />
                <br></br>
                
               

                    <Button type='submit'>
                        Update
                    </Button>
            </form>
            
        </div>
        
    )

}
export default Edit;