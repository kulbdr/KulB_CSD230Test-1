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
        if (dislikes[id]) {
            const updatedDislikes = { ...dislikes };
            delete updatedDislikes[id];
            setDislikes(updatedDislikes);
            localStorage.setItem('dislikes', JSON.stringify(updatedDislikes));
        }

        const updatedLikes = { ...likes, [id]: 1 };
        setLikes(updatedLikes);
        localStorage.setItem('likes', JSON.stringify(updatedLikes));
    };

    // Handle dislike action (reset like if already liked)
    const handleDislike = (id) => {
        if (likes[id]) {
            const updatedLikes = { ...likes };
            delete updatedLikes[id];
            setLikes(updatedLikes);
            localStorage.setItem('likes', JSON.stringify(updatedLikes));
        }

        const updatedDislikes = { ...dislikes, [id]: 1 };
        setDislikes(updatedDislikes);
        localStorage.setItem('dislikes', JSON.stringify(updatedDislikes));
    };

    return (
        <div className="container mt-5 mb-5 p-4 shadow-lg rounded" style={{ backgroundColor: '#f3e5f5' }}>
            <h1 className="text-center text-primary mb-4" style={{ fontSize: '2.2rem', fontWeight: '600' }}>
                Discussions
            </h1>
            <Link
                to="/new-discussion"
                className="btn btn-primary mb-4"
                style={{ fontSize: '1rem', fontWeight: '600' }}
            >
                Post a New Discussion
            </Link>
            <ul className="list-unstyled">
                {discussions.map((discussion) => (
                    <li key={discussion.id} className="mb-4 p-3 border rounded shadow-sm" style={{ backgroundColor: '#fff' }}>
                        <h2 className="text-primary" style={{ fontSize: '1.8rem', fontWeight: '700' }}>
                            {discussion.title}
                        </h2>
                        <p className="text-secondary" style={{ fontSize: '1.1rem', color: '#607d8b' }}>
                            {discussion.content}
                        </p>
                        <button
                            className="btn btn-purple me-2"
                            onClick={() => handleLike(discussion.id)}
                        >
                            Like ({likes[discussion.id] || 0})
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDislike(discussion.id)}
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
