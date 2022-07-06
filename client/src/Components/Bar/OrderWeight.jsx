import { React } from 'react';
import { useDispatch } from 'react-redux';
import { getDogs, orderWeight } from '../../Act-Red/action';
import styleImage from '../../Styles/navBar.module.css';

export default function OrderWeight({setOrder}){
    const dispatch = useDispatch();

    function handleClick(e){
        e.preventDefault();
        if(e.target.value === 'all'){
            dispatch(getDogs());
        }else{
            dispatch(orderWeight(e.target.value));
            setOrder(`Ordenado ${e.target.value}`);
        }
    }

    return (
        <div className={styleImage.search}>
            <select onChange={(e) => handleClick(e)}>
                <option value='all'>All</option>
                <option value='desc'>Weight ↓</option>
                <option value='asc'>Weight ↑</option>
            </select>
        </div>
    )
}