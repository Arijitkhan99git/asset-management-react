import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes , BrowserRouter} from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import Layout from './Layout.jsx'
import Dashboard from './Components/Dashboard/Dashboard.jsx'
import Users from './Components/Users/Users.jsx'
import Assets from './Components/Assets/Assets.jsx'
import Assignment from './Components/Assignment/Assignment.jsx'
import { AppContext, AppContextProvider } from './context/AppContext.jsx'
import AddAsset from './Components/Assets/AddAsset.jsx'
import UpdateAsset from './Components/Assets/UpdateAsset.jsx'
import NewUser from './Components/Users/NewUser.jsx'
import UpdateUser from './Components/Users/UpdateUser.jsx'
import Profile from './Components/Profile/Profile.jsx'
import AddNewAssignment from './Components/Assignment/AddNewAssignment.jsx'
import EmployeeLayout from './context/EmployeeLayout.jsx'

function App() {
 
  const state = useContext(AppContext)
  //console.log(state);
 
  const UserRoleCheck = ()=>{
     let role= state.userRole
    console.log("User role is: ", role);

     if(role =='admin'){
      return <Layout></Layout>
     }else{
      <EmployeeLayout></EmployeeLayout>
     }
  }

  useEffect(()=>{
    let authToken = localStorage.getItem("token")
  
    
    if(authToken){
      state.isLogIn = true
    }else{
      state.isLogIn = false
    }
  },[] )

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/homepage" element={<Layout></Layout>} >
          <Route path='dashboard' element={<Dashboard/>}/>

          <Route path='users' element={<Users></Users>}/>
          <Route path='users/addNewUser' element={<NewUser/>}/>
          <Route path='users/updateUser' element={<UpdateUser/>}/>

          <Route path='assets' element={<Assets/>}/>
          <Route path='assets/addAsset' element={<AddAsset/>}/>
          <Route path='assets/updateAsset' element={<UpdateAsset/>} />
      
          <Route path='assignments' element={<Assignment/>}/>
          <Route path='assignments/addNewAssignment' element={<AddNewAssignment/>}/>

          <Route path='profile' element={<Profile/>}/>
        </Route>

        <Route path='/employeeProfile' element={<EmployeeLayout></EmployeeLayout>}/>

        <Route path='/' element={state.isLogIn ? <UserRoleCheck></UserRoleCheck> : <Login /> }/>
        
      </Routes>
    </BrowserRouter>  
    </>
  )
}

export default App
