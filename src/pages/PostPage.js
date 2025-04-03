import React from 'react';
import Post from '../components/Post/Post';

function PostPage({ approvedPost }) {
    return (
        <div>
            <h1>Approved Posts</h1>
            {approvedPost && Array.isArray(approvedPost) && approvedPost.length > 0 ? (
                approvedPost.map((post) => (
                    <Post key={post.id} post={post} />
                ))
            ) : (
                <p>No approved posts yet.</p>
            )}
        </div>
    );
}

export default PostPage;