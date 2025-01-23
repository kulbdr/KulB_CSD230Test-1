import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewDiscussion = () => {
    // State variables to handle title and content input
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    // Function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload on form submission

        // Retrieve existing discussions from localStorage, or initialize with an empty array
        const storedDiscussions = JSON.parse(localStorage.getItem('discussions')) || [];

        // New discussion object with unique ID
        const newDiscussion = {
            id: Date.now(), // Use timestamp as unique ID
            title,
            content,
        };

        // Add new discussion to the existing list
        const updatedDiscussions = [...storedDiscussions, newDiscussion];
        
        // Save the updated list of discussions back to localStorage
        localStorage.setItem('discussions', JSON.stringify(updatedDiscussions));

        // Navigate to the discussions page after submission
        navigate('/discussions');
    };

    return (
        <div className="container mt-5 mb-5 p-4 shadow-lg rounded" style={{ backgroundColor: '#fef1e3' }}>
            <h1 className="text-center text-primary mb-4" style={{ fontSize: '1.8rem', fontWeight: '600' }}>
                Post a New Discussion
            </h1>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div>
                    <label htmlFor="title" className="form-label fw-bold text-secondary">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div>
                    <label htmlFor="content" className="form-label fw-bold text-secondary">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="form-control"
                        rows="5"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary text-uppercase fw-bold"
                    style={{
                        transition: 'background-color 0.3s ease, transform 0.2s ease',
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#d25d4a')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#ff6f61')}
                >
                    Post Discussion
                </button>
            </form>
        </div>
    );
};

export default NewDiscussion;
