import React from 'react';
import { useParams } from 'react-router-dom';

const petData = [
    { id: '1', animal: 'Dog', name: 'Bingo', age: 3, sex: 'male', weight: '42', dogs: false, breed: 'Doberman' },
    { id: '2', animal: 'Dog', name: 'Brutus', age: 3, sex: 'male', weight: '55', dogs: false, breed: 'Boxer' },
    { id: '3', animal: 'Cat', name: 'Luna', age: 6, sex: 'female', weight: '15', dogs: true, breed: 'Siamese' }
]


const Edit = (props) => {

    let {id} = useParams();

    return(
        <h1>
            {petData[id]["name"]}
        </h1>
    )

}
export default Edit;