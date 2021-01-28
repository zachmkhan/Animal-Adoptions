import React from 'react';
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

const AddDog = () => {
    const [name, setName] = React.useState("");
    const [breed, setBreed] = React.useState("");
    const [age, setAge] = React.useState("");
    const [weight, setWeight] = React.useState("");
    const [dogs, setDogs] = React.useState(false);
    const [cats, setCats] = React.useState(false);
    const [kids, setKids] = React.useState(false);
    const [fence, setFence] = React.useState(false);
    const [trained, setTrained] = React.useState(false);
    const [neut, setNeut] = React.useState(false);


    const handleSubmit = (event) => {
        console.log(`
          User: ${name}
          Breed: ${breed}
          Age: ${age}
          Weight: ${weight}
          Good with dogs: ${dogs}
          Good with cats: ${cats}
          Good with kids: ${kids}
          Fence?: ${fence}
          Neutered/Spayed: ${neut}
          Housetrained: ${trained}

        `);
        event.preventDefault();
    }

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
                    <MenuItem value="Golden Retriever">Golden Retriever</MenuItem>
                    <MenuItem value="Boxer">Boxer</MenuItem>
                    <MenuItem value="Rottweiler">Rottweiler</MenuItem>
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
                <FormControlLabel
                     control={
                    <Checkbox
                        value={dogs}
                        onChange={e => setDogs(!dogs)}
                        name="checkDogs"
                           
                    />
                    }
                    label="Good with dogs"
                />
                <FormControlLabel
                     control={
                    <Checkbox
                        value={cats}
                        onChange={e => setCats(!cats)}
                        name="checkCats"
                           
                    />
                    }
                    label="Good with cats"
                />
                <FormControlLabel
                     control={
                    <Checkbox
                        value={kids}
                        onChange={e => setKids(!kids)}
                        name="checkKids"
                           
                    />
                    }
                    label="Good with kids"
                />
                <br></br>
                <FormControlLabel
                     control={
                    <Checkbox
                        value={fence}
                        onChange={e => setFence(!fence)}
                        name="checkFence"
                           
                    />
                    }
                    label="Fenced yard required"
                />
                <FormControlLabel
                     control={
                    <Checkbox
                        value={neut}
                        onChange={e => setNeut(!neut)}
                        name="checkNeut"
                           
                    />
                    }
                    label="Neutered/spayed"
                />
                <FormControlLabel
                     control={
                    <Checkbox
                        value={trained}
                        onChange={e => setTrained(!trained)}
                        name="checkTrained"
                           
                    />
                    }
                    label="Housetrained"
                />
                <br></br>
                <Button type='submit'>
                    Sign In
                </Button>
            </form>
    )
}

export default AddDog;