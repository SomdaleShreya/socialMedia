import React, { useState, useRef, useEffect } from 'react';
import './Comment.scss';
import { v4 as uuidv4 } from 'uuid';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

// --- Mock User Data (Replace with actual data/props later) ---
const currentUser = { id: 'user1', username: 'current_user', avatar: 'https://via.placeholder.com/32' };
// Example comment structure:
// comment = {
//   id: 'c1',
//   text: 'This is a top-level comment.',
//   author: { username: 'poster', avatar: 'path/to/avatar1.jpg' },
//   replies: [
//     { id: 'r1', text: 'This is a direct reply.', author: { username: 'replier1', avatar: 'path/to/avatar2.jpg'}, createdAt: '...' },
//     { id: 'r2', text: 'Another reply.', author: { username: 'replier2', avatar: 'path/to/avatar3.jpg'}, createdAt: '...' }
//   ],
//   createdAt: '...',
//   likeCount: 5,
//   isLiked: false
// }

function Comment({ comment, onReply, onLike }) {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [showReplies, setShowReplies] = useState(false);
    // Local state for replies still useful for immediate display update
    const [replies, setReplies] = useState(comment.replies || []);
    const [isLiked, setIsLiked] = useState(comment.isLiked || false);
    const [likeCount, setLikeCount] = useState(comment.likeCount || 0);

    const replyInputRef = useRef(null);

    useEffect(() => {
        if (showReplyInput && replyInputRef.current) {
            replyInputRef.current.focus();
        }
    }, [showReplyInput]);

    const handleReplyClick = () => {
        // Optional: Prepend @username if desired, but less common if replies aren't nested deeply
        // const replyPrefix = `@${comment.author?.username || 'user'} `;
        // setReplyText(replyPrefix);
        setReplyText(''); // Start fresh usually
        setShowReplyInput(true);
    };

    const handleReplyInputChange = (e) => {
        setReplyText(e.target.value);
    };

    const handleReplySubmit = (e) => {
        e.preventDefault();
        const trimmedText = replyText.trim();

        if (trimmedText) {
            const newReply = {
                id: uuidv4(), // Generate unique ID for the reply
                text: trimmedText,
                author: currentUser, // Assume current logged-in user is the author
                createdAt: new Date().toISOString(),
                // Replies themselves might not have likes/replies in this model
            };

            // Update local state for immediate feedback
            setReplies([...replies, newReply]);

            // IMPORTANT: Call the onReply passed from the parent,
            // providing the ID of the *comment being replied to* and the new reply data.
            if (onReply) {
                onReply(comment.id, newReply);
            }

            // Reset form
            setReplyText('');
            setShowReplyInput(false);
            // Optionally automatically show replies when a new one is added
            if (!showReplies && replies.length === 0) { // Only if replies were hidden and it's the first one
                setShowReplies(true);
            }
        } else {
             setShowReplyInput(false);
             setReplyText('');
        }
    };

    const toggleRepliesVisibility = () => {
        setShowReplies(!showReplies);
    };

    const handleLikeClick = () => {
        // Liking the main comment
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);
        setLikeCount(newLikedState ? likeCount + 1 : likeCount - 1);
        if (onLike) {
            onLike(comment.id, newLikedState); // Notify parent/API about the main comment like
        }
    };

    // --- Function to render the list of simple replies ---
    const renderRepliesList = () => (
        <div className="replies-list">
            {/* Optional: Add a visual connector line */}
            {/* <div className="reply-connector-line"></div> */}
            {replies.map((reply) => (
                <div key={reply.id} className="reply-item">
                    <img
                        src={reply.author?.avatar || 'https://via.placeholder.com/32'}
                        alt={reply.author?.username || 'user'}
                        className="comment-avatar reply-avatar" // Can reuse avatar style, maybe smaller
                    />
                    <div className="reply-body">
                        <span className="comment-author">{reply.author?.username || 'user'}</span>
                        <p className="comment-text">{reply.text}</p>
                        {/* Replies don't have their own 'Reply' button in this model */}
                         {/* We could add time/likes here if needed for replies */}
                         {/* <div className="reply-meta">
                             <span>{/* time ago *\/}</span>
                             <span>{/* reply likes *\/}</span>
                         </div> */}
                    </div>
                    {/* No like button on individual replies in this simple model */}
                </div>
            ))}
        </div>
    );

    const authorUsername = comment.author?.username || 'anonymous';
    const authorAvatar = comment.author?.avatar || 'https://via.placeholder.com/32';

    return (
        <div className="comment">
            {/* --- Main Comment Display --- */}
            <div className="comment-main">
                 <img src={authorAvatar} alt={`${authorUsername} avatar`} className="comment-avatar" />
                 <div className="comment-body">
                    <div className="comment-content">
                        <span className="comment-author">{authorUsername}</span>
                        <p className="comment-text">{comment.text}</p>
                    </div>
                    <div className="comment-meta">
                         {/* <span className="comment-time">5h</span> */}
                         {likeCount > 0 && <span className="comment-likes">{likeCount} like{likeCount > 1 ? 's' : ''}</span>}
                         <button className="action-link" onClick={handleReplyClick}>
                            Reply
                         </button>
                    </div>

                    {/* Toggle Replies Button (only if replies exist) */}
                    {replies.length > 0 && (
                         <button className="action-link view-replies" onClick={toggleRepliesVisibility}>
                            <span className="line"></span>
                            {showReplies ? 'Hide replies' : `View replies (${replies.length})`}
                        </button>
                    )}
                 </div>
                 <button className="like-button" onClick={handleLikeClick}>
                     {isLiked ? <FaHeart className="liked" /> : <FaRegHeart />}
                 </button>
            </div>

            {/* --- Reply Input Form (Appears below the comment it replies to) --- */}
            {showReplyInput && (
                <form className="reply-form" onSubmit={handleReplySubmit}>
                     <img src={currentUser.avatar || 'https://via.placeholder.com/32'} alt="Your avatar" className="comment-avatar reply-avatar" />
                     <input
                        ref={replyInputRef}
                        type="text"
                        placeholder={`Replying to ${authorUsername}...`}
                        value={replyText}
                        onChange={handleReplyInputChange}
                        className="reply-input"
                    />
                    <button type="submit" className="reply-submit-button" disabled={!replyText.trim()}>
                        <FiSend />
                    </button>
                </form>
            )}

            {/* --- Display Replies (if toggled and exist) --- */}
            {showReplies && replies.length > 0 && renderRepliesList()}

        </div>
    );
}

export default Comment;