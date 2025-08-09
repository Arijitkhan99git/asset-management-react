import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddNewAssignment() {

  const [availableAsset, setAvailableAsset] = useState([])
  const [usersName, setUsersName] = useState([])
  const [assetId, setAssetId] = useState('')
  const [userId, setUserID] = useState('')
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate()
  let authToken =localStorage.getItem("token")

  const assignmentBackFun = ()=>{
    navigate('/homepage/assignments')

  }

   function fetchAllAvailableAsset(){
        fetch('https://assetmanagement.setside.app/api/available-assets', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error! status');
                }
                return response.json();
            })
            .then(data => {
                   
                console.log(data.message);
                
                if (data.success) 
                {
                  setAvailableAsset(data.availableAssets)
                }
                
            })
            .catch(error => {
                console.error('Error updating resource:', error);
        });

    }

    //Fetch all users list
    async function fetchAllUsersName() {
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
                  setUsersName(value.users)
                }
                
            } 
            catch (error) {
                    console.log(error);
                   
            }
    }

useEffect(()=>{
  fetchAllAvailableAsset()
 
  fetchAllUsersName() 
  
},[])

const AvailableAssets =()=>{
  return(
    <>{
      availableAsset.map((asset)=>{
        const name = asset.name
        const serialNo = asset.serialNumber            
        const assetName = name+`(${serialNo})`

        return(
          <option key={asset.id} value={asset.id} className="p-1 shadow-sm m-1">{assetName}</option>
        )
      })


    }</>
  )
}

const UserNameList =()=>{
  return(
    <>{
      usersName.map((user)=>{

      return   <option key={user.id} value={user.id} className="p-1 shadow-sm m-1">
          {user.firstName} {user.lastName} ({user.email})</option>

      })
    }</>
  )
}

 async function assignAssetPost() {
  try {
      const responce = await fetch(`https://assetmanagement.setside.app/api/assets/${assetId}/assign`, {
          method: 'POST', 
          body: JSON.stringify({
              userId
          }),
          headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json' 
          }
          })

      if(!responce.ok){
        setIsDisabled(false)
        throw new Error("Could not fetch resource")
      } 
      
      const value = await responce.json()
      
      if(value.success)
      {
          alert(value.message)
          navigate('/homepage/assignments') 
      }
      
  } 
  catch (error) {
          console.log(error);
          alert(Error)
  }
}
 
useEffect(()=>{
    console.log('under use Effect');
    
        if((assetId && userId)===''){
            setIsDisabled(true)
        }else{
            setIsDisabled(false);
        }
    }, [assetId, userId])

const addAssignmentSubmit = (event)=>{
   event.preventDefault();
    setIsDisabled(true)

  assignAssetPost()
}

  return (
    <>
       <div id="addAssignment" className=" bg-white flex justify-center items-center mt-2 rounded-lg shadow-sm ">
        <div className="p-2 w-xl flex flex-col  rounded-lg shadow-sm">           
        
            <div className="flex justify-start w-full">
                <button onClick={assignmentBackFun} className="text-gray-700 hover:text-orange-500">&larr; Back</button>
            </div>

            <p className="text-2xl text-center font-semibold text-stone-800 text-shadow-md p-3">Asset Assignment</p>
            <hr className="border-gray-200 border-1 w-full mb-1"/>
            <br/>

            <form onSubmit={addAssignmentSubmit}>
                <div className="flex flex-col ">                                
                        <div>
                            <label htmlFor="selctAsset" className="block mb-2 text-stone-600 font-medium">Select Asset</label>
                            <select 
                              value={assetId} onChange={(e)=> setAssetId(e.target.value)}
                              id="selectAvailableAsset" name="selctAsset" className="bg-white border-1 border-gray-400 border-solid rounded-md p-1 focus:border-sky-300 focus:outline focus:outline-sky-300 w-full">
                                <option value="" className="p-1 shadow-sm m-1">Select an Asset</option>
                                <AvailableAssets></AvailableAssets>
                            </select>
                        </div>
                          
                        <div className="mt-4">
                            <label className="block mb-2 text-stone-600 font-medium" htmlFor="username">Assign to user</label>
                            <select 
                              value={userId} onChange={(e)=> setUserID(e.target.value)}
                              id="selectUsersList" name="selctUser" className="bg-white border-1 border-gray-400 border-solid rounded-md p-1 focus:border-sky-300 focus:outline focus:outline-sky-300 w-full">
                                <option value="" className="p-1 shadow-sm m-1">Select a User</option>
                                <UserNameList></UserNameList>
                            </select>
                        </div>
                </div>
                

                <div className="flex justify-end mt-7 mb-4">
                    <button type="button" onClick={assignmentBackFun} className="text-gray-700  text-md bg-gray-200 rounded-md p-2 mr-4" value="Reset">Cancel</button>
                    <input className=" text-white text-md bg-blue-500 rounded-md p-2 "
                    type="submit" disabled={isDisabled} value="Submit"/>           
                </div>
            </form>
        </div>
    </div>

    </>
  )
}

export default AddNewAssignment