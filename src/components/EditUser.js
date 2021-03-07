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

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
  ];


const EditUser = () => {

    const [user, setUser] = React.useState({});

    const [id, setId] = React.useState("");

    const history = useHistory();
    // let {id} = useParams();



    useEffect(() => {

        
        async function fetchData() {
            try {
                const val = localStorage.getItem('user');
                const url = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/users/${val}`
                const response = await fetch(url);
                const json = await response.json();
                setUser(json["rows"][0]);
                setId(val);
                console.log(url)
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

        var editUrl = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/users/${id}`;

        fetch(editUrl, requestOptions)
            .then(response => response.json()).then(alert("Profile updated"))
            .then(() => history.push("/userdash"))
           // .then(data => setUser(data["rows"][0]));
        console.log(user);
        event.preventDefault();
    }

    
    function deleteHandler() {


        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: id,
            })
        };

        var deleteUrl = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/users/${id}`;

        fetch(deleteUrl, requestOptions)
            .then(response => response.json())
            .then(history.push("/userdash"))
            .then(localStorage.clear())
            .then(window.location.reload())


        console.log(user);
        //localStorage.clear();
    }

    return(

        <div id="form" style={{marginTop: "5%", marginLeft: "auto", marginRight: "auto"}}>
            <h1><u>User Dashboard</u></h1>
            <form onSubmit={handleSubmit}>
            <div style={{display: "grid", gridTemplateColumns: "auto auto auto auto", marginLeft: "20%", marginRight: "20%", backgroundColor: "rgb(220,220,220)", padding: "2%", borderStyle: "groove"}}>
            <div style={{width:"25%", height: "10vh", marginLeft: "auto", marginRight: "auto"}}>
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
                </div>
                <div style={{width:"10vw", height: "7vh", marginLeft: "auto", marginRight: "auto"}}>
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
                </div>
                <div style={{width:"10vw", height: "7vh", marginLeft: "auto", marginRight: "auto"}}>
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
                </div>
                <div style={{width:"10vw", height: "7vh", marginLeft: "auto", marginRight: "auto"}}>
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
                </div>
                </div>
                <Button type='submit' style={{backgroundColor: "#4169E1", color: "white"}}>
                    Update
                </Button>
            </form>
            <Button color='secondary' onClick={() => {if(window.confirm('Are you sure you want to delete?')){ deleteHandler()};}}>
                Delete
            </Button>
        </div>
    )

}
export default EditUser;
