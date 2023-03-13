import React from 'react'
import App from "./pages/App.jsx";
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LibItemTable from "./pages/LibItemTable.jsx";
import EmployeePage from "./pages/EmployeePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {AuthProvider} from "./components/AuthProvider.jsx";
import {ProtectedRoute} from "./components/ProtectedRoute.jsx";
import {ToastContextProvider} from "./components/ToastContextProvider";
import CategoryTable from "./pages/CategoryTable";

const Main = () => {
    return <>
        <ToastContextProvider>
            <AuthProvider>
                <Routes>
                    <Route index element={<LoginPage/>}/>
                    <Route path="/" element={<App/>}>
                        <Route path="/library" element={
                            <ProtectedRoute>
                                <LibItemTable/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/categories" element={
                            <ProtectedRoute>
                                <CategoryTable/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/employees" element={
                            <ProtectedRoute>
                                <EmployeePage/>
                            </ProtectedRoute>
                        }/>
                    </Route>
                </Routes>
            </AuthProvider>
        </ToastContextProvider>
    </>
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    </React.StrictMode>
)