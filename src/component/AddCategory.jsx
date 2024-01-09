import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import imageLogo from '../assets/imageLogo.svg'
import loader from '../assets/VAyR.gif'
const AddCategory = () => {
const [isLoading, setIsLoading]=useState(false);
const [category,setCategory]=useState('');
const [selectedFile,setSelectedFile]=useState(null);
const [hasError,setHasError]=useState(false);
const [error,setError]=useState('');
const [imageUrl,setImageUrl]=useState(imageLogo);

let navigate=useNavigate();


const fileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]))
}


const submitHandler = (e) => {
    
setHasError(false);

e.preventDefault();
console.log('submit');
const formData=new FormData();
formData.append('name',category);
formData.append('photo',selectedFile);
setIsLoading(true);

axios.post('https://mern-api-psi.vercel.app/category',formData,{
    headers:{
        Authorization:'Bearer '+localStorage.getItem('token')
    }
})
.then((response)=>{
  
    setIsLoading(false);
    console.log(response);
    navigate('/dashboard/category')
})
.catch((err)=>{
 
    setIsLoading(false);
    setHasError(true);
    setError(err.message)
    console.log(err);

})


}



  return (
    <>
{isLoading&&<div><img className="w-[100px]" src={loader} alt="hello" /></div>}

 {!isLoading&&<div>
    <h1 >Add new Category</h1>
    <form className='flex flex-col border-2 border-green-800 ' onSubmit={submitHandler}>
      <input onChange={(e)=>{setCategory(e.target.value)}} className="border-2 border-black" type="text" />  
      <input onChange={(e)=>{fileHandler(e)}} type="file" />
      <button className='bg-slate-200 p-4 border border-black' type="submit">Submit</button>  
      <br />
      <img src={imageUrl} style={{width:"100px"}} alt="" />
    </form>
   </div>}

{hasError&&<div> <p className='text-red-600'>{error}</p> </div>}

    </>
  )
}

export default AddCategory