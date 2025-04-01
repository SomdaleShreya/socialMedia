import React, { useMemo, useState } from 'react';
import './AdminDashboard.scss';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';  // Import icons
import Post from '../Post/Post';

function AdminDashboard({ posts, onPostUpdate }) {
    const [activeTab, setActiveTab] = useState('pending'); // Track active tab
    const [expandedImage, setExpandedImage] = useState(null); // Track which image is expanded
    const pendingPosts = useMemo(() => posts.filter(post => post.status === 'pending'), [posts]);
    const rejectedPosts = useMemo(() => posts.filter(post => post.status === 'rejected'), [posts]);

    const handleApprove = (postId) => {
        // Simulate API call
        setTimeout(() => {
            const updatedPost = posts.find(post => post.id === postId);
            if (updatedPost) {
                updatedPost.status = 'approved';
                onPostUpdate(updatedPost);
            }
            console.log(`Post ${postId} approved (Simulated)`);
        }, 250);
    };

    const handleReject = (postId) => {
        // Simulate API call
        setTimeout(() => {
            const updatedPost = posts.find(post => post.id === postId);
            if (updatedPost) {
                updatedPost.status = 'rejected';
                onPostUpdate(updatedPost);
            }
            console.log(`Post ${postId} rejected (Simulated)`);
        }, 250);
    };

    const handleShowImage = (image) => {
        setExpandedImage(image) // Store the image data
    };

    const closeExpandedImage = () => {
        setExpandedImage(null);  // Clear state, hiding the expanded image
    };

    return (
         
            <div className="admin-dashboard">
                <h2>Admin Dashboard</h2>

                <div className="admin-tabs">  {/* Tab navigation */}
                    <button onClick={() => setActiveTab('pending')} className={activeTab === 'pending' ? 'active' : ''}>Pending Posts</button>
                    <button onClick={() => setActiveTab('rejected')} className={activeTab === 'rejected' ? 'active' : ''}>Rejected Posts</button>
                </div>

                {activeTab === 'pending' && (  // Render Pending Posts
                    <>
                        {pendingPosts.length > 0 ? (
                            <ul>
                                {pendingPosts.map(post => (
                                    <li key={post.id}>
                                        <Post post={post} /> {/*Render entire code  */}
                                        <div className="admin-actions">
                                            {post.image && (  //Only show if there is Image
                                                <>
                                                    <button onClick={() => handleShowImage(post.image)}><FaEye /></button>
                                                    {expandedImage === post.image && ( //If it is selected to expanded then show.

                                                        <div className='enlarged-image-container'>
                                                            <img src={expandedImage} alt="Enlarged Post" className="enlarged-image" />
                                                            <button className='close-button' onClick={closeExpandedImage}>
                                                                Close
                                                            </button>
                                                        </div>

                                                    )}
                                                </>
                                            )}

                                            <button onClick={() => handleApprove(post.id)}><FaCheck /></button>
                                            <button onClick={() => handleReject(post.id)}><FaTimes /></button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No pending posts to review.</p>
                        )}
                    </>
                )}

                {activeTab === 'rejected' && (  // Render Rejected Posts
                    <>
                        {rejectedPosts.length > 0 ? (
                            <ul>
                                {rejectedPosts.map(post => (
                                    <li key={post.id}>
                                        <Post post={post} /> {/* Show all rejected post here  */}
                                        <div className="admin-actions">
                                            This Post has been rejected
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No rejected posts.</p>
                        )}
                    </>
                )}
            </div>
       
    );
}

export default AdminDashboard;