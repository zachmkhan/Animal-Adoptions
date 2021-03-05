import React, {useEffect} from 'react'
import MaterialTable from 'material-table'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import {Link} from 'react-router-dom'

const petData = [
    { id: '1', animal: 'Dog', name: 'Bingo', age: 3, sex: 'male', weight: '42', dogs: false, breed: 'Doberman' },
    { id: '2', animal: 'Dog', name: 'Brutus', age: 3, sex: 'male', weight: '55', dogs: false, breed: 'Boxer' },
    { id: '3', animal: 'Cat', name: 'Luna', age: 6, sex: 'female', weight: '15', dogs: true, breed: 'Siamese' }
]




const Admin = () => {

    const [pets, setPets] = React.useState([]);
    const [value, setValue] = React.useState("");

    // const url = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/pets/`

    useEffect(() => {

        const val = localStorage.getItem('admin');
        setValue(val);
        const url = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/admin/${val}/pets`
		fetch(url)
			.then((response) => response.json())
			.then((data) => setPets(data["rows"]))
        
	}, [pets])

    function deleteHandler(id) {

        const deleteUrl = `http://adoptpets.eba-uxjrmpet.us-east-2.elasticbeanstalk.com/pets/${id}`
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
        };
        console.log(id);
        fetch(deleteUrl, requestOptions).then(response => response.json())
    }

    if(!value || value.length === 0) {
        return(
            <Typography>
                You do not have permission to access this page.
            </Typography>
        )
    }

    return(
        <div>
            <Tab label="Add Dog" to="/addDog" component={Link} /> 
            <Tab label="Add Cat" to="/addCat" component={Link} />
            <Tab label="Add Other" to="/addAnimal" component={Link} />
            <br></br>
            <MaterialTable
                title="Pets"
                columns={[
                    { title: 'Page', field: 'petId', render: rowData => <Link to={"/pet/" + rowData.petId}>{rowData.petId}</Link>},
                    { title: 'Edit', field: 'petId', render: rowData => <Link to={"/edit/" + rowData.petId}>{rowData.petId}</Link>},
                    { title: 'Delete', field: 'petId', render: rowData => <Link to="/admin" onClick={() => {if(window.confirm('Are you sure you want to delete?')){ deleteHandler(rowData.petId)};}}>{rowData.petId}</Link>},
                    { title: 'Animal', field: 'animal' },
                    { title: 'Name', field: 'name' },
                    { title: 'Breed', field: 'breed' },
                    { title: 'Age', field: 'age', type: 'numeric' },
                    { title: 'Sex', field: 'sex'},
                    { title: 'Weight', field: 'weight', type: 'numeric' },
                    { title: 'City', field: 'city'},
                    { title: 'State', field: 'state'},

                ]}
                data={pets}        
                // actions={[
                //     {
                //     icon: 'save',
                //     tooltip: 'Save User',
                //     onClick: (event, rowData) => <Link to="/userdash"></Link>
                //     },
                //     {
                //     icon: 'delete',
                //     tooltip: 'Delete User',
                //     //onClick: (event, rowData) => confirm("You want to delete " + rowData.name)
                //     }
                // ]}
            />
        </div>
        
    )
}
export default Admin;