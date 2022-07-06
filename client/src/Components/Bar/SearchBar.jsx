import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchBar, getDogs } from '../../Act-Red/action';
import styleImage from '../../Styles/navBar.module.css'

function validation(payload){
    let error = {};
    
    if(!payload || isNaN(payload) !== true){
        error.payload = 'thats not a dogito!'                             
    }
    return error;
};

export default function SearchBar({setPag}){
const dispatch = useDispatch();
const [ payload, setSearch ] = useState('');
const [ error, setError ] = useState({});

function handleInput(e){
    e.preventDefault();
    setSearch(e.target.value);
    setError(validation(payload))
}

function handleSubmit(e){
    e.preventDefault();
    setError(validation(payload));
    const error = validation(payload);

    if(Object.values(error).length !== 0){
        alert('thats not a dog!')
    }else{
        dispatch(searchBar(payload));
        setSearch('')
    }  
}

function handleBack(){
    dispatch(getDogs());
    setPag(1);
}

    return (
        <div className={styleImage.search}>
            <input  value={payload} type='text' placeholder='Search a dog...' onChange={(e) => handleInput(e)}/>
            <button type='submit' onClick={(e)=> handleSubmit(e)}>Search</button>
            <button onClick={handleBack}>Clean search</button>
        </div>
    )
}