import React from 'react';
import { useParams } from 'react-router-dom';

const Edit = (props) => {

    let {id} = useParams();

    return(
        <h1>
            {id}
        </h1>
    )

}
export default Edit;