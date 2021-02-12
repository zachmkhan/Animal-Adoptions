import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const petData = [
    { id: '1', animal: 'Dog', name: 'Bingo', age: 3, sex: 'male', weight: '42', dogs: false, breed: 'Doberman' },
    { id: '2', animal: 'Dog', name: 'Brutus', age: 3, sex: 'male', weight: '55', dogs: false, breed: 'Boxer' },
    { id: '3', animal: 'Cat', name: 'Luna', age: 6, sex: 'female', weight: '15', dogs: true, breed: 'Siamese' }
]


const Edit = () => {

    const [pet, setPet] = React.useState({});
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

    console.log(pet);
    
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

    return(

        <form onSubmit={handleSubmit}>
            {/* {pet.map((pet => 
                <ul>{pet.name}</ul>
            ))} */}
            {
                Object.keys(pet).map(function(key) {
                    // if(key == "goodWithKids") {
                    //     return <h2>{key}: {pet[key]} </h2>
                    // }
                    
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
        
        
    )

}
export default Edit;