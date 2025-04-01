import React from 'react';
import { Link, useLocation } from 'react-router-dom';  // Import useLocation
import { FaHome, FaUser, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa'; // More comprehensive icons
import './Sidebar.scss';

function Sidebar() {
    const location = useLocation(); // Get the current route
    const isActive = (path) => location.pathname === path; // Check if the current route matches the link's path
    return (
        <aside className="sidebar">
            <header className="header">
                <div className="logo">Socialyte</div>
            </header>

            <div className="profile-section">
                <img src="https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmVtYWxlJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="Profile" className="profile-image" />
                <div className="profile-info">
                    <p className="username">john_doe</p>
                    <p className="fullname">John Doe</p>
                </div>
            </div>

            <nav>
                <ul>
                    <li><Link to="/" className={isActive('/') ? 'active' : ''}><FaHome /> Home</Link></li>
                    <li><Link to="/profile" className={isActive('/profile') ? 'active' : ''}><FaUser /> Profile</Link></li>
                    <li><Link to="/user-dashboard" className={isActive('/user-dashboard') ? 'active' : ''}><FaUsers /> User Dashboard</Link></li>
                    <li><Link to="/admin-dashboard" className={isActive('/admin-dashboard') ? 'active' : ''}><FaCog /> Admin Dashboard</Link></li>
                    <li><Link to="/login" className={isActive('/login') ? 'active' : ''}><FaSignOutAlt /> Login</Link></li>
                    <li><Link to="/signup" className={isActive('/signup') ? 'active' : ''}><FaSignOutAlt /> Signup</Link></li>
                </ul>
            </nav>

            <footer className="footer">
                <p>© 2024 Socialyte</p>
            </footer>
        </aside>
    );
}

export default Sidebar;