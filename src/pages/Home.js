import React from 'react';
import Post from '../components/Post/Post';
import PostForm from '../components/PostForm/PostForm';
import './Home.scss';
import Sidebar from '../components/Sidebar/Sidebar';

function Home({ handlePostCreated, approvedPost, defaultAvatar }) {
    return (
        <div className="home">
            <Sidebar />

            <main className="home__content">
                <PostForm onPostCreated={handlePostCreated} defaultAvatar={defaultAvatar} />
                {approvedPost && Array.isArray(approvedPost) && approvedPost.length > 0 ? (
                    approvedPost.map((post) => (
                        <Post key={post.id} post={post} />
                    ))
                ) : (
                    <p>No approved posts yet.</p>
                )}
            </main>
        </div>
    );
}

export default Home;