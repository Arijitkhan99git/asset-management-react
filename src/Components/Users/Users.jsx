import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

function Users() 
{
  const navigate = useNavigate()

  const contextData = useContext(AppContext)

  const [userdata, setUserData] = useState([])
  const [refereshData, setRefereshData] = useState(false)
  const messageRef = useRef(null)

  const addUserFun = ()=>{
    navigate('/homepage/users/addNewUser')
    
  }

  const editUserData =(user)=>{
    navigate('/homepage/users/updateUser')
    contextData.setUpdatedUserData(user)

    //console.log(user);
    
  }

  async function removeUserData(userId)
  {
    console.log(userId, "will be remove");     
            
    const authToken = localStorage.getItem("token")
    
    try {
            const responce = await fetch(`https://assetmanagement.setside.app/api/users/${userId}`, {
                method: 'DELETE', 
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json' 
                }
                })
    
            if(!responce.ok){
                throw new Error("Could not fetch resource")
            } 
            
            const value = await responce.json()
            
            if(value.success)
            {
                //let username = value.user.firstName + value.user.lastName

                alert("Deleted user's account successfully")
                setRefereshData(prev => !prev)
            }
            
        } 
        catch (error) {
                console.log(error);
                
        }
      
  }

  useEffect(()=>{
    
      async function getUserDetailsApi() {
            
           let authToken =localStorage.getItem("token")

            try {
                    const responce = await fetch('https://assetmanagement.setside.app/api/users', {
                        method: 'GET', 
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'Content-Type': 'application/json' 
                        }
                        })
                    
                    const value = await responce.json()
                    
                    if(value.success)
                    {
                        setUserData(value.users)

                        //console.log(value.users);

                         if (messageRef.current) {
                            messageRef.current.classList.add('hidden');
                          }
                    }
                    else{
                         throw new Error(value.message)
                    }
                    
                } 
                catch (error) {
                        console.log(error);
                        
                }
        }

        getUserDetailsApi()

  },[refereshData])

  const UserDeatils =()=>{
    return(
      <>
       {
          userdata.map((user)=>(
            <tr key={user.id} className="my-2 border border-gray-100">
              <td className=" text-center text-gray-800">{user.firstName}</td>
              <td className=" text-center text-gray-800">{user.lastName}</td>
              <td className=" text-center text-gray-800">{user.email}</td>
              <td className=" text-center text-gray-800">{user.role}</td>
              <td className=" text-center text-gray-800">
                  
                      <button 
                        onClick={()=> editUserData(user)}
                        className="bg-blue-400 text-white  rounded-md p-1 m-2">Edit</button>

                      <button 
                        onClick={()=> removeUserData(user.id)}
                        className="bg-gray-400 text-white rounded-md p-1 m-2">Remove</button>
      
              </td>
            </tr>
          ))
       }
      </>
    )
  }

  return (
    <>
     <div className="shadow overflow-hidden sm:rounded-md w-full p-4">         
                    <div className="px-4 py-5 ">
                        <div className="flex justify-end ">
                            <button className="bg-blue-500 text-white p-1 rounded-md mb-4 "
                              onClick={addUserFun}
                            >Add User</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="pb-4 text-center text-base font-medium text-gray-900 uppercase tracking-wider">First Name</th>
                                        <th className="pb-4 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Last Name</th>
                                        <th className="pb-4 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Email</th>
                                        <th className="pb-4 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Role</th>
                                        <th className="pb-4 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-gray-200 ">
                                 <UserDeatils></UserDeatils>
                                </tbody>
                            </table>
                        </div>

                        <div ref={messageRef} className="w-full bg-slate-200 p-3 rounded-md shadow-sm">
                            <p className="text-center text-lg font-medium">User's data loading...</p>
                        </div>
                    </div>
                </div> 
    </>
  )
}

export default Users