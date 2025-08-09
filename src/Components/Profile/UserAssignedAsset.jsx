import React, { useEffect, useState } from 'react'

function UserAssignedAsset() {
    const [assetDetails, setAssetDetails] = useState([])
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState('')
    async function userprofileAssets() 
    {        
           let authToken = localStorage.getItem("token")
          

            try {
                    const response = await fetch('https://assetmanagement.setside.app/api/assigned-to-loggedin-user',
                    {
                        method: 'GET', 
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'Content-Type': 'application/json' 
                        }
                    })
                     console.log(response);
                                            
                    // if(!response.ok){
                    //     setCount(0)
                    //     throw new Error("Could not fetch resource")                   
                    // } 

                    const value = await response.json()

                    if(value.assignedAssets)
                    {	                    
                        setCount(1)		
                        //console.log(value.assignedAssets);
                        			                                
                        setAssetDetails(value.assignedAssets)
                    }else{
                        setMessage(value.message);
                        
                        setCount(0)	
                        throw new Error(value.message) 
                    }
                    
                } 
                catch (error) {
                        console.log(error);                                             
                }
    }

    useEffect(()=>{
        userprofileAssets()
    },[])

  return (
        <>{
            (count > 0) ? (
                assetDetails.map((data)=>{
                            const isoDate = new Date(data?.assignedAt); 
                            const assignDate = isoDate.toLocaleDateString() 
                    
                        return(
                             <tr key={data?.asset._id} >
                                    <td className=" text-center text-gray-800 p-2">{data?.asset?.name}</td>
                                    <td className=" text-center text-gray-800 p-2">{data?.asset?.serialNumber}</td>
                                    <td className=" text-center text-gray-800 p-2">{data?.asset?.status}</td>
                                    <td className=" text-center text-gray-800 p-2">{assignDate}</td>
                            </tr>
                        )      
                })
             ) :(
                     <tr >
                        <td className=" text-center text-gray-800 p-2">{message}</td>
                    </tr>
             ) 
        }</>
    )
}

export default UserAssignedAsset