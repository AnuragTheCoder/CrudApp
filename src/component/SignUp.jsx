import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import loader from '../assets/VAyR.gif'


const SignUp = () => {
    
const [isLoading, setIsLoading]=useState(false);
const [hasError,setHasError]=useState(false);
const [error,setError]=useState('');
    const [userName,setUserName]=useState('');
    const [password,setpassword]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    let navigate=useNavigate();

    const submitHandler = (event)=>{
        event.preventDefault();
        setIsLoading(true);
        setHasError(false);
        axios.post('https://mern-api-psi.vercel.app/user/signup',{
            userName:userName,
            password:password,
            email:email,
            phone:phone
        }).then((res)=>{
            console.log(res);
            setIsLoading(false);
            setHasError(false)
            navigate('/login');
        })
        .catch((err)=>{
            setIsLoading(false);
            setHasError(true);
            setError(err.message)
            console.log(err);
        })
    }
  return (
    <div>
        {isLoading&&<div><img className="w-[100px]" src={loader} alt="hello" /></div>}

        {!isLoading&&<div>
<h1 className='w-[100vw] h-[10vh] text-center bg-yellow-200 text-green-600 font-bold text-2xl'>Create Account</h1>
<div className='bg-black  text-white w-[100vw] h-[70vh] p-[20] relative flex flex-col items-center justify-center'>
<form onSubmit={submitHandler} className=' text-white p-[20] m-auto block absolute'>

   <div className='flex items-center justify-center '> <label className='bg-blue-800 text-center rounded-md h-[30px] w-[100px] mr-7 block'>Username</label>  <input type="text" placeholder='username' className='border-2 bg-blue-600 hover:border-black my-2 p-2 w-[300px] block ' value={userName} onChange={(e)=>setUserName(e.target.value)}  /></div>
    <br />
    <div className='flex items-center justify-center '><label className='bg-blue-800 text-center rounded-md h-[30px] w-[100px] mr-7 block'>Password</label><input type="password" placeholder='password' value={password} onChange={(e)=>setpassword(e.target.value)} className=' block border-2 bg-blue-600  my-2 p-2 w-[300px] hover:border-black' /></div>
    <br />
    <div className='flex items-center justify-center '><label className='bg-blue-800 text-center rounded-md h-[30px] w-[100px] mr-7 block'>Email</label> <input type="text" placeholder='email' autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)} className=' block border-2 bg-blue-600  my-2 p-2 w-[300px] hover:border-black'  /></div>
    <br />
    <div className='flex items-center justify-center '><label className='bg-blue-800 text-center rounded-md h-[30px] w-[100px] mr-7 block'>Phone</label> <input type="number" placeholder='phone' value={phone} onChange={(e)=>setPhone(e.target.value)} className=' block border-2 bg-blue-600  my-2 p-2 w-[300px] hover:border-black'  /></div>
    <br />
    <button type="submit" className='p-4 bg-green-300 hover:bg-green-500 text-black font-bold rounded-lg hover:text-white text-center border-4  border-purple-400 hover:border-green-600'>Submit</button>
</form>
</div>
</div>
}

{hasError&&<div> <p className='text-red-600'>{error}</p> </div>}

    </div>
  )
}

export default SignUp