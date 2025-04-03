import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Logins({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // **HARDCODED CREDENTIALS (NEVER DO THIS IN PRODUCTION)**
        if (username === 'demoUser' && password === 'demoPassword') {
            const simulatedToken = 'someFakeToken';
            localStorage.setItem('token', simulatedToken);
            onLoginSuccess();
            navigate('/');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
}

export default Logins;