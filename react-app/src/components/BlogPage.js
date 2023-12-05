import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { DarkModeContext } from '../contexts/DarkModeContext';
import BlogPost from './BlogPost';

function BlogPage() {
    const { isDarkMode } = useContext(DarkModeContext);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [posts, setPosts] = useState([]);

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
    };

    return (
        <Container id="blog" className="my-5">
            <section className="mt-5">
                <h2 className={isDarkMode ? "h3 text-white" : "h3 text-black"}>Create a New Blog Post</h2>
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
            </section>

            <section className="mt-5">
                <h2 className={isDarkMode ? "h3 text-white" : "h3 text-black"}>Recent Blog Posts</h2>
                {/* Display the list of recent blog posts */}
                {posts.map((post, index) => (
                    <BlogPost key={index} post={post} />
                ))}
            </section>
        </Container>
    );
}

export default BlogPage;