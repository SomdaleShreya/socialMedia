import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UserDashboard from './components/UserDashboard/UserDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import './App.scss';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './components/MainLayout';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [posts, setPosts] = useState(() => {
        const initialPosts = [
            { id: 1, content: 'Approved post 1', status: 'approved' },
            { id: 2, content: 'Pending post 1', status: 'pending' },
            { id: 3, content: 'Rejected post 1', status: 'rejected' },
            { id: 4, content: 'Approved post 2', status: 'approved' },
            { id: 5, content: 'Pending post 2', status: 'pending' },
            { id: 6, content: 'Rejected post 2', status: 'rejected' },
            { id: 7, content: 'Pending post from user 1', status: 'pending', userId: 1 },
            { id: 8, content: 'Another pending post from user 2', status: 'pending', userId: 2 }
        ];
        return initialPosts;
    });

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const handlePostUpdate = (updatedPost) => {
        setPosts(posts.map(post =>
            post.id === updatedPost.id ? updatedPost : post
        ));
    };

    const approvedPost = posts.filter(post => post.status === 'approved');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />

                    {/* Protected Routes - Accessible Only After Login */}
                    <Route
                        path="/*" // Catch-all for all routes within the MainLayout
                        element={isLoggedIn ? (
                            <MainLayout
                                handlePostCreated={handlePostCreated}
                                defaultAvatar={"default-avatar.png"}
                                approvedPost={approvedPost}
                                posts={posts}
                                onPostUpdate={handlePostUpdate}
                            >
                                <Routes>
                                    <Route path="/" element={<Home handlePostCreated={handlePostCreated} defaultAvatar={ "default-avatar.png"} approvedPost={approvedPost} />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/user-dashboard" element={<UserDashboard posts={posts} />} />
                                    <Route path="/admin-dashboard" element={<AdminDashboard posts={posts} onPostUpdate={handlePostUpdate} />} />
                                </Routes>
                            </MainLayout>
                        ) : (
                            <Navigate to="/login" />
                        )}
                    />

                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;