import React, { useEffect, useState } from 'react'
import { Users } from 'react-feather'

function TotalUsers() {
    const [userCount, SetuserCount] = useState(null)

     async function getAllUsersCount() {
            
           let authToken =localStorage.getItem("token")

            try {
                    const responce = await fetch('https://assetmanagement.setside.app/api/users', {
                        method: 'GET', 
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
                        SetuserCount(value.users.length)
                    }
                    
                } 
                catch (error) {
                        console.log(error);
                        
                }
	}

    useEffect(()=>{
        getAllUsersCount()
    },[])

  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-green-600"></Users>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-600 truncate">Total Users</dt>
                            <dd className="text-lg font-medium text-gray-900" id="total-users">
                                {userCount ===null? 'Loading...': userCount}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default TotalUsers