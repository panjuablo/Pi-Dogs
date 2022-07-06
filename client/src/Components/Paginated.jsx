import React from 'react';
import styleImage from '../Styles/Paginate.module.css'

export default function Paginated({ dogPag, allDogs, page }){
    const pagNumber = [];

    for(let i=1; i<=Math.ceil(allDogs/dogPag); i++){
        pagNumber.push(i)
    }

    return (
        <nav className={styleImage.paginate}>
            <ul>
                {pagNumber && pagNumber.map(number => (
                        <button key={number} onClick={() => page(number)}>{number}</button>
                ))}
            </ul>
        </nav>
    )
}