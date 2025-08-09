import React, { useContext, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

function Header() {
    const navigate = useNavigate()
    const state = useContext(AppContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const onLogOut =()=>{
        state.setIsLogIn(false) 
        localStorage.setItem("token","")
        alert("Logged out successfully")
        navigate('/login')
    }
  return (
    // <>
    //      <div className="flex flex-row place-content-around mb-2 bg-white p-1 shadow-sm">
    //         <div className="flex items-center ">
    //             <h1 className="font-semibold text-xl text-black">Asset Management</h1>
    //         </div>
            
    //         <div id="buttonParent">
    //             <button id="viewDashboardId" className="p-1.5 m-2 text-base font-semibold hover:text-sky-500" onclick="viewDashboardFun()">Dashboard</button>
    //             <button id="openAssetId" className="p-1.5 m-2 text-base font-semibold hover:text-sky-500" onclick="showAssetDetails()">Asset</button>
    //             <button id="OpenUserDetailsId" className="p-1.5 m-2 text-base font-semibold hover:text-sky-500" onclick="OpenUserDetailsfun()">Users</button>                      
    //             <button id="openAssignmentId" className="p-1.5 m-2 text-base font-semibold hover:text-sky-500" onclick="openAssignmentfun()">Asset Assignment</button>
    //             <button id="openProfileId" className="p-1.5 m-2 text-base font-semibold hover:text-sky-500" onclick="openProfilefun()">Profile</button>
    //             <button id="logOutBtnId" className="p-1.5 m-2 text-base font-semibold hover:text-red-500" onclick="logOutFun()">Logout</button>
    //         </div>
            
    //     </div>
    // </>

        <div className="flex flex-row place-content-around mb-2 bg-white p-1 shadow-sm">
            <div className="flex items-center mx-4">
                <h1 className="font-semibold text-xl text-black">Asset Management</h1>
            </div>

            <nav className=" bg-white border-gray-200 px-4 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div className="justify-between items-center w-full flex">
                        <ul className="flex font-medium  ">
                            <li>
                                <NavLink
                                to='/homepage/dashboard'
                                    className={({isActive}) =>
                                        `block py-2 px-2 mx-3 duration-200 
                                        ${isActive ? "text-orange-700" : "text-gray-700"}
                                         border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent  hover:text-blue-700`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>  
                            
                            <li>     
                                <NavLink
                                to='/homepage/assets'
                                    className={({isActive}) =>
                                        `block py-2 px-2 mx-3 duration-200 
                                    
                                        ${isActive ? "text-orange-700" : "text-gray-700"}

                                        border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent hover:text-blue-700  `
                                    }
                                >
                                    Assets
                                </NavLink>
                            </li>
                            
                                <li>     
                                <NavLink
                                to='/homepage/users'
                                    className={({isActive}) =>
                                        `block py-2 px-2 mx-3 duration-200 

                                        ${isActive ? "text-orange-700" : "text-gray-700"}

                                        border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent hover:text-blue-700 `
                                    }
                                >
                                    Users
                                </NavLink>
                            </li>
                            
                            <li>     
                                <NavLink
                                to='/homepage/assignments'
                                    className={({isActive}) =>
                                        `block py-2 px-2 mx-3 duration-200 
                                    
                                        ${isActive ? "text-orange-700" : "text-gray-700"}

                                        border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent hover:text-blue-700 `
                                    }
                                >Asset Assigments
                                </NavLink>
                            </li>
                            <li>     
                                <NavLink
                                to='/homepage/profile'
                                    className={({isActive}) =>
                                        `block py-2 px-2 mx-3 duration-200 
                                    
                                        ${isActive ? "text-orange-700" : "text-gray-700"}

                                        border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent hover:text-blue-700 `
                                    }
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

    
  )
}

export default Header