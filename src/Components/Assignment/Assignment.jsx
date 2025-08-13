import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Assignment() {
  const [assignmentdata, SetAssignmentData] = useState([])
  const [refreshAssignment, setRefreshAssignment] = useState(false);

  const messageRef = useRef(null)

  const navigate = useNavigate()
  const authToken = localStorage.getItem("token")

  const addNewAssignment = ()=>{
    navigate('/homepage/assignments/addNewAssignment')
  }


  useEffect(()=>{
      async function getAllCurrentlyAssigned() {

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
         
                      if (messageRef.current) {
                        messageRef.current.classList.add('hidden') 
                      }
                       
                      SetAssignmentData(value.currentlyAssignedAssets) 
                    }
                    
                } 
                catch (error) {
                        console.log(error);
                }
        }

        getAllCurrentlyAssigned()
  },[refreshAssignment])


  
//Asignment Deatails
  const AssignmentDetails = ()=>{
    //console.log(assignmentdata);

    return(
      <>{ //will return as single fragments

      assignmentdata.map((data)=>{
        let name = data?.assignedTo?.firstName + " " + data?.assignedTo?.lastName
        const isoDate = new Date(data.assignedAt); 
        const assignDate = isoDate.toLocaleDateString() 

        return(
          <tr key={data?.assetId._id} className='my-3 border border-gray-100'>
              <td  className=" text-center text-gray-800">{data?.assetId?.name}</td>
              <td  className=" text-center text-gray-800">{data?.assetId?.serialNumber}</td>
              <td  className=" text-center text-gray-800">{name}</td>
              <td  className=" text-center text-gray-800">{assignDate}</td>
              <td  className=" text-center text-gray-800">{data?.status}</td>
              <td  className=" text-center text-gray-800">
                  <div className="flex justify-center content-center">
                      <button onClick={()=> unassignAssignment(data?.assetId._id)}  className="bg-orange-400 text-white shadow-sm rounded-md p-1 m-3">Unassign</button>
                  </div>                                            
              </td>
          </tr>)
      })

    }</>
    )
  }

const MobileView = ()=>{
    return(
        <>{
            assignmentdata.map((data)=>{
                let name = data?.assignedTo?.firstName + " " + data?.assignedTo?.lastName
                const isoDate = new Date(data.assignedAt); 
                const assignDate = isoDate.toLocaleDateString() 

                return(
                <div key={data?.assetId._id} className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
                    <div className="space-y-2">
                        <div className="flex justify-between items-start">
                            <div >
                                <h3 className="font-semibold text-gray-900 text-lg pb-1">
                                {data?.assetId?.name}
                                </h3>
                                <p className="text-gray-600 text-sm pb-1">Serial No: {data?.assetId?.serialNumber}</p>
                                <h4 className=" text-gray-800 text-base">Owner name: {name}</h4>
                                
                            </div>
                    

                            <div >
                                <span className="bg-teal-400 text-white text-xs font-medium px-2.5 py-0.5 mb-2 inline-block rounded">
                                {data?.status}
                                </span>
                                <p className="text-gray-600 text-sm ">{assignDate}</p>
                            </div>
                        
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                            <button 
                                onClick={()=> unassignAssignment(data?.assetId._id)}
                                className="flex-1 bg-gray-300 border border-gray-200 hover:bg-gray-400 text-gray-900 shadow-sm rounded-md py-2 text-sm font-medium transition-colors duration-200">
                                Unassign
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
//Unassign
async function unassignAssignment(assetID) {
    //console.log(`Unassign Asset will be ${assetID}`);

    try {
            const responce = await fetch(`https://assetmanagement.setside.app/api/assets/${assetID}/unassign`, {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json' 
                }
                })

            if(!responce.ok){
                
                throw new Error("HTTP Error")
            } 
            
            const value = await responce.json()
            
            if(value.success)
            {  
                alert(value.message)               

                console.log(value.message);
                setRefreshAssignment(prev => !prev)
            }
            
        } 
        catch (error) {
            alert(error)
            console.log(error);
                
        }
  }
      

  return (
    <>
       <div className="shadow overflow-hidden sm:rounded-md w-full p-2 md:p-4">         
        <div className="px-2 py-4 md:px-4 md:py-5">
      
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 md:hidden">Assignments</h2>
                <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 shadow-sm rounded-md font-medium transition-colors duration-200"
                    onClick={addNewAssignment}
                >
                    <span className="hidden sm:inline">New Assignment</span>
                    <span className="sm:hidden">Add</span>
                </button>
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto max-h-[70vh] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-20">
                        <tr>
                            <th className="py-2 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Asset Name</th>
                            <th className="py-2 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Asset Serial No</th>
                            <th className="py-2 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Assigned To</th>
                            <th className="py-2 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Assigned Date</th>
                            <th className="py-2 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Status</th>
                            <th className="py-2 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody id="Assignment-table-body" className="bg-white divide-gray-200 ">
                        <AssignmentDetails></AssignmentDetails>
                    </tbody>
                </table>
            </div>

              {/* Mobile Card View */}
            <div className="md:hidden max-h-[70vh] overflow-y-auto">
                <MobileView></MobileView>
            </div>

            <div ref={messageRef} className="w-full bg-slate-200 p-3 rounded-md shadow-sm">
                <p className="text-center text-lg font-medium">Assigned data loading...</p>
            </div>
        </div>
       </div>
    </>
  )
}

export default Assignment