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
 
    const MobileView = ()=>{
      return(
        <>{
          assetData.map((asset)=>{
            const isoDate = new Date(asset.createdAt); 
						const assetDate = isoDate.toLocaleDateString() 
            return(
               <div key={asset.id} className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
                <div className="space-y-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-gray-900 text-lg mb-2">
                               {asset.name}
                            </h3>
                            <p className="text-gray-600 text-sm">Serial No: {asset.serialNumber}</p>
                        </div>

                        <div >
                            <span className="bg-teal-400 text-white text-xs font-medium px-2.5 py-0.5 mb-2 inline-block rounded">
                              {asset.status}
                            </span>
                              <p className="text-gray-600 text-sm ">{assetDate}</p>
                        </div>
                       
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                        <button 
                            onClick={() => updateAsset(asset)}
                            className="flex-1 bg-sky-500 hover:bg-blue-600 text-white rounded-md py-2 text-sm font-medium transition-colors duration-200">
                            Update
                        </button>
                        <button 
                            onClick={() => removeAsset(asset.id)}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md py-2 text-sm font-medium transition-colors duration-200">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            )
          })
        }
        </>
      )
    }

  return (
    <>
       <div className="shadow overflow-hidden sm:rounded-md w-full p-2 md:p-4">         
          <div className="px-2 py-4 md:px-4 md:py-5">

               <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 md:hidden">Assets</h2>
                        <button 
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
                            onClick={addNewAsset}
                        >
                            <span className="hidden sm:inline">Add Asset</span>
                            <span className="sm:hidden">Add</span>
                        </button>
                    </div>

              {/*Desktop view*/}
              <div className="hidden md:block overflow-x-auto max-h-[70vh] overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">                             
                      <thead className="bg-gray-50 sticky top-0 z-20 ">
                          <tr >
                              <th className="py-2 text-center align-middle justify-center text-base font-medium text-gray-900 uppercase tracking-wider">Name</th>                         
                              <th className="py-2 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Serial Number</th>
                              <th className="py-2 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Status</th>
                              <th className="py-2 text-center text-base font-medium text-gray-900 uppercase tracking-wider">created At</th>            
                              <th className="py-2 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="bg-white divide-gray-200 ">
                          <AssetDeatils></AssetDeatils>
                      </tbody>
                  </table>
              </div>

              {/*Mobile View */}
              <div className='md:hidden max-h-[70vh] overflow-y-auto'>
                 <MobileView></MobileView>
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