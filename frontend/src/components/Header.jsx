import React from 'react'
import { IoIosArrowDropdown } from "react-icons/io";

const Header = () => {
  return (
    <div className='absolute z-10 bg-gradient-to-b w-full from-black flex items-center justify-between px-12 py-6'>
         <img className='w-48' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png" alt="netflix-logo" />
         <div className='flex items-center' >
            <IoIosArrowDropdown className='text-lg mr-1 text-white'/>
            <h1 className='text-lg font-medium text-white'>User Name</h1>
            <div className='ml-4'>
            <button className='bg-red-600 text-white px-4 py-2 ml-4 rounded-md'>Logout</button>
            <button className='bg-red-600 text-white px-4 py-2 ml-4 rounded-md'>Search Movie</button>
            </div>
         </div>
    </div>
  )
}

export default Header