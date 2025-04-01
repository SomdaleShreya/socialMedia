import React, { useState, useMemo } from 'react';
import './PostForm.scss';
import { v4 as uuidv4 } from 'uuid';
import { generateAvatarURL } from '../../utils/avatarGenerator';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { FaImage } from 'react-icons/fa'; // Icon for image

function PostForm({ onPostCreated, defaultAvatar }) {
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Quill modules for formatting
    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }), []);

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (content.trim() === '') {
            setError("Post content cannot be empty.");
            setLoading(false);
            return;
        }

        const base64Images = [];  // Array to store Base64 encoded images
        const newPostId = uuidv4();

        // Convert images to Base64
        if (images && images.length > 0) {
            await Promise.all(
                images.map(async (image) => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            base64Images.push(event.target.result);
                            resolve();
                        };
                        reader.onerror = (error) => {
                            console.error("Error reading file as data URL:", error);
                            reject(error);
                        };
                        reader.readAsDataURL(image);
                    });
                })
            );
        }

        const newPost = {
            id: newPostId,
            content: content,
            image: base64Images,  // Store Base64 images array
            likes: 0,
            comments: [],
            username: "You",
            userAvatar: defaultAvatar || "default-avatar.png",
            status: 'pending',
        };

        setContent('');
        setImages([]);
        setPreviews([]);
        onPostCreated(newPost);
        setLoading(false);
        console.log("Simulated post submitted for approval:", newPost);
    };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Store Image File:
    setImages(files);
    setPreviews(files.map(file => URL.createObjectURL(file)));

  };

    return (
       //Form for every text content
        <form className="post-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
         
            <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} formats={formats} />
 
<label htmlFor="image-upload" className="custom-file-upload">
        <FaImage /> Choose Images
      </label>
  
            <input
        This is file and some action will go in
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: 'none' }}

            />
             <div className="preview-container">
                {previews.map((preview, index) => (
                    <img key={index} src={preview} alt={`Preview ${index + 1}`} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '0.5rem' }} />
                ))}
            </div>
        
            <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Post'}
            </button>
        </form>
    );
}

export default PostForm;