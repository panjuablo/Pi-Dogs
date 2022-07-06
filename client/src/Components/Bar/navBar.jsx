import { React } from 'react';
import SearchBar from './SearchBar';
import OrderAlph from './OrderAlph';
import OrderWeight from './OrderWeight';
import FilterOrigen from './FilterOrigen';
import FilterTemp from './FilterTemp';
import styleImage from '../../Styles/navBar.module.css'

export default function NavBar({setOrder, setPag, setSearch}){

    return (
        <div className={styleImage.nav}>
            <OrderAlph setOrder={setOrder}/>
            <OrderWeight setOrder={setOrder}/>
            <FilterOrigen setOrder={setOrder}/>
            <FilterTemp setOrder={setOrder} setPag={setPag}/>
            <SearchBar setSearch={setSearch} setPag={setPag}/>
        </div>
    )
}