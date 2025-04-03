import React from 'react';
import PostForm from '../components/PostForm/PostForm';

function PostFormPage({ handlePostCreated, defaultAvatar }) {
    return (
        <div>
            <h1>Create a New Post</h1>
            <PostForm onPostCreated={handlePostCreated} defaultAvatar={defaultAvatar} />
        </div>
    );
}

export default PostFormPage;