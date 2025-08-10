import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

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

