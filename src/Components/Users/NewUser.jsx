import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewUser() {
  const navigate = useNavigate()
  const [isDisabled, setIsDisabled] = useState(false)

  const [firstName, setFirstName] =useState('')
  const [lastName, setLastName]= useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [department, setDepartment] = useState('')

  const messageRef = useRef(null)


  const addUerBackFun = ()=>{
    navigate('/homepage/users')
    
  }

  const addNewUserSubmit =(event)=>{
    event.preventDefault();
    setIsDisabled(true)
    messageRef.current.classList.remove('hidden')
    
    addUserAPIFun()
  }

  async function addUserAPIFun()
  {

      try {
          const response = await fetch('https://assetmanagement.setside.app/api/auth/register', {
              method: "POST",
              body: JSON.stringify({
                  firstName,
                  lastName,
                  email,
                  password,
                  role,
                  department
              }),
              headers: {
                  "Content-type": "application/json; charset=UTF-8"
              }
          })
          
          const value = await response.json()

          if(value.success)
          {               
              
              alert(value.message);
              navigate('/homepage/users')
                              
          }   
          else{
              setIsDisabled(false)
              messageRef.current.classList.add('hidden');
              throw new Error(value.message)
          }     
          
      } 
      catch (error) {
              console.log(error);
              alert(error)
      }

  }

  return (
    <>
      <div className='flex w-full justify-center items-center'>
          <div id="addUser" className="w-lg flex flex-col justify-center items-center bg-white rounded-lg shadow-sm">
            <div className="flex justify-start w-full pl-4 pt-4">
                <button id="assetBackBtn" onClick={addUerBackFun} 
                    className="text-gray-700 hover:text-orange-500">&larr; Back</button>
            </div>

            <p className="text-2xl font-semibold text-stone-800 text-shadow-md mb-1">Add New User</p>
            <hr className="border-gray-200 border-1 w-full"/>
            <br/>

            <form onSubmit={addNewUserSubmit} className="w-full px-6">
                <div className="flex flex-col gap-4">

                  <div >
                      <label className="block text-stone-600 font-medium" htmlFor="addUserFname">First Name</label>
                      <input 
                        value={firstName} onChange={(e)=>setFirstName(e.target.value)}
                        id="addUserFname" className="w-full border-1 border-gray-400 border-solid rounded-md p-1 focus:border-sky-300 focus:outline focus:outline-sky-300" 
                        type="text" name="firstName" placeholder="first name" required />
                  </div>

                  <div>
                      <label className="block text-stone-600 font-medium" htmlFor="addUserLname">Last Name</label>
                      <input 
                        value={lastName} onChange={(e)=> setLastName(e.target.value)}
                        id="addUserLname" className="w-full border-1 border-gray-400 border-solid rounded-md p-1 focus:border-sky-300 focus:outline focus:outline-sky-300" 
                        type="text" name="lastname" placeholder="last name" required />
                  </div>
              
                  <div>
                      <label className="block text-stone-600 font-medium" htmlFor="addUserEmail">Email</label>
                      <input 
                        value={email} onChange={(e)=> setEmail(e.target.value)}
                        id="addUserEmail" className="w-full border border-gray-400 border-solid rounded-md p-1 focus:border-sky-300 focus:outline focus:outline-sky-300" 
                        type="email" name="email" placeholder="email" required />
                  </div>

                    <div>
                      <label className="block text-stone-600 font-medium" htmlFor="addUserPassword">Password</label>
                      <input 
                        value={password} onChange={(e)=> setPassword(e.target.value)}
                        id="addUserPassword" className="w-full border-1 border-gray-400 border-solid rounded-md p-1 focus:border-sky-300 focus:outline focus:outline-sky-300" 
                        type="text" name="password" placeholder="Enter a strong password" required />
                  </div>
                  
                  <div>
                      <label htmlFor="addUserRole" className="block text-stone-600 font-medium">Select your role</label>
                      <select 
                          value={role} onChange={(e)=>setRole(e.target.value)}
                          id="addUserRole" name="selectRole" className="bg-white border-1 border-gray-400 border-solid rounded-md p-1 focus:border-sky-300 focus:outline focus:outline-sky-300 w-full">
                          <option value="">Select a role</option>
                          <option value="employee">Employee</option>
                          <option value="admin">admin</option>
                      </select>
                  </div>

                  <div>
                      <label htmlFor="addUserDepartment" className="block text-stone-600 font-medium">
                        Select your department</label>
                      <select 
                        value={department} onChange={(e)=> setDepartment(e.target.value)}
                        id="addUserDepartment" name="selctDepartment" className="bg-white border-1 border-gray-400 border-solid rounded-md p-1 focus:border-sky-300 focus:outline focus:outline-sky-300 w-full">
                          <option value="">Select a department</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Sales">Sales</option>
                          <option value="HR">HR</option>
                          <option value="Finance">Finance</option>
                          <option value="Other">Other</option>
                      </select>
                  </div>
                    
                </div>

                <div className="flex place-content-between my-6">       
                    <div className="flex ">
                        <button disabled={isDisabled} type="button" onClick={addUerBackFun} className="text-gray-700 text-md bg-gray-200 rounded-md p-2 mr-4">Cancel</button>
                        <button disabled={isDisabled} type="submit" className="text-white text-md bg-blue-500 rounded-md p-2">Submit</button>           
                    </div>

                      <div ref={messageRef} className="hidden items-center text-sky-500">
                        <span>Submitting the details...</span>
                      </div>
                </div>
                  
            </form>
                                    
          </div>
      </div>
    </>
  )
}

export default NewUser