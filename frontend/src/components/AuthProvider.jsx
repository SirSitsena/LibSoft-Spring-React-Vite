import * as React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

const AuthContext = React.createContext(null);

export const useAuth = () => {
    return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = React.useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAuthData = (data) => {
        setAuthData(data);
        localStorage.setItem('auth-data', data);
        const origin = location.state?.from?.pathname || '/library';
        setTimeout(()=>{
            navigate(origin);
        },1000);
    }

    const handleLogin = async (username,password) => {
        let correct = false
        await axios.post('/api/auth',{username,password})
            .then(response => {
                return response.data
            })
            .then(data => {
                if(data.token){
                    handleAuthData(data)
                    correct = true;
                }
            })
            .catch((e) => console.log(e?.response))

        return correct;
    };

    const handleLogout = () => {
        setAuthData(null);
        localStorage.removeItem('auth-data');
    };

    const value = {
        authData: authData,
        setAuthData: handleAuthData,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};