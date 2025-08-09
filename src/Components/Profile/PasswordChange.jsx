import React, { useRef, useState } from 'react'

function PasswordChange() {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const [errorMessage, setErrorMessage] = useState('')

    const errorRef = useRef(null)
    const successRef = useRef(null)
    const passBtnRef = useRef(null)
    const formRef = useRef(null)

    let authToken =localStorage.getItem("token")

    const passwordChnageFun = (event)=>{
        event.preventDefault()
    
        
        if(newPassword == confirmPassword){
            console.log("Password will be change");
            changePasswordAPI()
         }else
        {
            successRef.current.classList.add('hidden');
            errorRef.current.classList.remove('hidden');
            setErrorMessage('New Password did not matched with Confirm Password')
         }
        
    }
       
            
async function changePasswordAPI() 
{
    try {
        const response = await fetch('https://assetmanagement.setside.app/api/users/change-password', {
            method: "POST",
            body: JSON.stringify({
                currentPassword,
                newPassword,
                confirmPassword
            }),
            headers: {
                'Authorization': `Bearer ${authToken}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        
        if(!response.ok){
            throw new Error("Could not fetch resource")
           
        } 
        const value = await response.json()
        
        if(value.success)
        {  
           

            if (successRef.current) {
                 errorRef.current.classList.add('hidden');
                successRef.current.classList.remove('hidden');
            }    

            console.log(value.message); 
            
            formRef.current.reset();
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }   
        
    } 
    catch (error) {
        if (errorRef.current) {
            setErrorMessage('Enter the correct password')
            successRef.current.classList.add('hidden');
            errorRef.current.classList.remove('hidden');
        } 

       
        console.log(error);   
    }
 }

            
        


  return (
    <>     
    <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
            <button id="password-section-toggle" className="w-full flex items-center justify-between text-left focus:outline-none">
                <h2 className="text-lg font-medium text-gray-900">Change Password</h2>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
        </div>

        <div id="password-section-content" className="px-6 py-4">
            <form 
                onSubmit={passwordChnageFun} 
                ref={formRef}    id="change-password-form" className="space-y-4">
                <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input 
                        value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)}
                        type="password" id="current-password" name="currentPassword" required 
                        className="m-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your current password"/>
                </div>
                <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input 
                        value={newPassword} onChange={e=> setNewPassword(e.target.value)}
                        type="password" id="new-password" name="newPassword" required 
                        className="m-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your new password" minLength="8"/>
                </div>
                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input 
                        value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}
                        type="password" id="confirm-password" name="confirmPassword" required 
                        className="m-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Confirm your new password" minLength="8"/>
                </div>
                
                <div ref={errorRef} id="password-error" className="hidden">
                    <div className="bg-red-50 border border-red-200 rounded-md p-3">
                        <div className="flex">
                            <i data-feather="alert-circle" className="h-5 w-5 text-red-400"></i>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{errorMessage ? errorMessage : "Error message will appear here"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div ref={successRef} id="password-success" className="hidden">
                    <div className="bg-green-50 border border-green-200 rounded-md p-3">
                        <div className="flex">
                            <i data-feather="check-circle" className="h-5 w-5 text-green-400"></i>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">Password changed successfully!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" id="change-password-btn" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
                        <i data-feather="key" className="h-4 w-4 mr-2"></i>
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default PasswordChange