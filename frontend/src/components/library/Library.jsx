import React, {useState} from 'react'
import LibraryComponent from '../../assets/react.svg'
import DataGrid from '@mui/material/Grid';
import './App.css'

function LibraryPage() {
    // const [count, setCount] = useState(0)
    return (
        <div className="App">
            <h1>Login Page</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    Enter library System
                </button>
                <button onClick={() => setCount((count) => count + 1)}>
                    Enter Employee System
                </button>

                <p>
                    Kamuto herowato
                </p>
            </div>
        </div>
    )
}

export default LibraryPage
