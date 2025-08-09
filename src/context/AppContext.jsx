import { createContext, useState } from "react";

export const AppContext = createContext(null)



export function AppContextProvider(props){
    const [isLogIn, setIsLogIn] = useState(false)
    const [updateAssetdata, setUpdateAssetdata] = useState(null)
    const [updatedUserData, setUpdatedUserData] = useState(null)
    const [userRole, setUserRole] = useState('')
    //const [token, setToken] = useState("")

    return(
        <AppContext.Provider value={{isLogIn, setIsLogIn, updateAssetdata, 
            setUpdateAssetdata, updatedUserData, setUpdatedUserData, userRole, setUserRole}}>
            {props.children}
        </AppContext.Provider>
    )
}