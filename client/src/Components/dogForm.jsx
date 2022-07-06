import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getTemp, postDog } from '../Act-Red/action';

function validate(input){
    let errors = {};
    if(!input.name || isNaN(input.name) === false){
        errors.name = 'This is not a breed of dog.';}
    else if(!input.weight || !input.weight.match(/^\d{2}(-\d{2})?$/)){
        errors.weight = 'Enter minimum - maximum weight, in numbers.'}
    else if(!input.height || !input.height.match(/^\d{3}(-\d{3})?$/)){
        errors.height = 'Enter minimum - maximum height, in numbers.'}
    else if(!input.life_span || isNaN(input.life_span) === true){
        errors.life_span = 'Enter a number.'}
    else if(!input.image || isNaN(input.image) === false){
        errors.image = 'Enter a url.'}
    else if(input.temperaments.length === 0){
        errors.temperaments = 'Enter a temperaments.'}
    else if(!input.origin || isNaN(input.origin) === false){
        errors.origin = 'Enter a country.'}
    return errors;
}

export default function DogForm({}){
    const dispatch = useDispatch();
    const history = useNavigate();
    const temps = useSelector((state) => state.temperaments);
    const [ errors, setErrors ] = useState({});
    const [ input, setImput ] = useState({
        name:'',
        height:'',
        weight:'',
        life_span:'',
        image:'',
        temperaments:[],
        origin:''
    })

    function handleChange(e){
        setImput({         //este manejador hace que cada vez que se ejecute esta funcion cambie guarde el value de ese name
            ...input,
            [e.target.name] : e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    };

    function handleSelect(e){
        if(!input.temperaments.includes(e.target.value)&& e.target.value !== 'Temperaments'){
            setImput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            })
        }
    };

    function handleDelete(p){
        setImput({
            ...input,
            temperaments: input.temperaments.filter((e) => (e !== p))
        });

        setErrors(validate({
            ...input,
            temperaments: [input.temperaments]
        }))
    };

    function handleSubmit(e){
        e.preventDefault();
        setErrors(validate(input));
        const saveError = validate(input);

        if(Object.values(saveError).length !== 0){
            alert('Please complete all inputs!!!')
        }else{
            const exe = dispatch(postDog(input)).data;
            console.log(exe); 
            history('/dogs');
        }

        setImput({
            name:'',
            height:'',
            weight:'',
            life_span:'',
            image:'',
            temperaments:[],
            origin:''
        })
    }
    

    useEffect(() => {
        dispatch(getTemp());
    },[]);

    return(
        <div>
            <Link to='/dogs'>
                <button>← Back</button>
            </Link>
            <h1>My puppy</h1>
            <form>
                <div>
                    <label>Name:</label>
                    <input type='text' value={input.name} name='name' onChange={(e) => handleChange(e)}/>
                    {errors.name && (<p className='error'>{errors.name}</p>)}
                </div>
                <div>
                    <label>Weight:</label>
                    <input type='text' value={input.weight} name='weight' onChange={(e) => handleChange(e)}/>
                    {errors.weight && (<p className='error'>{errors.weight}</p>)}
                </div>
                <div>
                    <label>Height:</label>
                    <input type='text' value={input.height} name='height' onChange={(e) => handleChange(e)}/>
                    {errors.height && (<p className='error'>{errors.height}</p>)}
                </div>
                <div>
                    <label>Life span:</label>
                    <input type='number' min='1' max='30' value={input.life_span} name='life_span' onChange={(e) => handleChange(e)}/>
                    {errors.life_span && (<p className='error'>{errors.life_span}</p>)}
                </div>
                <div>
                    <label>Origin:</label>
                    <input type='text' value={input.origin} name='origin' onChange={(e) => handleChange(e)}/>
                    {errors.origin && (<p className='error'>{errors.origin}</p>)}
                </div>
                <div>
                    <label>Image:</label>
                    <input type='url' value={input.image} name='image' onChange={(e) => handleChange(e)}/>
                    {errors.image && (<p className='error'>{errors.image}</p>)}
                </div>
                <div>
                    <select onChange={handleSelect}>
                        {temps.map((e) => (
                            <option key={e.name} value={e.name} onChange={handleSelect}>{e.name}</option>
                        ))}
                    </select>
                    {errors.temperaments && (<p className='error'>{errors.temperaments}</p>)}
                    <div>
                        <ul>{input.temperaments.map((e) => {
                            return((<ul key={e}>
                                <li>{e + ', '}</li>
                                <button onClick={() => {handleDelete(e)}}>x</button>
                            </ul>
                            ))})}
                        </ul>
                    </div>
                </div>
                <button type='submit' onClick={(e) => handleSubmit(e)}>Create</button>
            </form>
        </div>
    )
}

{/* <ul>{input.temperaments.map((e) => {e + ', '})}</ul> */}