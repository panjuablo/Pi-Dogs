import { React } from 'react';
import { useDispatch } from 'react-redux';
import { orderAlph, getDogs } from '../../Act-Red/action';
import styleImage from '../../Styles/navBar.module.css'

export default function OrderAlph({setOrder}){
    const dispatch = useDispatch();

    function handleClick(e){
        e.preventDefault();
        if(e.target.value !== 'all'){
        dispatch(orderAlph(e.target.value))
        setOrder(`Ordenado ${e.target.value}`)
        }else{
            dispatch(getDogs());
        }
    }

    return (
        <div className={styleImage.search}>
            <select onChange={(e) => handleClick(e)}  defaultValue='all'>
                <option value='all'>Name</option>
                <option value='a_z'>A-Z</option>
                <option value='z_a'>Z-A</option>
            </select>
        </div>
    )
}