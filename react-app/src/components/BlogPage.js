import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { DarkModeContext } from '../contexts/DarkModeContext';
import BlogPost from './BlogPost';
import BlogList from './BlogList';

function BlogPage() {
    const { isDarkMode } = useContext(DarkModeContext);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [posts, setPosts] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        // Add validation and actual submission logic here
        // For simplicity, we'll just add the new post to the posts array
        setPosts((prevPosts) => [...prevPosts, newPost]);
        // Clear the form
        setNewPost({ title: '', content: '' });
        // Hide the form after submission
        setShowCreateForm(false);
    };

    return (
        <Container id="blog" className="my-5">
            <section className="mt-5">
                {/* Toggle visibility of the form */}
                <Button
                    variant="primary"
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="mb-3"
                >
                    Create Post
                </Button>

                {/* Display the form if showCreateForm is true */}
                {showCreateForm && (
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
                        <Button variant="primary" type="submit">
                            Submit Post
                        </Button>
                    </Form>
                )}
            </section>

            {/* Display the list of recent blog posts using BlogList */}
            <BlogList posts={posts} />
        </Container>
    );
}

export default BlogPage;
