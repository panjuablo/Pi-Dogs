import { React } from 'react';
import { useDispatch } from 'react-redux';
import { orderOrig } from '../../Act-Red/action';
import styleImage from '../../Styles/navBar.module.css';

export default function FilterOrigen(){
    const dispatch = useDispatch();

    function handleClick(e){
        e.preventDefault();
        dispatch(orderOrig(e.target.value))
    }

    return (
        <div className={styleImage.search}>
            <select onChange={(e) => handleClick(e)}>
                <option value='all'>All</option>
                <option value='dataBase'>Created</option>
                <option value='api'>Existing</option>
            </select>
        </div>
    )
}