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
                      <button onClick={()=> unassignAssignment(data?.assetId._id)}  className="bg-orange-400 text-white  rounded-md p-1 m-3">Unassign</button>
                  </div>                                            
              </td>
          </tr>)
      })

    }</>
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
       <div className="shadow overflow-hidden sm:rounded-md w-full">         
        <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-end p-2">
                <button className="bg-blue-500 text-white rounded-md mb-4 p-2" onClick={addNewAssignment}
                >New Assignment</button>
            </div>
            <div className="overflow-x-auto p-2">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="pb-4 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Asset Name</th>
                            <th className="pb-4 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Asset Serial No</th>
                            <th className="pb-4 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Assigned To</th>
                            <th className="pb-4 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Assigned Date</th>
                            <th className="pb-4 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Status</th>
                            <th className="pb-4 text-center text-base font-medium text-gray-900 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody id="Assignment-table-body" className="bg-white divide-gray-200 ">
                        <AssignmentDetails></AssignmentDetails>
                    </tbody>
                </table>
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