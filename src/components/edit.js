import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SettingsPhoneTwoTone } from '@material-ui/icons';

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


const Edit = () => {

    const [pet, setPet] = React.useState({});
    const [photo, setPhoto] = React.useState(null);
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

    // console.log(pet);
    
    const handleSubmit = (event) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pet)
        };
        fetch(editUrl, requestOptions)
            .then(response => response.json())
           // .then(data => setPet(data["rows"][0]));
        // console.log(pet);
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
        fetch(deleteUrl, requestOptions).then(response => response.json());
        window.location.reload();
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
        fetch(editUrl, requestOptions).then(response => response.json());
        window.location.reload();
    }


    return(

        <div>
            <form onSubmit={handleSubmit}>
                
                {
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
                    
                }
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
                                    <div>
                                        <input type="file" name="photo" onChange={e => setPhoto(e.target.files[0])}/>
                                        <Button onClick={() => {editHandler(pet["petId"], key)}}>
                                            Add
                                        </Button>
                                    </div>
                                    
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