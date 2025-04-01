import React, { useState } from 'react';
import Comment from '../Comment/Comment';
import './Post.scss';
import defaultAvatar from '../../assets/default-avatar.png';
import { v4 as uuidv4 } from 'uuid';
import { FaHeart, FaRegHeart, FaShareAlt, FaBookmark, FaRegBookmark, FaComment } from 'react-icons/fa';

function Post({ post }) {
    const [likes, setLikes] = useState(post.likes || 0);
    const [comments, setComments] = useState(post.comments || []);
    const [newCommentText, setNewCommentText] = useState('');
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(!saved);
    };

    const handleLike = () => {
        setLikes(liked ? likes - 1 : likes + 1);
        setLiked(!liked);
    };

    const handleCommentClick = () => {
        setShowCommentInput(!showCommentInput);
    };

    const handleCommentInputChange = (e) => {
        setNewCommentText(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newCommentText.trim() !== '') {
            const newComment = {
                id: uuidv4(),
                text: newCommentText,
                replies: [], // Initially no replies
            };

            setComments([...comments, newComment]);
            setNewCommentText('');
            setShowCommentInput(false); // Hide the input after submitting
        }
    };

    const handleReplyToComment = (commentId, newReply) => {
        setComments(prevComments => {
            return prevComments.map(comment => {
                if (comment.id === commentId) {
                    // Update the comment itself if it's the target
                    return {
                        ...comment,
                        replies: [...comment.replies, newReply]
                    };
                } else if (comment.replies && comment.replies.length > 0) {
                    // Recursively search in replies if it's not the target
                    const updatedReplies = updateReplies(comment.replies, commentId, newReply);
                    if (updatedReplies) {
                        return {
                            ...comment,
                            replies: updatedReplies
                        };
                    }
                }
                return comment;
            });
        });
    };

    const updateReplies = (replies, commentId, newReply) => {
        for (let i = 0; i < replies.length; i++) {
            if (replies[i].id === commentId) {
                replies[i].replies = [...replies[i].replies, newReply];
                return replies;
            } else if (replies[i].replies && replies[i].replies.length > 0) {
                const updatedReplies = updateReplies(replies[i].replies, commentId, newReply);
                if (updatedReplies) {
                    replies[i].replies = updatedReplies;
                    return replies;
                }
            }
        }
        return null;
    };

    const handleShareClick = () => {
        window.alert("Share this");  // just for now
    };

    return (
        <div className="post">
            <div className="post-header">
                <img src={post.userAvatar || defaultAvatar} alt={`Avatar of ${post.username || "Unknown User"}`} className="user-avatar" />
                <span className="username">{post.username || "Unknown User"}</span>
            </div>
            <div className="post-content">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                {post.image && post.image.length > 0 && (
                    <div className="post-images">
                        {post.image.map((image, index) => (
                            <img key={index} src={image} alt={`Post Image ${index + 1}`} className="post-image" />
                        ))}
                    </div>
                )}
            </div >
            <div className="post-actions">
                <div className='post-actions-left'>
                    <button onClick={handleLike}>
                        {liked ? <FaHeart color="red" /> : <FaRegHeart />}
                    </button>
                    <button onClick={handleCommentClick}>
                        <FaComment />
                    </button>
                    <button onClick={handleShareClick}>
                        <FaShareAlt />
                    </button>
                </div>

                <button onClick={handleSave} className="post-save">
                    {saved ? <FaBookmark /> : <FaRegBookmark />}
                </button>
            </div>
            {showCommentInput && (
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={newCommentText}
                        onChange={handleCommentInputChange}
                    />
                    <button type="submit"><FaComment /></button>
                </form>
            )}
            <div className="comments">
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} onReply={handleReplyToComment} />
                ))}
            </div>
        </div>
    );
}

export default Post;