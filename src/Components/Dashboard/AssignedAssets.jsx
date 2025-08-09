import React, { useEffect, useState } from "react";

function AssignedAssets() {
  const [assetCount, setAssetCount] = useState(null)

  async function getAssignedAssetsCounts() {
            
           let authToken =localStorage.getItem("token")
           
            try {
                    const responce = await fetch('https://assetmanagement.setside.app/api/all-currently-asigned', {
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
                        
                        setAssetCount(value.currentlyAssignedAssets.length)
                    }
                    
                } 
                catch (error) {
                        console.log(error);
                        
                }
    }

    useEffect(()=>{
      getAssignedAssetsCounts()
    },[])

  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i
                data-feather="user-check"
                className="h-6 w-6 text-yellow-600"
              ></i>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-600 truncate">
                  Assigned Assets
                </dt>
                <dd
                  className="text-lg font-medium text-gray-900"
                  id="assigned-assets"
                >
                  {assetCount=== null ? 'Loading...': assetCount}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignedAssets;
