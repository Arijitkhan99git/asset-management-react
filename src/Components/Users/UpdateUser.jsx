import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

function UpdateUser() {

    const navigate= useNavigate()

    const contextdata = useContext(AppContext)
    const userData = contextdata.updatedUserData

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    async function UpdateUserData (event){
        event.preventDefault()
        
        console.log(userData.id);
        
        const authToken = localStorage.getItem("token")
        
         try {
                    const responce = await fetch(`https://assetmanagement.setside.app/api/users/${userData.id}`, {
                        method: 'PUT', 

                         body: JSON.stringify({
                                firstName,
                                lastName
                            }),
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'Content-Type': 'application/json' 
                        }
                        })
            
                    if(!responce.ok){
                        editusersubmitBtn.disabled = false;

                        throw new Error("Could not fetch resource")
                    } 
                    
                    const value = await responce.json()
                                    
                    if(value.success)
                    {
                        
                        alert(`${userData.firstName} ${userData.lastName} is chnaged to ${firstName}  ${lastName}. 
                            ${value.message}`)
                        
                        navigate('/homepage/users')

                        console.log(value.message);                 
                    }
                    
                } 
                catch (error) {
                        console.log(error);
                        alert(error)
                }

        
    }

    const backFun =()=>{
        navigate('/homepage/users')
    }

  return (
    <>  
    <div className="flex justify-center items-center mt-4">
            <div  className="p-4 w-xl flex flex-col bg-white rounded-lg shadow-sm">
                <div className="p-4 text-center text-2xl font-bold text-black">
                    <h3 className="text-lg font-medium text-gray-900">Edit User</h3>
                </div>

                <div className="p-6">
                    <form onSubmit={UpdateUserData} >
                        <div className="flex flex-col">

                            <div>
                                <label className="block mb-2 text-stone-600 font-medium" htmlFor="editExsisting-user-Fname">
                                    First Name</label>
                                <input 
                                    value={firstName} onChange={(e)=> setFirstName(e.target.value)}
                                    id="editExsisting-user-Fname" className="mb-3 w-full border-1 border-gray-400 border-solid rounded-md p-1 focus:border-sky-300 focus:outline focus:outline-sky-300" 
                                    type="text" name="firstName" placeholder={userData.firstName} required/>
                            </div>

                            <div>
                                <label className="block mb-2 text-stone-600 font-medium" htmlFor="editExsisting-user-Lname">
                                    Last Name</label>
                                <input  
                                    value={lastName} onChange={(e)=> setLastName(e.target.value)}
                                    id="editExsisting-user-Lname" className="mb-3 w-full border-1 border-gray-400 border-solid rounded-md p-1 focus:border-sky-300 focus:outline focus:outline-sky-300" 
                                type="text" name="lastname" placeholder={userData.lastName} required/>
                            </div>
                        
                            <div>
                                <label className="block mb-2 text-stone-600 font-medium" htmlFor="editExsisting-user-email">
                                    Email</label>
                                <input 
                                    value={userData.email}
                                    id="editExsisting-user-email" disabled className="mb-3 w-full border-1 border-gray-400 border-solid rounded-md p-1 focus:border-sky-300 focus:outline focus:outline-sky-300" 
                                type="email" name="email"/>
                            </div>
                        </div>
                            

                            <div className="flex justify-end mt-7 mb-4">
                                <button type="button" onClick={backFun} className="text-gray-700  text-md bg-gray-200 rounded-md p-2 mr-4">Cancel</button>
                                <input className=" text-white text-md bg-blue-500 rounded-md p-2" 
                                type="submit" value="Submit"/>           
                            </div>
                        </form>
                </div>
            
            </div>
        </div>

    </>
  )
}

export default UpdateUser