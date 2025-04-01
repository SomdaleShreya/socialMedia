import axios from 'axios';

const API_BASE_URL =  'http://localhost:3001'; // Replace with your actual API URL

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, //  Crucial for handling cookies/sessions
});

// Function to get all posts
export const getPosts = async () => {
    try {
        const response = await api.get('/posts');
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

// Function to create a new post
export const createPost = async (postData) => {
    try {
        const response = await api.post('/posts', postData);  // FormData or JSON depending on your backend
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

// Function to get user specific posts
export const getUserPosts = async () => {
    try {
        const response = await api.get('/user/posts'); // Needs authentication
        return response.data;
    } catch (error) {
        console.error("Error fetching user posts:", error);
        throw error;
    }
};

// Function to get pending posts (Admin)
export const getPendingPosts = async () => {
    try {
        const response = await api.get('/admin/posts/pending'); // Admin authentication required
        return response.data;
    } catch (error) {
        console.error("Error fetching pending posts:", error);
        throw error;
    }
};

// Function to approve a post (Admin)
export const approvePost = async (postId) => {
    try {
        await api.put(`/admin/posts/${postId}/approve`);
    } catch (error) {
        console.error("Error approving post:", error);
        throw error;
    }
};

// Function to reject a post (Admin)
export const rejectPost = async (postId) => {
    try {
        await api.put(`/admin/posts/${postId}/reject`);
    } catch (error) {
        console.error("Error rejecting post:", error);
        throw error;
    }
};

//Example Authentication (adjust endpoints)
export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signup = async (userData) => {
    try {
        const response = await api.post('/auth/signup', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;