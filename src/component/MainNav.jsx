import React from 'react'
import { Link } from 'react-router-dom'

const MainNav = () => {
  return (
    <>
    <nav className='flex border-2 p-[20px] border-yellow-100 bg-black sticky top-0 text-white'>
    <Link to='/dashboard/category' className='mx-4 hover:text-blue-600'> Category List</Link>
    <Link to='/dashboard/add-category' className='ml-auto hover:text-blue-600'>Add new Category</Link>
    </nav>
    </>
  )
}

export default MainNav