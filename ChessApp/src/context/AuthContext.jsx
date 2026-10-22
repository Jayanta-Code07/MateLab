

import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify"

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated]=useState(false);

    async function refreshUser() {
        setLoading(true);
        const response = await fetch("http://localhost:8080/signup/user-auth", {
            credentials: "include",
        })
        const result = await response.json();

        if (!response.ok) {
            toast.error(result.message)
            setUser(null);
            return;
        }
        setUser(result.user);
        setIsAuthenticated(result.isAuthenticated);
        toast.success(result.message);
        setLoading(false);
    }

    useEffect(() => {
        refreshUser();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                setIsAuthenticated,
                setUser,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
  return useContext(AuthContext);
}