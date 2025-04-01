import React from 'react';
import './DashboardPost.scss';

function DashboardPost({ post }) {
    return (
        <div className="dashboard-post">
            <div className="dashboard-post-header">
                {post.username || "Unknown User"}
            </div>
            <div className="dashboard-post-content">
                <p>{post.content}</p>
                {post.image && <img src={post.image} alt={`Post of ${post.username}`} />}
            </div>
            <div className="dashboard-post-status">
                Status: {post.status}
            </div>
        </div>
    );
}

export default DashboardPost;