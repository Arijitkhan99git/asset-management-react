import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddAsset() {

    const [name, setAssetName]= useState('')
    const [serialNumber, setSerialNo]= useState('')
    const [status, setAssetStatus]= useState('')

    const [isDisabled, setIsDisabled] = useState(false);

const navigate= useNavigate()

    const assetBackFun=()=>{
        navigate('/homepage/assets')
    }

useEffect(()=>{
    console.log('under use Effect');
    
        if((name && serialNumber)===''){
            setIsDisabled(true)
        }else{
            setIsDisabled(false);
        }
    }, [name, status])

const addAssetSubmit = (event)=>{
    event.preventDefault();
    setIsDisabled(true);
    addAssetAPIFun()      
}

const addAssetAPIFun =()=>{
        const authToken =localStorage.getItem("token")
        
            fetch('https://assetmanagement.setside.app/api/assets', {
                        method: "POST",
                        body: JSON.stringify({
                            name,
                            serialNumber,
                            status
                        }),
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    .then((response)=>{
                        if(!response.ok)
                        {
                            setIsDisabled(false)
                            throw new Error("Could not fetch resource")
                        } 
                        
                        return response.json();
                    })
                    .then((value)=>{
                         if(value.success)
                        {
                           
                            alert(value.message);
                            console.log(value.message);
                            console.log("New Asset added");
                            navigate('/homepage/assets')
                           
                        }   
                    })
                    .catch(error =>
                        {
							console.log(error);
					})                  
            
           
}

  return (
    <>
        <div className='flex w-full justify-center items-center'>
         <div className="w-xl flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-start w-full">
                         <button onClick={assetBackFun} className="text-gray-700 hover:text-orange-500">&larr; Back</button>
                    </div>

                    <p className="text-2xl font-semibold text-stone-800 text-shadow-md p-3"> Add Assets</p>
                    <hr className="border-gray-200 border-1 w-full mb-4"></hr>
                    <br></br>

                    <form onSubmit={addAssetSubmit}>
                        <div className="flex flex-col">
                                <div>
                                    <label htmlFor="addAssetName" className="block mb-2 text-stone-600 font-medium">Asset Name</label>

                                    <select 
                                        value={name} onChange={(e)=> setAssetName(e.target.value)}
                                        name="type" id='addAssetName'
                                        className="bg-white border-1 border-gray-400 border-solid rounded-md p-1 focus:border-sky-300 focus:outline focus:outline-sky-300 w-full">
                                        <option value="">Select an asset</option>
                                        <option value="Laptop">Laptop</option>
                                        <option value="Desktop">Desktop</option>
                                        <option value="Phone">Phone</option>
                                        <option value="Tablet">Tablet</option>
                                        <option value="Monitor">Monitor</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                <label
                                    className="block mb-2 text-stone-600 font-medium"
                                    htmlFor="addAssetSerialNo"
                                >
                                    Serial Number
                                </label>
                                <input
                                    value={serialNumber}
                                    onChange={(e)=>setSerialNo(e.target.value)}
                                    placeholder="Enter a serial number"
                                    className="border-1 border-gray-400 border-solid rounded-md p-1 focus:border-sky-300 focus:outline focus:outline-sky-300 w-full"
                                    type="text"
                                    name="serialNum" id='addAssetSerialNo'
                                    required
                                />
                                </div>

                                <div>
                                    <label htmlFor="addAssetStatus" className="block mb-2 text-stone-600 font-medium">Asset status</label>

                                    <select  
                                        value={status} onChange={(e)=> setAssetStatus(e.target.value)}
                                        name="type" id='addAssetStatus'
                                        className="bg-white border-1 border-gray-400 border-solid rounded-md p-1 focus:border-sky-300 focus:outline focus:outline-sky-300 w-full">
                                        <option value="">Select a status</option>
                                        <option value="Available">Available</option>
                                        <option value="Assigned">Assigned</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Retired">Retired</option>
                                    </select>
                                </div>
                        </div>
                        
                        <div className="flex justify-end mt-7 mb-4">
                            <button type="button" onClick={assetBackFun} className="text-gray-700 text-md bg-gray-200 rounded-md p-2 mr-4">Cancel</button>
                            <button type="submit" disabled={isDisabled} className="text-white text-md bg-blue-500 rounded-md p-2">Submit</button>
                        </div>
            
                    </form>

                    
            </div>
         </div>
    </>
  )
}

export default AddAsset