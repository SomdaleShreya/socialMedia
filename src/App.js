import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Header from './components/Header/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UserDashboard from './components/UserDashboard/UserDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import './App.scss';
import { ThemeProvider } from './context/ThemeContext'; // Optional: Theme Context
import Sidebar from './components/Sidebar/Sidebar';
import MainLayout from './components/MainLayout';
function App() {
    const [posts, setPosts] = useState(() => {
        // Initialize with some simulated data for testing
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

    const approvedPost= posts.filter(post => post.status === 'approved') //filter

    return (
        <ThemeProvider>
            <Router>
                
                <Routes>
                    <Route path="/" element={<MainLayout> <Home handlePostCreated={handlePostCreated} defaultAvatar={"default-avatar.png"} approvedPost={approvedPost}/></MainLayout>} />
                    <Route path="/profile" element={ <MainLayout> <Profile /> </MainLayout>} />
                    <Route path="/login" element={<MainLayout> <Login /></MainLayout>} />
                    <Route path="/signup" element={<MainLayout> <Signup /></MainLayout>} />
                    <Route path="/user-dashboard" element={<MainLayout> <UserDashboard posts={posts} /></MainLayout> } />
                    <Route path="/admin-dashboard" element={<MainLayout> <AdminDashboard posts={posts} onPostUpdate={handlePostUpdate} /></MainLayout>} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;