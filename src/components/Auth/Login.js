import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { login } from '../../services/api'; // Removed API call, keeping it frontend only
import './Login.scss';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        //  FRONTEND-ONLY LOGIN WITH HARDCODED CREDENTIALS
        if (username === 'demoUser' && password === 'demoPassword') {
            localStorage.setItem('token', 'fakeToken'); // Just a placeholder token
            onLoginSuccess(); // Tell App.js we logged in
            navigate('/'); // Go to the home page
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;