import React from 'react';
import { Link } from 'react-router-dom';
import styleImage from '../Styles/Dogs.module.css'

export default function Dogs({name, id, weight, image, temperaments, createdInDb }){
    return(
        <div className={styleImage.card}>
            <h3>{name}</h3>
            <h5>{weight}</h5>
            <img src={image} alt='Img not found' width='30%' height='350px'/>
            <h5>{ createdInDb === true ? temperaments.map(e=> e.name + ', ')
            : Object.values(temperaments).map(e => e + ', ')}</h5>
            <Link to = {`/dogs/${id}`}>
                <button>More</button>
            </Link>
        </div>
    )
}
