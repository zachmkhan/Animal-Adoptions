import React from 'react'
import MaterialTable from 'material-table'

const Admin = () => {
    return(
        <div>
            {/* <Tab label="Add Dog" to="/addDog" component={Link} /> 
            <Tab label="Add Cat" to="/addCat" component={Link} />
            <Tab label="Add Other" to="/addAnimal" component={Link} />
            <br></br> */}
            <MaterialTable
                title="Multiple Actions Preview"
                columns={[
                    { title: 'Animal', field: 'animal' },
                    { title: 'Name', field: 'name' },
                    { title: 'Breed', field: 'breed' },
                    { title: 'Age', field: 'age', type: 'numeric' },
                    { title: 'Sex', field: 'sex'},
                    { title: 'Weight', field: 'weight', type: 'numeric' },
                    { title: 'Good with dogs', field: 'dogs', type: 'boolean', render: rowData => (rowData.mode ? "Yes" : "No"), },
                ]}
                data={[
                    { animal: 'Dog', name: 'Bingo', age: 3, sex: 'male', weight: '42', dogs: true, breed: 'Doberman' },
                ]}        
                actions={[
                    {
                    icon: 'save',
                    tooltip: 'Save User',
                    //onClick: (event, rowData) => alert("You saved " + rowData.name)
                    },
                    {
                    icon: 'delete',
                    tooltip: 'Delete User',
                    //onClick: (event, rowData) => confirm("You want to delete " + rowData.name)
                    }
                ]}
            />
        </div>
        
    )
}
export default Admin;