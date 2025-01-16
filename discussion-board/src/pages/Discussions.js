import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Discussions = () => {
    // State to manage discussions, likes, and dislikes
    const [discussions, setDiscussions] = useState([]);
    const [likes, setLikes] = useState({});
    const [dislikes, setDislikes] = useState({});

    // Load discussions, likes, and dislikes from localStorage when the component mounts
    useEffect(() => {
        const storedDiscussions = JSON.parse(localStorage.getItem('discussions')) || [];
        setDiscussions(storedDiscussions);

        const storedLikes = JSON.parse(localStorage.getItem('likes')) || {};
        const storedDislikes = JSON.parse(localStorage.getItem('dislikes')) || {};
        setLikes(storedLikes);
        setDislikes(storedDislikes);
    }, []);

    // Handle like action (reset dislike if already disliked)
    const handleLike = (id) => {
        // If the discussion was already disliked, reset the dislike
        if (dislikes[id]) {
            const updatedDislikes = { ...dislikes };
            delete updatedDislikes[id];
            setDislikes(updatedDislikes);
            localStorage.setItem('dislikes', JSON.stringify(updatedDislikes));
        }

        // Add a like (set to 1)
        const updatedLikes = { ...likes, [id]: 1 };
        setLikes(updatedLikes);
        localStorage.setItem('likes', JSON.stringify(updatedLikes));
    };

    // Handle dislike action (reset like if already liked)
    const handleDislike = (id) => {
        // If the discussion was already liked, reset the like
        if (likes[id]) {
            const updatedLikes = { ...likes };
            delete updatedLikes[id];
            setLikes(updatedLikes);
            localStorage.setItem('likes', JSON.stringify(updatedLikes));
        }

        // Add a dislike (set to 1)
        const updatedDislikes = { ...dislikes, [id]: 1 };
        setDislikes(updatedDislikes);
        localStorage.setItem('dislikes', JSON.stringify(updatedDislikes));
    };

    // Define styles with updated colors
    const colors = {
        primary: '#6a1b9a',   // Deep purple for the primary action elements
        secondary: '#ab47bc', // Lighter purple for hover effects
        background: '#f3e5f5', // Soft lavender background for a calm feel
        textPrimary: '#512da8', // Darker purple for headings
        textSecondary: '#757575', // Medium gray for text and labels
        buttonPrimary: '#8e24aa', // Purple gradient for like button
        buttonSecondary: '#d32f2f', // Red gradient for dislike button
    };

    // Styles for the component elements
    const styles = {
        container: {
            maxWidth: '900px',
            margin: '40px auto',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            backgroundColor: colors.background,
        },
        header: {
            textAlign: 'center',
            color: colors.textPrimary,
            fontSize: '2.2rem',
            fontWeight: '600',
            marginBottom: '30px',
        },
        link: {
            display: 'inline-block',
            marginBottom: '20px',
            padding: '12px 25px',
            textDecoration: 'none',
            color: '#fff',
            backgroundColor: colors.primary,
            borderRadius: '5px',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'background-color 0.3s ease',
        },
        linkHover: {
            backgroundColor: colors.secondary,
        },
        list: {
            listStyle: 'none',
            padding: '0',
        },
        listItem: {
            marginBottom: '25px',
            padding: '20px',
            border: `1px solid ${colors.textSecondary}`,
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
        },
        title: {
            fontSize: '1.8rem',
            fontWeight: '700',
            color: colors.textPrimary,
            marginBottom: '12px',
        },
        content: {
            fontSize: '1.1rem',
            color: '#607d8b',
            marginBottom: '20px',
            lineHeight: '1.5',
        },
        button: {
            marginRight: '12px',
            padding: '12px 25px',
            border: 'none',
            borderRadius: '25px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            fontWeight: '600',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'auto',
        },
        likeButton: {
            backgroundImage: 'linear-gradient(135deg, #8e24aa, #6a1b9a)', // Gradient from purple
            color: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        dislikeButton: {
            backgroundImage: 'linear-gradient(135deg, #d32f2f, #c62828)', // Gradient from red
            color: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        buttonHover: {
            transform: 'scale(1.05)',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Discussions</h1>
            <Link
                to="/new-discussion"
                style={styles.link}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.linkHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.link.backgroundColor)}
            >
                Post a New Discussion
            </Link>
            <ul style={styles.list}>
                {discussions.map((discussion) => (
                    <li key={discussion.id} style={styles.listItem}>
                        <h2 style={styles.title}>{discussion.title}</h2>
                        <p style={styles.content}>{discussion.content}</p>
                        <button
                            style={{ ...styles.button, ...styles.likeButton }}
                            onClick={() => handleLike(discussion.id)}
                            onMouseOver={(e) => (e.target.style.transform = styles.buttonHover.transform)}
                            onMouseOut={(e) => (e.target.style.transform = 'none')}
                        >
                            Like ({likes[discussion.id] || 0})
                        </button>
                        <button
                            style={{ ...styles.button, ...styles.dislikeButton }}
                            onClick={() => handleDislike(discussion.id)}
                            onMouseOver={(e) => (e.target.style.transform = styles.buttonHover.transform)}
                            onMouseOut={(e) => (e.target.style.transform = 'none')}
                        >
                            Dislike ({dislikes[discussion.id] || 0})
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Discussions;
