import React from 'react'
import TotalAsset from './TotalAsset'
import TotalUsers from './TotalUsers'
import AvailableAssets from './AvailableAssets'
import AssignedAssets from './AssignedAssets'

function Dashboard() {
  return (
    <>
          <div id="dashboard-view" className="view active w-full p-4 lg:p-8">
                        <div className="mb-8">
                            <h2 className="text-xl font-medium text-gray-900 mb-4">Dashboard</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                              <TotalAsset></TotalAsset>

                              <TotalUsers></TotalUsers>                    

                              <AvailableAssets></AvailableAssets>          

                            <AssignedAssets></AssignedAssets>
                            
                            </div>
                        </div>
                  </div>

    </>
  )
}

export default Dashboard