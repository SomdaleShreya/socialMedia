import React, { useMemo, useState } from 'react';
import './UserDashboard.scss';
import Post from '../Post/Post';

function UserDashboard({ posts }) {
    const [activeTab, setActiveTab] = useState('approved');  // Default to "approved" tab
    const approvedPosts = useMemo(() => posts.filter(post => post.status === 'approved'), [posts]);
    const pendingPosts = useMemo(() => posts.filter(post => post.status === 'pending'), [posts]);
    const rejectedPosts = useMemo(() => posts.filter(post => post.status === 'rejected'), [posts]);

    return (
        <div className="user-dashboard-container">
            <div className="user-dashboard">
                <h2>MY POSTS</h2>

                <div className="user-tabs">
                    <button
                        onClick={() => setActiveTab('approved')}
                        className={`user-tab-button ${activeTab === 'approved' ? 'active' : ''}`}
                    >
                        Approved
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`user-tab-button ${activeTab === 'pending' ? 'active' : ''}`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setActiveTab('rejected')}
                        className={`user-tab-button ${activeTab === 'rejected' ? 'active' : ''}`}
                    >
                        Rejected
                    </button>
                </div>

                {activeTab === 'approved' && (
                    <section className="post-section">
                        {approvedPosts.length > 0 ? (
                            approvedPosts.map(post => (
                                <Post key={post.id} post={post} />
                            ))
                        ) : (
                            <p>No approved posts yet.</p>
                        )}
                    </section>
                )}

                {activeTab === 'pending' && (
                    <section className="post-section">
                        
                        {pendingPosts.length > 0 ? (
                            pendingPosts.map(post => (
                                <Post key={post.id} post={post} />
                            ))
                        ) : (
                            <p>No pending posts.</p>
                        )}
                    </section>
                )}

                {activeTab === 'rejected' && (
                    <section className="post-section">
                       
                        {rejectedPosts.length > 0 ? (
                            rejectedPosts.map(post => (
                                <Post key={post.id} post={post} />
                            ))
                        ) : (
                            <p>No rejected posts.</p>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
}

export default UserDashboard;