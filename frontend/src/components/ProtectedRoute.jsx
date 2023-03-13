import {
    Navigate,
    useLocation
} from 'react-router-dom';
import {useAuth} from "./AuthProvider.jsx";
import {useEffect} from "react";
import axios from "axios";

export const ProtectedRoute = ({ children }) => {
    const { authData } = useAuth();
    const location = useLocation();

    // useEffect(() => {
    //     if(authData){
    //         let data = localStorage.getItem('auth-data');
    //         axios.post('/api/valid',{
    //             username: authData.username,
    //             token: authData.token
    //         })
    //             .then(response => response.data)
    //             .then(data => {
    //                 console.log("valid: "+data)
    //                 if(!data){
    //                     handleLogout()
    //                 }
    //             }).catch((e) => console.log(e?.response))
    //     }
    // })

    if (!authData) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return children;
};