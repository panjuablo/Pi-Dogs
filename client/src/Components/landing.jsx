import { React } from 'react';
import { Link } from 'react-router-dom';
import styleImage from '../Styles/Landing.module.css'

export default function Landing(){
    return (
        
        <div className={styleImage.back}>
            <div className={styleImage.card}>
            <h1 className={styleImage.title}>The puppies of the world</h1>
            <Link to='/dogs'>
                <button className={styleImage.button}>Guau!!!</button>
            </Link>
            </div>
        </div>
        
    )
}