import axios from 'axios';
import { ALL_API, ALL_TEMP, ALL_NAME, ALL_ID,
    GET_DOGS, GET_TEMP, GET_DETAILS, SEARCH_BAR, POST_DOG, SET_DETAILS,
    ORDER_TEMP, ORDER_ORIG, ORDER_ALPH, ORDER_WEIGHT } from '../Components/const';

export function getDogs(){
    return async function(dispatch){
        const api = await axios.get(ALL_API);
        return dispatch({
            type: GET_DOGS,
            payload: api.data
        })
    }
};

export function getTemp(){
    return async function(dispatch){
        const temp = await axios.get(ALL_TEMP);
        return dispatch({
            type: GET_TEMP,
            payload: temp.data
        })
    }
};

export function getId(id){
    return async function(dispatch){
        try{
            const detail = await axios.get(ALL_ID + id);
            return (dispatch)({
                type: GET_DETAILS,
                payload: detail.data
            })
        }catch(error){
            console.log(error)
        }    
    }
}

export function orderTemp(payload){
    return {
        type: ORDER_TEMP,
        payload
    }
};

export function orderOrig(payload){
    return {
        type: ORDER_ORIG,
        payload
    }
};

export function orderAlph(payload){
    return {
        type: ORDER_ALPH,
        payload
    }
};

export function orderWeight(payload){
    return {
        type: ORDER_WEIGHT,
        payload
    }
};

export function searchBar(payload){
    return async function(dispatch){
        try{
            const search = await axios.get(ALL_NAME + payload);
            return dispatch ({
                type: SEARCH_BAR,
                payload: search.data
            })
        } catch(error){
            if(error.response){
                alert(error.response.data)
            }
        }
    }
};

export function postDog(payload){
    return async function(dispatch){
        try{
            const post = await axios.post(POST_DOG, payload);
            return post;
        }catch(error){
            if(error.response){
                return alert(error.response.data)
            }
        }
    }
}

export function setDetails(){
    return {
        type: SET_DETAILS,
        
    }
}