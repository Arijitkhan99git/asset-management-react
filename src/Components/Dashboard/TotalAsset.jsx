import React, { useEffect, useState } from 'react'


function TotalAsset() {
     const [count, setCount] = useState(null)

    async function getAllAssetCount() {

        let authToken = localStorage.getItem("token")

        try {
                    const response = await fetch(`https://assetmanagement.setside.app/api/assets`, {
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
                        setCount(value.assets.length)
                    }
                    
                } 
                catch (error) {
                        console.log(error);             
                }
                
        }

    useEffect(()=>{
            getAllAssetCount()
        },[])

  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <i data-feather="package" className="h-6 w-6 text-blue-600"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                    <dl>
                        <dt className="text-sm font-medium text-gray-600 truncate">Total Assets</dt>
                        <dd className="text-lg font-medium text-gray-900" id="total-assets">
                            {count === null ? "Loading..." : count} 
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default TotalAsset