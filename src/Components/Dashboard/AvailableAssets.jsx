import React, { useEffect, useState } from 'react'

function AvailableAssets() {
    const [assetCount, setAssetCount] = useState(null)

    function getAllAvailableCount(){
         
        let authToken =localStorage.getItem("token")    

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
                   
                //console.log(data.message);
                
                if (data.success) 
                { 
                   setAssetCount(data.availableAssets.length)                  
                }
                
            })
            .catch(error => {
                console.error('Error updating resource:', error);
        });

    }

    useEffect(()=>{
        console.log("on dashboard asset count");
        
        getAllAvailableCount()
    },[])

  return (
    <>
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <i data-feather="check-circle" className="h-6 w-6 text-green-600"></i>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-600 truncate">Available Assets</dt>
                            <dd className="text-lg font-medium text-gray-900" id="available-assets">
                                {assetCount === null ? 'Loading....': assetCount}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AvailableAssets