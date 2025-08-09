import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Route, Routes , BrowserRouter} from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import Layout from './Layout.jsx'
import Dashboard from './Components/Dashboard/Dashboard.jsx'
import Users from './Components/Users/Users.jsx'
import Assets from './Components/Assets/Assets.jsx'
import Assignment from './Components/Assignment/Assignment.jsx'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/homepage" element={<Layout></Layout>} >
//         <Route path='' element={<Dashboard/>}/>
//         <Route path='/homepage/users' element={<Users></Users>}/>
//         <Route path='/homepage/assets' element={<Assets/>}/>
//         <Route path='/homepage/assignments' element={<Assignment/>}/>
//       </Route>
//     </Routes>
//     </BrowserRouter>  
//   </StrictMode>
// )


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      <App></App>
    </AppContextProvider>
  </StrictMode>
)

