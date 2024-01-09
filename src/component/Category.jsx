import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import loader from '../assets/VAyR.gif'
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const [hasError,setHasError]=useState(false);
const [error,setError]=useState('');
    const [categoryList,setCategoryList]=useState([]);
    const [isLoading, setIsLoading]=useState(false);

const navigate=useNavigate();

const detailRoute=(id)=>{
    navigate('/dashboard/detail/'+id);
}

const editRoute=(id)=>{
    navigate('/dashboard/edit/'+id);
}
const deleteData=(id,imageLink)=>{

   if(window.confirm('Are you sure')){
    axios.delete('https://mern-api-psi.vercel.app/category?id='+id+'&imageUrl='+imageLink)
    .then(res=>{
        console.log(res);
        getData();
    })
    .catch((err)=>{
        console.log(err);
    })
   }
   else{
    console.log('cancel');
   }

}
const handleLogout=()=>{
    localStorage.clear();
    navigate('/login')
}

//lets Style this Sbit'

const getData=()=>{
    axios.get('https://mern-api-psi.vercel.app/category',{
        headers:{
            Authorization:'Bearer '+localStorage.getItem('token')
        }
    })
.then(res=>{
    console.log(res);
    setCategoryList(res.data.category)
    console.log(res.data.category)
    setIsLoading(false);
    setHasError(false);
})
.catch((err)=>{
    setIsLoading(false);
    console.log(err.response.data.message);
    console.log(err);
    setError(err.response.data.message);
    setHasError(true);
})

}
useEffect(()=>{
    setIsLoading(true);
    getData();
    },[]);
  return (
    <>

    {isLoading&&<div><img className="w-[100px]" src={loader} alt="hello" /></div>}
   {!isLoading&&!hasError&&
   <div>
    <button onClick={handleLogout} className='m-4   bg-green-300 hover:bg-green-400 text-xl text-purple-700 font-bold  w-[80px] h-[60px] rounded-lg p-1 border-2 border-black'>Logout</button>
   <h1 className='text-2xl font-bold text-blue-800 border-2 sticky bg-opacity-[0.5] top-0 border-red-700 my-4 p-4 bg-red-200 text-center'>Categories</h1>

<table className='gap-2 border-2  border-green-700  m-auto   '>
    <thead className='border-4 border-black'>
        <tr className='bg-orange-300' >
            <th className='text-lg font-bold border-4 border-black'>Name</th>
            <th className='text-lg font-bold border-4 border-black bg-orange-300'>Image</th>
        </tr>
    </thead>
    <tbody>
        
           {categoryList?.map(data=>
            <Row key={data._id} detail={data} editReq={editRoute} detailRequest={detailRoute} deleteReq={deleteData}/>
           )}
    
    </tbody>
</table>
   </div>}


   
   
{hasError&&<div> <p className='text-red-600'>{error}</p> </div>}
    </>
  )
}


const Row=(props)=>{
    return(
        <tr className='border-2  border-black p-4 '>
<td className='border-2 m-4 p-4 text-black font-bold border-black bg-lime-200'>{props.detail.name}</td>
<td><img alt='noImage' className='w-[150px] h-[150px] rounded-xl m-4 border-2 border-black' src={props.detail.photo}></img></td>
<td><button className='  bg-green-300 hover:bg-green-400 text-xl text-purple-700 font-bold  w-[80px] h-[60px] rounded-lg p-1 border-2 border-black'  onClick={()=>{props.editReq(props.detail._id)}}>Edit</button></td>
<td><button className='  bg-yellow-300 hover:bg-yellow-400 text-xl text-purple-700 font-bold  w-[80px] h-[60px] rounded-lg p-1 border-2 border-black' onClick={()=>{props.detailRequest(props.detail._id)}}>Detail</button></td>
<td><button className='  bg-red-300 hover:bg-red-400 text-xl text-purple-700 font-bold  w-[80px] h-[60px] rounded-lg p-1 border-2 border-black' onClick={()=>{props.deleteReq(props.detail._id,props.detail.photo)}}>Delete</button></td>

        </tr>
    )
}

export default Category