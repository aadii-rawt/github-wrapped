import React, { createContext, useContext, useState } from 'react'

// Step 1: Create the context
const GlobalContext = createContext()

// Step 2: Create the provider
export const GlobalProvider = ({ children }) => {
    const [username, setUsername] = useState(null)
    const [userStats, setUserStats] = useState([])

    return (
        <GlobalContext.Provider value={{ username, setUsername, userStats, setUserStats }}>
            {children}
        </GlobalContext.Provider>
    )
}

// Step 3: Custom hook to access the context
export const useGlobalContext = () => {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider')
    }
    return context
}
