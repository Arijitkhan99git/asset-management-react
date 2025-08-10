import React, { useContext, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import Profile from './Components/Profile/Profile'




function EmployeeLayout() {
    const navigate = useNavigate()
    const onLogOut =()=>{
        localStorage.setItem("token","")
        alert("Logged out successfully")
        navigate('/login')
    }
  return (
    <>
            <div className="flex flex-row place-content-around mb-2 bg-white p-1 shadow-sm">
            <div className="flex items-center mx-4">
                <h1 className="font-semibold text-xl text-black">Asset Management</h1>
            </div>

            <nav className=" bg-white border-gray-200 px-4 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div className="justify-between items-center w-full flex">
                        <ul className="flex font-medium ">
                            <li>     
                                <NavLink
                                to='/homepage/profile'
                                className="text-orange-700 border-b py-2 px-3 mx-3 border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent hover:text-blue-700"  
                                >Profile
                                </NavLink>
                            </li>
                        </ul>
                        <button className="block font-semibold py-2 px-3 mx-3 text-gray-700 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent  hover:text-red-500" 
                            onClick={onLogOut}>Logout
                        </button>
                    </div>
                </div>
            </nav>
            </div>
           <Profile></Profile>
    </>
  )
}

export default EmployeeLayout