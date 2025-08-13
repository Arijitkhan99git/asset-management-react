import React, { useContext, useRef, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { Menu } from 'react-feather'
import { User } from 'react-feather'

function Header() {
    const navigate = useNavigate()
    const state = useContext(AppContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isProfile, setIsprofile] = useState(false)

    const toggleRef = useRef(null) 

    const onLogOut =()=>{
        setIsprofile(false)

        state.setIsLogIn(false) 
        localStorage.setItem("token","")
        alert("Logged out successfully")
        navigate('/login')
    }

    const handelMenu =()=>{      
       setIsMenuOpen(!isMenuOpen)
        
    }
    
    const closeMenu = () => {       
        setIsMenuOpen(false)
    }

    const handelProfile = ()=>{

        setIsprofile(!isProfile)
        
    } 

    const closeProfileMenu = ()=>{
        setIsprofile(false)
    }
        
  return (
    <nav className='shadow-md'>
        <div className='flex justify-between py-2 px-4 md:px-6 lg:px-10'>

       
            <div className=' mx-2 sm:mx-4'>
                <h1 className='text-lg lg:text-2xl font-semibold text-black p-2'>Asset Management</h1>
            </div>

            <div className='flex'>          
                {/* Desktop View */}
                <div  className='hidden md:flex '>             
                    <ul className='flex items-center gap-3 lg:gap-5  text-lg pr-2'>
                        <li>
                                <NavLink
                                to='/homepage/dashboard'
                                onClick={closeMenu}
                                className={({isActive}) =>
                                ` duration-200 p-2
                                ${isActive ? "text-orange-700" : "text-gray-700"}
                                hover:text-blue-700` }
                                    >
                                        Dashboard
                                </NavLink>

                        </li>

                        <li>
                            <NavLink
                            to='/homepage/assets'
                            onClick={closeMenu}
                                className={({isActive}) =>
                                    ` duration-200 p-2                        
                                    ${isActive ? "text-orange-700" : "text-gray-700"}
                                    hover:text-blue-700` }
                            >
                            Assets
                        </NavLink>
                        </li>

                        <li>                          
                                <NavLink
                                to='/homepage/users'
                                onClick={closeMenu}
                                    className={({isActive}) =>
                                        ` duration-200 p-2
                                        ${isActive ? "text-orange-700" : "text-gray-700"}
                                        hover:text-blue-700 `  }
                                >
                                    Users
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to='/homepage/assignments'
                                onClick={closeMenu}
                                    className={({isActive}) =>
                                        `  duration-200 p-2                       
                                        ${isActive ? "text-orange-700" : "text-gray-700"}
                                        hover:text-blue-700 `    }
                                >Asset Assigments
                            </NavLink>
                        </li>         
                    </ul>
                                                        
                </div>
            
                {/* Profile and user Menu */}
                <div className='flex items-center gap-10 mx-6 '>                                 

                    <button onClick={handelMenu} className='md:hidden '>
                            <Menu className="h-6 w-6 text-gray-800 cursor-pointer"></Menu>
                    </button>  

                    <button onClick={handelProfile} className='w-10 h-10 rounded-full border-2 border-gray-400 
                                    flex justify-center items-center hover:bg-blue-200'>
                                    <User className="h-6 w-6 text-gray-600"></User>
                    </button>      
                        
                </div>

                {/* Profile tab */}
                <div  className={`${isProfile? 'flex': 'hidden'} absolute top-[10%]  right-[5%] w-[30%] md:w-[20%] lg:w-[15%] h-[20%] 
                    lg:h-[25%] z-30 justify-center items-center bg-white rounded-md shadow-md border border-gray-200`}>
                    <div className='grid gap-y-6 p-6'>
                        <div>
                            <NavLink
                                to='/homepage/profile'
                                onClick={closeProfileMenu}
                                className={({isActive}) =>
                                    ` duration-200 block font-semibold bg-gray-100 p-2 rounded-md shadow-sm
                                    
                                    ${isActive ? "text-orange-700" : "text-gray-700"}
                                    hover:text-blue-700 `
                                }
                                >Profile
                            </NavLink>
                        </div>
                        <div>
                            <button className="block font-semibold text-gray-700 duration-200 hover:text-red-500 bg-gray-100 p-2 rounded-md shadow-sm" 
                                onClick={onLogOut}>Logout
                            </button>
                        </div>
                    </div>   
                    
                </div>
            </div>                 
        </div>  

         {/* Mobile Menu*/}
         <div  className={`${isMenuOpen ? 'block': 'hidden' }  md:hidden bg-gray-50 space-y-2 p-3 rounded-md shadow-md border border-gray-100`}>             
            <ul className=' font-semibold'>
                <li>
                        <NavLink
                        to='/homepage/dashboard'
                        onClick={closeMenu}
                        className={({isActive}) =>
                        `block duration-200 p-2
                        ${isActive ? "text-orange-700" : "text-gray-700"}
                              hover:text-blue-700`
                                }
                            >
                                Dashboard
                        </NavLink>

                </li>

                <li>
                    <NavLink
                    to='/homepage/assets'
                    onClick={closeMenu}
                        className={({isActive}) =>
                            `block duration-200 p-2                        
                            ${isActive ? "text-orange-700" : "text-gray-700"}
                             hover:text-blue-700`
                        }
                    >
                    Assets
                </NavLink>
                </li>

                <li>                          
                        <NavLink
                        to='/homepage/users'
                         onClick={closeMenu}
                            className={({isActive}) =>
                                `block duration-200 p-2
                                ${isActive ? "text-orange-700" : "text-gray-700"}
                                 hover:text-blue-700 `
                            }
                        >
                            Users
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to='/homepage/assignments'
                         onClick={closeMenu}
                            className={({isActive}) =>
                                `block  duration-200 p-2                       
                                ${isActive ? "text-orange-700" : "text-gray-700"}
                                 hover:text-blue-700 `
                            }
                        >Asset Assigments
                    </NavLink>
                </li>          
            </ul>
                                                
        </div>


    </nav>

    
  )
}

export default Header