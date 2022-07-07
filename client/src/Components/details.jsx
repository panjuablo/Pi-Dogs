import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getId, setDetails } from "../Act-Red/action";
import Loading from './Loading';
import style from '../Styles/details.module.css';

export default function Details(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const theDog = useSelector((state) => state.details)
    const [ loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getId(id))
        return () => {dispatch(setDetails())}
    },[dispatch, id]);

    
    return(
        <div className={style.fondo}>
            <button className={style.button1}>
                <Link to='/dogs' style={{color:"white"}}>← Back</Link>
            </button>
            {console.log(theDog)}
            { theDog.length !== 0 ?
            <div className={style.card}>
                <img src={theDog['createdInDb'] === true ? theDog['image'] 
                : `https://cdn2.thedogapi.com/images/${theDog['image']}.jpg`} alt='Img not found' width='30%' height='350px'/>
                <h2>Name: {theDog['name']}</h2>
                <h2>Temperaments: {theDog['createdInDb'] === true ? theDog['temperaments'].map(e => e.name + ', ') 
                : theDog['temperaments']}</h2>
                <h2>Weight: {theDog['weight']} Kg.</h2>
                <h2>Height: {theDog['height']} Cm.</h2>
                <h2>Life span: {theDog['createdInDb'] === true ? theDog['life_span'] + ' years' : theDog['life_span'] }</h2>
                <h2>Origin: {theDog['origin']}</h2>
            </div> : <p>(<Loading setLoading={setLoading}/>)</p>
            }
        </div>
    )
}