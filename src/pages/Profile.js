import React, { useState, useEffect } from 'react';
import './Profile.scss';

function Profile() {
    const [profileData, setProfileData] = useState({
        username: 'Loading...',
        email: 'Loading...',
        bio: 'Loading...',
        posts: 0,
        followers: 0,
        following: 0,
        profileImage: '',
        coverPhoto: '',
        joinedDate: 'Loading...',
        website: 'Loading...',
        location: 'Loading...'
    });

    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('posts');
    const [tempBio, setTempBio] = useState('');

    useEffect(() => {
        setTimeout(() => {
            const data = {
                username: 'Rishi Singh Shekhawat',
                email: 'rishi.singh@example.com',
                bio: 'Web developer and social media enthusiast 🌍 | React enthusiast ⚛️',
                posts: '1K',
                followers: '2.5k',
                following: 100,
                profileImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwhCrg6O2ZSUv1VI0YmFVkP25djMid_rUeQ&s',
                coverPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToS1jx1tbgfcEHnZ6_jOUdMd44tNzs2wqtHSgrSgCP2Oienia61gEQMQePA3wY3MHxzw&usqp=CAU',
                joinedDate: 'December 2003',
                website: 'rishisinghportfolio.com',
                location: 'New York, USA'
            };
            setProfileData(data);
            setTempBio(data.bio);
            setLoading(false);
        }, 1000);
    }, []);

    const handleEditProfile = () => {
        setIsEditing(!isEditing);
        if(isEditing) {
            setProfileData(prev => ({...prev, bio: tempBio}));
        }
    };

    if (loading) {
        return <div className="loading-spinner"></div>;
    }

    return (
        <div className='profile'>
            <div className="profile-container">
                {/* Cover Photo */}
                <div className="cover-photo">
                    <img src={profileData.coverPhoto} alt="Cover" />
                    <div className="edit-cover">Edit Cover Photo</div>
                </div>

                {/* Profile Header */}
                <div className="profile-header">
                    <div className="profile-image">
                        <img src={profileData.profileImage} alt="Profile" />
                        <div className="edit-image">✎</div>
                    </div>
                    <div className="profile-info">
                        <div className="profile-name">
                            <h1>{profileData.username}</h1>
                            <span className="verification-badge">✓</span>
                            <button className="edit-profile" onClick={handleEditProfile}>
                                {isEditing ? 'Save Changes' : 'Edit Profile'}
                            </button>
                        </div>
                        <div className="profile-stats">
                            <div><strong>{profileData.posts}</strong> posts</div>
                            <div><strong>{profileData.followers}</strong> followers</div>
                            <div><strong>{profileData.following}</strong> following</div>
                        </div>
                    </div>
                </div>

                {/* Profile Tabs */}
                <div className="profile-tabs">
                    <button 
                        className={activeTab === 'posts' ? 'active' : ''}
                        onClick={() => setActiveTab('posts')}
                    >
                        Posts
                    </button>
                    <button 
                        className={activeTab === 'about' ? 'active' : ''}
                        onClick={() => setActiveTab('about')}
                    >
                        About
                    </button>
                    <button 
                        className={activeTab === 'photos' ? 'active' : ''}
                        onClick={() => setActiveTab('photos')}
                    >
                        Photos
                    </button>
                </div>

                {/* Profile Content */}
                <div className="profile-content">
                    {isEditing ? (
                        <div className="edit-bio">
                            <textarea
                                value={tempBio}
                                onChange={(e) => setTempBio(e.target.value)}
                                placeholder="Tell your story..."
                            />
                        </div>
                    ) : (
                        <div className="bio-section">
                            <p>{profileData.bio}</p>
                            <div className="details">
                                <div>📍 {profileData.location}</div>
                                <div>🌐 {profileData.website}</div>
                                <div>Joined {profileData.joinedDate}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;