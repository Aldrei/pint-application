import React from 'react'

import logo from './logo.svg'
import './App.css'

import Stack from '@mui/material/Stack'

import Button from './components/Button'
import {Counter} from './features/counter/Counter'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h4>Material UI Test</h4>
                <Stack spacing={2} direction="row">
                    <Button variant="text">Text</Button>
                    <Button variant="contained">Contained</Button>
                    <Button variant="outlined">Outlined</Button>
                </Stack>
            </header>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/counter">Counter</Link>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/counter" element={<Counter />} />
                    </Routes>
                </div>
            </Router>
        </div>
    )
}

export default App
