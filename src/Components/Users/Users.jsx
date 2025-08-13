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

const UserDetails = () => {
    return (
      <>{      
            userdata.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 border-b border-gray-100">
                    <td className="px-4 py-3 text-center text-gray-800">{user.firstName}</td>
                    <td className="px-4 py-3 text-center text-gray-800">{user.lastName}</td>
                    <td className="px-4 py-3 text-center text-gray-800">{user.email}</td>
                    <td className="px-4 py-3 text-center text-gray-800">{user.role}</td>
                    <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                            <button 
                                onClick={() => editUserData(user)}
                                className="bg-blue-500 hover:bg-blue-600 shadow-sm text-white rounded-md px-3 py-1 text-sm transition-colors duration-200">
                                Edit
                            </button>
                            <button 
                                onClick={() => removeUserData(user.id)}
                                className="bg-gray-500 hover:bg-gray-600 shadow-sm text-white rounded-md px-3 py-1 text-sm transition-colors duration-200">
                                Remove
                            </button>
                        </div>
                    </td>
                </tr>
            ))
      }               
      </>
    )
}

const MobileView =()=>{
  return(
    <>{        
        userdata.map((user) => (
            <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
                <div className="space-y-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                                {user.firstName} {user.lastName}
                            </h3>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {user.role}
                        </span>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                        <button 
                            onClick={() => editUserData(user)}
                            className="flex-1 shadow-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 text-sm font-medium transition-colors duration-200">
                            Edit
                        </button>
                        <button 
                            onClick={() => removeUserData(user.id)}
                            className="flex-1 shadow-sm bg-gray-500 hover:bg-gray-600 text-white rounded-md py-2 text-sm font-medium transition-colors duration-200">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        ))
         
    }
    </>
  )
}

    return (
        <>
            <div className="shadow overflow-hidden sm:rounded-md w-full p-2 md:p-4">         
                <div className="px-2 py-4 md:px-4 md:py-5">
                    {/* Header with Add Button */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 md:hidden">Users</h2>
                        <button 
                            className="bg-blue-500 shadow-sm hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
                            onClick={addUserFun}
                        >
                            <span className="hidden sm:inline">Add User</span>
                            <span className="sm:hidden">Add</span>
                        </button>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto max-h-[70vh] overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0 z-20">
                                <tr>
                                    <th className="px-4 py-3 text-center text-base font-medium text-gray-900 uppercase tracking-wider bg-gray-50">First Name</th>
                                    <th className="px-4 py-3 text-center text-base font-medium text-gray-900 uppercase tracking-wider bg-gray-50">Last Name</th>
                                    <th className="px-4 py-3 text-center text-base font-medium text-gray-900 uppercase tracking-wider bg-gray-50">Email</th>
                                    <th className="px-4 py-3 text-center text-base font-medium text-gray-900 uppercase tracking-wider bg-gray-50">Role</th>
                                    <th className="px-4 py-3 text-center text-base font-medium text-gray-900 uppercase tracking-wider bg-gray-50">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <UserDetails />
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden max-h-[70vh] overflow-y-auto">
                       <MobileView></MobileView>
                    </div>

                    {/* Loading Message */}
                    <div ref={messageRef} className="w-full bg-slate-200 p-3 rounded-md shadow-sm mt-4">
                        <p className="text-center text-base md:text-lg font-medium">User's data loading...</p>
                    </div>
                </div>
            </div> 
        </>
    )
 
  }


export default Users