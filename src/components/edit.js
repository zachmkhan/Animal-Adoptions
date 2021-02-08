import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';


const petData = [
    { id: '1', animal: 'Dog', name: 'Bingo', age: 3, sex: 'male', weight: '42', dogs: false, breed: 'Doberman' },
    { id: '2', animal: 'Dog', name: 'Brutus', age: 3, sex: 'male', weight: '55', dogs: false, breed: 'Boxer' },
    { id: '3', animal: 'Cat', name: 'Luna', age: 6, sex: 'female', weight: '15', dogs: true, breed: 'Siamese' }
]


const Edit = (props) => {

    const [pet, setPet] = React.useState([]);
    let {id} = useParams();
    const url = `http://flip2.engr.oregonstate.edu:4256/pet/${id}`

    useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((data) => setPet(data["rows"]))
	}, [])

      

  
  

    return(

        <div>
            {pet.map((pet) => (
				<ul>
					<h2>{pet.name}</h2>
				</ul>
			))}
            
            
        </div>
        
    )

}
export default Edit;