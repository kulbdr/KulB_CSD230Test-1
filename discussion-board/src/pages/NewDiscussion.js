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

    // Define colors for the UI elements
    const colors = {
        primary: '#ff6f61',  // A warm coral color for buttons and accents
        secondary: '#d25d4a', // A slightly darker coral for hover effects
        background: '#fef1e3', // Light beige background to keep it soft and warm
        textPrimary: '#3c3c3c', // Dark gray text for better readability
        textSecondary: '#555', // Medium gray for labels and secondary text
        border: '#e0e0e0', // Light gray for input borders
    };

    // Styles for the component
    const styles = {
        container: {
            maxWidth: '600px',
            margin: '50px auto',
            padding: '20px',
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: colors.background,
        },
        heading: {
            textAlign: 'center',
            color: colors.textPrimary,
            marginBottom: '20px',
            fontSize: '1.8rem',
            fontWeight: '600',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        label: {
            fontWeight: 'bold',
            color: colors.textSecondary,
        },
        input: {
            width: '100%',
            padding: '12px',
            border: `1px solid ${colors.border}`,
            borderRadius: '4px',
            fontSize: '16px',
            backgroundColor: '#fff',
            transition: 'border-color 0.3s ease',
        },
        textarea: {
            width: '100%',
            padding: '12px',
            border: `1px solid ${colors.border}`,
            borderRadius: '4px',
            fontSize: '16px',
            backgroundColor: '#fff',
            resize: 'vertical',
            minHeight: '100px',
            transition: 'border-color 0.3s ease',
        },
        button: {
            padding: '12px 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: colors.primary,
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            textTransform: 'uppercase',
            fontWeight: '600',
        },
        buttonHover: {
            backgroundColor: colors.secondary,
            transform: 'scale(1.05)', // Button scale effect on hover
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Post a New Discussion</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div>
                    <label htmlFor="title" style={styles.label}>Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div>
                    <label htmlFor="content" style={styles.label}>Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        style={styles.textarea}
                    />
                </div>
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Post Discussion
                </button>
            </form>
        </div>
    );
};

export default NewDiscussion;
