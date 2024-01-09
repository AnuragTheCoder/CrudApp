import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import loader from '../assets/VAyR.gif'

const Detail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState({});
    const [hasError,setHasError]=useState(false);
    const [error,setError]=useState('');

    let params = useParams();
    useEffect(() => {
        setIsLoading(true);
        axios.get('https://mern-api-psi.vercel.app/category/' + params.id)
            .then(res => {
                console.log(res.data.category)
                ;
                setCategory(res.data.category);
                setIsLoading(false)
                setHasError(false);
            })
            .catch(err => { console.log(err); setIsLoading(false);setHasError(true);setError(err.response.data.message) })

    }, [params.id])
    return (
        <div className=''>
        
    {isLoading&&<div><img className="w-[100px]" src={loader} alt="hello" /></div>}
            {!isLoading&& <img className='w-[200px]' src={category.photo} alt="" />}
           
            <h1> {category.name} </h1>
            
{hasError&&<div> <p className='text-red-600'>{error}</p> </div>}
        </div>

        
    )
}

export default Detail