import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { getDogs } from '../Act-Red/action';
import NavBar from './Bar/navBar';
import Paginated from './Paginated';
import Loading from './Loading';
import Dogs from './Dogs';
import styleImage from '../Styles/home.module.css'


export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.allDogs);
    const [ currentPag, setPag ] = useState(1);
    const [ dogPag, setDog ] = useState(8);
    const [ order, setOrder ] = useState('');
    const lastDog = currentPag * dogPag;
    const firstDog = lastDog - dogPag;
    const currentDog = allDogs.slice(firstDog, lastDog);
    const page = (pagNumber) => {setPag(pagNumber)};
    const [ loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getDogs())
    },[dispatch]);

    useEffect(() => {
        setPag(1)
    },[dispatch]);
    
    return (
        <div className={styleImage.back}>
            <h1 className={styleImage.title}>Dogs of the world</h1>
            <button className={styleImage.button}>
                <Link to='/dog' style={{color:"white"}}>Add dog!</Link>
            </button>
            <NavBar setOrder={setOrder} setPag={setPag}/>
            <Paginated 
            dogPag={dogPag} allDogs={allDogs.length} page={page}/>
            <div  className={styleImage.cards}>
            {allDogs.length === 0 ? 'loading' // <p>(<Loading setLoading={setLoading}/>)</p>
            : currentDog?.map(e => {
                return(
                    <div key={e.name}>
                        <Dogs name={e.name}
                        id={e.id}
                        weight={e.weight}
                        image={e.image ? e.image : <img alt='https://thumbs.dreamstime.com/b/perrito-triste-20576218.jpg'/>}
                        temperaments={e.temperaments}
                        createdInDb={e.createdInDb}
                        />
                    </div>)
            })}
            </div>
        </div>
    )
}