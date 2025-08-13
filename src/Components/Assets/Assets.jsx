import React, { useContext, useEffect , useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

function Assets() {
  const [assetData, setAssetData] = useState([])
  const [date, setdate]= useState('')
  const [refreshAssets, setRefreshAssets] = useState(false);
  const navigate = useNavigate()

  const messageRef = useRef(null)

  //Context API
  const data = useContext(AppContext)

  const addNewAsset = ()=>{
    console.log("New Asset will be added");
    navigate('/homepage/assets/addAsset')
  }

  const updateAsset = (asset) => { 
    //Set the context
    data.setUpdateAssetdata(asset)

    navigate('/homepage/assets/updateAsset')
    console.log(typeof asset);
    
  };
  
  async function removeAsset(assetId)
  {
    
    console.log(assetId, "will be remove");

    const authToken = localStorage.getItem("token")
    
    try {
            const responce = await fetch(`https://assetmanagement.setside.app/api/assets/${assetId}`, {
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
                alert(value.message)
                console.log("Deleted Asset sussessfully");
                setRefreshAssets(prev => !prev);                
            }
            
        } 
        catch (error) {
                console.log(error);
                alert(error)
        }
    
  }

  useEffect(()=>{
    console.log("Asset details reloaded");

           let authToken =localStorage.getItem("token")
           let tab =""

          
                  fetch('https://assetmanagement.setside.app/api/assets', {
                        method: 'GET', 
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'Content-Type': 'application/json' 
                        }
                        })
						.then(response =>{
							if(!response.ok){
								throw new Error("Could not fetch resource")
							}
							return response.json();
						})
						.then(value =>{
							 if(value.success)
						    {
                  setAssetData(value.assets)          
                  
                  if (messageRef.current) {
                    messageRef.current.classList.add('hidden');
                  }
                }
						})
						.catch(error =>{
							console.log(error);
						}) 
     },[refreshAssets])

    const AssetDeatils=()=>(
        <>{
            assetData.map((asset)=>{
              const isoDate = new Date(asset.createdAt); 
							const assetDate = isoDate.toLocaleDateString() 
              return(    
                <tr key={asset.id} className="my-1 border border-gray-100">
                      <td className="text-center text-gray-800">{asset.name}</td>
                      <td className="text-center text-gray-800">{asset.serialNumber}</td>
                      <td className="text-center text-gray-800">{asset.status}</td>
                      <td className="text-center text-gray-800">{assetDate}</td>
                      <td className="text-center text-gray-800 px-4 py-2">
                        <button
                          className="bg-blue-400 text-white  rounded-md p-1 m-2"
                          onClick={() => updateAsset(asset)}
                        >
                          Update
                        </button>

                        <button
                          className="bg-gray-400 text-white rounded-md p-1 m-2"
                          onClick={() => removeAsset(asset.id)}
                        >
                          Remove
                        </button>
                      </td>
                </tr>
              )  
          })
      
      }</>   
    )
 

  return (
    <>
       <div className="shadow overflow-hidden sm:rounded-md p-0 sm:p-4 w-full">         
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex justify-end ">
                            <button className="bg-blue-500 text-white p-1 rounded-md mb-4 " onClick={addNewAsset}
                            >Add Asset</button>
                        </div>

                        <div className="overflow-x-auto max-h-screen overflow-y-auto">
                            <table className="min-w-full w-full divide-y divide-gray-200">                             
                                <thead className="bg-gray-50 sticky top-0 z-20 ">
                                    <tr >
                                        <th className="py-4 text-center align-middle justify-center text-base font-medium text-gray-900 uppercase tracking-wider">Name</th>                         
                                        <th className="py-4 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Serial Number</th>
                                        <th className="py-4 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Status</th>
                                        <th className="py-4 text-center text-base font-medium text-gray-900 uppercase tracking-wider">created At</th>            
                                        <th className="py-4 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-gray-200 ">
                                   <AssetDeatils></AssetDeatils>
                                </tbody>
                            </table>
                        </div>

                         <div ref={messageRef} id="assetLoadingView" className="w-full bg-slate-200 p-3 rounded-md shadow-sm">
                            <p className="text-center text-lg font-medium">Asset's data loading...</p>
                        </div>
                    </div>
                </div>

    </>
  )
}

export default Assets