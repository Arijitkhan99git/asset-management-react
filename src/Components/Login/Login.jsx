import React, { useContext, useRef, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

function Login() {

    const navigate = useNavigate()

    const state = useContext(AppContext)

    const errorMessageRef = useRef(null)
    const successMessageRef= useRef(null)

    const [email, setEmail] = useState('')
    const [password, setPassword]= useState('')
    const [loginMessage, setLoginMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Email is:", email);
        console.log("Password id:", password);      
        console.log(state);

        fetchDataforLogin(email, password)
       
  }

   // Calling the Login API to goto the Dashboard
    async function fetchDataforLogin(emailVal, passVal) 
    {
        let authToken ;
        
        try {
                const response = await fetch('https://assetmanagement.setside.app/api/auth/login', {
                    method: "POST",

                    body: JSON.stringify({
                        "email": emailVal,
                        "password": passVal
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                
     
                if(response.ok){
                   console.log(response);
                   
                    const value = await response.json()
                    console.log(value);
                    
                    authToken= value.token;

                    if(value.success)
                        {
                            if (successMessageRef.current) {
                                if(errorMessageRef.current) errorMessageRef.current.classList.add('hidden');
                                
                                successMessageRef.current.classList.remove('hidden')
                                setLoginMessage('Fetching your data, Please wait!')

                            }
                        localStorage.setItem("token",authToken)
                        
                        checkUserRole() //This will check the user's role and redirect to the desired page    
                            
                    }   
                }else{                  
                    throw new Error("Invalid Credintials")
                }                   
            } 
            catch (error) {
               if (errorMessageRef.current) {
                    errorMessageRef.current.classList.remove('hidden')
                    setLoginMessage('Incorrect email or password. Please try again.')

                }
                console.log(error);
                    
            }
    }

                
    async function checkUserRole() {
        console.log("Checking logged user");
        let authToken = localStorage.getItem("token")

        try {
                const response = await fetch('https://assetmanagement.setside.app/api/users/get-my-profile', {
                    method: 'GET', 
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json' 
                    }
                    })
        
                if(!response.ok){
                    throw new Error("Could not fetch resource")
                } 

                const value = await response.json()
                
                if(value.success)
                {
                    console.log(value.message);
                    state.setIsLogIn(true)  // Set the context state as true

                    const userRole = value.user.role

                    if (userRole == "admin") 
                    {
                        console.log("logged user is:"+userRole);
                        state.setUserRole(userRole)
                        navigate('/homepage/dashboard');                                       

                    }else if(userRole == "employee")
                    {
                        state.setUserRole(userRole)
                        console.log("logged user is:"+userRole);
                      
                        
                        navigate('/employeeProfile');                     
                                                        
                    }
                    
                }
                
            } 
            catch (error) {
                    console.log(error);
                    
            }
    }

       
    

  return (
    <>
        <div id="loginpage"  className="flex justify-center items-center min-h-screen max-h-screen overflow-hidden ">
            <div className="flex flex-col justify-center bg-white rounded-lg p-10 w-md shadow-sm">
                <div className="mb-7">
                    <h1 className="text-center text-2xl font-bold text-black">Asset Management</h1>
                    <p className="text-center mt-2 ">Sign in to your account</p>
                </div>

              <form onSubmit={handleSubmit}>
                 <div className="flex flex-col mb-4 ">
                        <label htmlFor="emailInput" className="text-stone-600 font-medium">Email</label>
                        <input 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className="border border-gray-400 border-solid rounded-md p-1" type="email" required placeholder="Enter your email" name="email"/>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="passwordInput" className="text-stone-600 font-medium">Password</label>
                        <input
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            className="border border-gray-400 border-solid rounded-md p-1" 
                            type="password" required placeholder="Enter your password" 
                            name="password"/>
                    </div>
                    <div >
                        <button type="submit" className="text-white bg-blue-600 w-full p-1 mt-2 rounded-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out "> Sign In
                        </button>
                    </div>   
            </form> 
                <p ref={successMessageRef}
                    className='hidden text-center text-base font-semibold p-4 text-blue-700'>{loginMessage}
                </p>
                <p ref={errorMessageRef}
                    className='hidden text-center text-base font-semibold p-4 text-red-500'>{loginMessage}
                </p>
            </div>
        </div>
    </>
  )
}

export default Login