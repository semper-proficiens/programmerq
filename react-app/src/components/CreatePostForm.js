// components/CreatePostForm.js
import React, { useContext, useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { DarkModeContext } from '../contexts/DarkModeContext';
import '../styles/createpostform.css';

const CreatePostForm = ({ newPost, handleInputChange, handlePostSubmit }) => {
    const { isDarkMode } = useContext(DarkModeContext);
    const [validation, setValidation] = useState({ title: true, content: true, category: true });

    const isFormValid = () => {
        const isValid = newPost.title.trim() !== '' && newPost.content.trim() !== '' && newPost.category !== '';
        setValidation({
            title: newPost.title.trim() !== '',
            content: newPost.content.trim() !== '',
            category: newPost.category !== '',
        });
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            handlePostSubmit(e);
        } else {
            console.error('Validation failed. Please fill in all fields and select a category.');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="postTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter post title"
                    name="title"
                    value={newPost.title}
                    onChange={handleInputChange}
                />
                {!validation.title && <div className="validation-message">Title can't be empty</div>}
            </Form.Group>
            <Form.Group controlId="postContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter post content"
                    name="content"
                    value={newPost.content}
                    onChange={handleInputChange}
                />
                {!validation.content && <div className="validation-message">Content can't be empty</div>}
            </Form.Group>
            <Form.Group controlId="postCategory">
                <Form.Label>Category</Form.Label>
                <Dropdown>
                    <Dropdown.Toggle
                        variant={isDarkMode ? 'create-post-dark' : 'create-post-light'}
                        id="categoryDropdown"
                    >
                        {newPost.category || 'Select Category'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={isDarkMode ? 'dark' : 'light'}>
                        {['Security', 'Application Performance', 'CICD'].map((category) => (
                            <Dropdown.Item
                                key={category}
                                onClick={() => handleInputChange({ target: { name: 'category', value: category } })}
                                className={isDarkMode ? 'dark' : 'light'} // Apply custom styles based on mode
                            >
                                {category}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                {!validation.category && <div className="validation-message">Category can't be empty</div>}
            </Form.Group>
            <Button variant={isDarkMode ? 'create-post-dark' : 'create-post-light'} type="submit">
                Create Post
            </Button>
        </Form>
    );
};

export default CreatePostForm;
