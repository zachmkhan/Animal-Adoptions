import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'

const AddPet = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleSubmit = (event) => {
        console.log(`
          User: ${username}
          Password: ${password}
        `);
        event.preventDefault();
    }

    return(
        <form onSubmit={handleSubmit}>
                <TextField
                    type='text'
                    name='username'
                    label='Enter your username...'
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                />
                <br></br>
                <TextField
                    type='password'
                    name='password'
                    label='Enter your password...'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <br></br>
                <Button type='submit'>
                    Sign In
                </Button>
            </form>
    )
}

export default AddPet;