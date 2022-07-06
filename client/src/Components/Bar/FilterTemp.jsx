import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemp, orderTemp } from '../../Act-Red/action';
import styleImage from '../../Styles/navBar.module.css';

export default function FilterTemp({setOrder, setPag}){
    const dispatch = useDispatch(); //ejecuta el hook y lo guarda en la variable
    const temp = useSelector((state) => state.temperaments); //traemos el estado de temperaments desde el reducer

    useEffect(() => {
        dispatch(getTemp()) // montamos el componente y despacha la accion que trae la url con los temperamentos
    },[dispatch])
    
    function handleTemp(e){ 
        e.preventDefault(); //evita que el manejador se rompa en caso de que dependa de algo más
        dispatch(orderTemp(e.target.value));
        setPag(1); 
        setOrder(`Ordenado ${e.target.value}`);
    }
    
    return (
        <div className={styleImage.search}>
            <select onChange={(e) => handleTemp(e)}>
                <option value='all'>Temperaments</option>
                { temp?.map((el) => {
                    return(<option value={el.name} key={el.id}>{el.name}</option>)
                })}
            </select>
        </div>
    )
}