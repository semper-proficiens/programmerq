import React from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';

const CreatePostForm = ({ newPost, handleInputChange, handlePostSubmit }) => {
    return (
        <Form onSubmit={handlePostSubmit}>
            <Form.Group controlId="postTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter post title"
                    name="title"
                    value={newPost.title}
                    onChange={handleInputChange}
                />
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
            </Form.Group>
            <Form.Group controlId="postCategory">
                <Form.Label>Category</Form.Label>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="categoryDropdown">
                        {newPost.category || 'Select Category'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {['Security', 'Application Performance', 'CICD'].map((category) => (
                            <Dropdown.Item
                                key={category}
                                onClick={() => handleInputChange({ target: { name: 'category', value: category } })}
                            >
                                {category}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Form.Group>
            <Button variant="primary" type="submit">
                Create Post
            </Button>
        </Form>
    );
};

export default CreatePostForm;
