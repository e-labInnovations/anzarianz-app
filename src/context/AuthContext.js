import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isLoading, setILoading] = useState(true)
    const [userToken, setUserToken] = useState(null)

    const login = () => {
        setUserToken('jhhusvgxgs')
        setILoading(false)
    }

    const logout = () => {
        setUserToken(null)
        setILoading(false)
    }

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
            {children}
        </AuthContext.Provider>
    )
}