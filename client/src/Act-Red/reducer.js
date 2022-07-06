import { GET_DOGS, GET_TEMP, GET_DETAILS, SEARCH_BAR, POST_DOG, SET_DETAILS,
    ORDER_TEMP, ORDER_ORIG, ORDER_ALPH, ORDER_WEIGHT } from '../Components/const';

const initialState = {
    allDogs: [],
    Dogs: [],
    details: {},
    temperaments: []
}

function reducer( state=initialState, action){
    switch(action.type){
        
        case GET_DOGS:
            return{
                ...state,
                allDogs: action.payload,
                Dogs: action.payload
            }

        case GET_TEMP:
            return{
                ...state,
                temperaments: action.payload
            }

        case GET_DETAILS:
            return{
                ...state,
                details: action.payload
            }

        case SET_DETAILS:
            return{
                ...state,
                details: {}
            }

        case ORDER_TEMP:
            return{
                ...state,
                allDogs: action.payload === 'all'? state.allDogs
                : state.Dogs.filter(e => e.temperaments.includes(action.payload))
            }

        case ORDER_ORIG:
            const created = state.Dogs.filter((e) => e.createdInDb);
            const noCreated = state.Dogs.filter((e) => !e.createdInDb);
            const ambos = [...created, ...noCreated]
            
            return{
                ...state,
                allDogs: action.payload === 'api'? noCreated
                : action.payload === 'dataBase'? created
                : ambos
            }

        case ORDER_ALPH:
            const aToZ = action.payload === 'a_z'
            ? state.allDogs.sort((a, b) => a.name.localeCompare(b.name))
            : state.allDogs.sort((a, b) => b.name.localeCompare(a.name));
            
            return{
                ...state,
                allDogs: aToZ
            }
            
        case ORDER_WEIGHT:
            const weight = action.payload === 'desc' && action.payload !== 'all'
            ? state.allDogs.sort((a, b) => b.weight.localeCompare(a.weight))
            : state.allDogs.sort((a, b) => a.weight.localeCompare(b.weight));

            return{
                ...state,
                allDogs: weight
            }

        case SEARCH_BAR:
            return{
                ...state,
                allDogs: action.payload
            }

        case POST_DOG:
            return{
                ...state
            }    
            
        default:
            return{
                ...state
            }
    }
};

export default reducer;