import React, { useEffect, useState } from 'react'
import UserAssignedAsset from './UserAssignedAsset'
import PasswordChnage from './PasswordChange'

function Profile() {
  const [userDeatails, setUserDetails] = useState({})
  const [assignDate, setAssignDate] = useState('')
 

  let authToken =localStorage.getItem("token")


  useEffect(()=>{
    getAllProfileInfoAPI()
  },[])

  async function getAllProfileInfoAPI() {                  
           
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
                        
                        setUserDetails(value.user)

                        const isoDate = new Date(value.user.createdAt); 
                        setAssignDate(isoDate.toLocaleDateString())  
                                             
                    }
                    
                } 
                catch (error) {
                        console.log(error);
                        
                }
        }

       




  return (
    <>
         <div  className=" w-full p-4">
          <div className="px-4 py-6 ">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900" id="page-title">My Profile</h1>
                <p className="mt-1 text-sm text-gray-700" id="page-description">View your profile information and assigned assets</p>
            </div>

            
            <div className="bg-white shadow rounded-lg mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                </div>
                <div className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor='profile-firstName' className="block text-sm font-medium text-gray-700">First Name</label>
                            <p id="profile-firstName" className="mt-1 text-sm text-gray-900">
                              {userDeatails.firstName ? userDeatails.firstName : 'Loading...'}</p>
                        </div>
                        <div>
                            <label htmlFor='profile-lastName' className="block text-sm font-medium text-gray-700">Last Name</label>
                            <p id="profile-lastName" className="mt-1 text-sm text-gray-900">
                             {userDeatails.lastName ? userDeatails.lastName : 'Loading...'}</p>
                        </div>
                        <div>
                            <label htmlFor='profile-email' className="block text-sm font-medium text-gray-700">Email</label>
                            <p id="profile-email" className="mt-1 text-sm text-gray-900">
                              {userDeatails.email ? userDeatails.email : 'Loading...'}</p>
                        </div>
                        <div>
                            <label htmlFor='profile-role' className="block text-sm font-medium text-gray-700">Role</label>
                            <p id="profile-role" className="mt-1 text-sm text-gray-900">
                             {userDeatails.role ? userDeatails.role : 'Loading...'}</p>
                        </div>
                        <div>
                            <label htmlFor='profile-department' className="block text-sm font-medium text-gray-700">Department</label>
                            <p id="profile-department" className="mt-1 text-sm text-gray-900">
                            {userDeatails.department ? userDeatails.department :'Loading...'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Joined Date</label>
                            <p id="profile-joinedDate" className="mt-1 text-sm text-gray-900">
                             {assignDate ? assignDate : ' Loading...'}</p>
                        </div>
                    </div>
                </div>
            </div>

          <PasswordChnage></PasswordChnage>

            <div className="bg-white shadow rounded-lg mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">My Assigned Assets</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 uppercase tracking-wider">Asset Name</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 uppercase tracking-wider">Serial Number</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 uppercase tracking-wider">Assigned Date</th>
                            </tr>
                        </thead>
                        <tbody id="assigned-assets-table-body" className="bg-white divide-y divide-gray-200">                           
                                <UserAssignedAsset></UserAssignedAsset>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

  </>
  )
}

export default Profile