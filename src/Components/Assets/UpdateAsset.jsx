import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

function UpdateAsset() {
  const assetData = useContext(AppContext)
  const data = assetData.updateAssetdata

  const [status, setStatus] = useState('')
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate= useNavigate()

  const assetBackFun=()=>{
    navigate('/homepage/assets')
  }

  useEffect(()=>{
    console.log("Under updateAsset useEffect");
    
    if(status===''){
      setIsDisabled(true);
    }else{
      setIsDisabled(false);
    }
  },[status])

  const updateAssetSubmit=(event)=>{
    event.preventDefault();
    
    setIsDisabled(true);

    updateAssetAPIFun()

  }

  const updateAssetAPIFun = ()=>{
    let authToken =localStorage.getItem("token")
        
    fetch(`https://assetmanagement.setside.app/api/assets/${data.id}`, {
      method: 'PATCH',
      headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          status
      })
      })
      .then(response => {
        if (!response.ok) {
           throw new Error('HTTP error! status');
         }
          return response.json();
      })
      .then(value => 
      {
          alert(`${value.message} and Update status is ${status}`)
          console.log('Resource updated successfully:', value.message);
          navigate('/homepage/assets')
      })
      .catch(error => {
          setIsDisabled(false);

          alert(error)
          console.error('Error updating resource:', error);
      });
  }

  return (
    <>
          <div className="flex justify-center items-center mt-4">
                    <div  className="p-4 w-lg flex flex-col bg-white rounded-lg shadow-sm">

                        <div className="pt-2 text-center text-2xl font-bold text-black">
                            <h3 className="text-lg font-medium text-gray-900">Edit Asset Status</h3>
                            <hr className="border-gray-200 border-1 w-full mb-4 mt-1"/>
                        </div>

                        <div className="p-4">
                            <form onSubmit={updateAssetSubmit} >
                                    <div className="flex flex-col">
                                        <p className="mb-4 font-semibold text-gray-700">Asset Information</p>

                                        <div className="flex flex-row place-content-between mb-4">
                                            <div >
                                                <span className="font-semibold">Asset Name: </span>
                                                <span>{data.name}</span>
                                            </div>

                                            <div>
                                                <span className="font-semibold">Asset Serial Number: </span>
                                                <span >{data.serialNumber}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="updateAssetStatus" className="block mb-2 text-stone-600 font-medium">Asset status</label>

                                            <select  id='updateAssetStatus'
                                              value={status} onChange={(e)=> setStatus(e.target.value)}
                                              name="type" className="bg-white border-1 border-gray-400 border-solid rounded-md p-1 focus:border-sky-300 focus:outline focus:outline-sky-300 w-full">
                                                <option value="">Select a status</option>
                                                <option value="Available">Available</option>
                                                <option value="Assigned">Assigned</option>
                                                <option value="Maintenance">Maintenance</option>
                                                <option value="Retired">Retired</option>
                                            </select>
                                        </div>
                                    </div>      
                                    

                                    <div className="flex justify-end mt-7 mb-4">
                                        <button type="button" onClick={assetBackFun} className="text-gray-700  text-md bg-gray-200 rounded-md p-2 mr-4">Cancel</button>
                                        <input  className="text-white text-md bg-blue-500 rounded-md p-2" 
                                          disabled={isDisabled} type="submit" value="Submit"/>           
                                    </div>
                                </form>
                        </div>
                    
                    </div>
                </div>

    </>
  )
}

export default UpdateAsset