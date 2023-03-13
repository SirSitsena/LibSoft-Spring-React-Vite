import {
    Navigate,
    useLocation
} from 'react-router-dom';
import {useAuth} from "./AuthProvider.jsx";

export const ProtectedRoute = ({children}) => {
    const {authData} = useAuth();
    const location = useLocation();

    if (!authData) {
        return <Navigate to="/" replace state={{from: location}}/>;
    }

    return children;
};