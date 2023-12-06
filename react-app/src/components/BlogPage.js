import React, { useContext, useState } from 'react';
import { Container, Form, Button, Dropdown, Modal } from 'react-bootstrap';
import { DarkModeContext } from '../contexts/DarkModeContext';
import BlogPost from './BlogPost';

function BlogPage() {
    const { isDarkMode } = useContext(DarkModeContext);
    const [newPost, setNewPost] = useState({ title: '', content: '', category: '' });
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState({});
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        const category = newPost.category;
        if (!categories.includes(category)) {
            setCategories([...categories, category]);
            setPosts((prevPosts) => ({ ...prevPosts, [category]: [newPost] }));
        } else {
            setPosts((prevPosts) => ({
                ...prevPosts,
                [category]: [...prevPosts[category], newPost],
            }));
        }
        setNewPost({ title: '', content: '', category: '' });
        setShowCreateForm(false);
    };

    const handleCancelCreate = () => {
        setNewPost({ title: '', content: '', category: '' });
        setShowCreateForm(false);
    };

    return (
        <Container id="blog" className="my-5">
            <section className="mt-5">
                <Button
                    variant="primary"
                    onClick={() => setShowCreateForm(true)}
                    className="mb-3"
                >
                    Create Post
                </Button>

                <Modal show={showCreateForm} onHide={handleCancelCreate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                                        <Dropdown.Item
                                            onClick={() =>
                                                handleInputChange({
                                                    target: { name: 'category', value: 'Security' },
                                                })
                                            }
                                        >
                                            Security
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                handleInputChange({
                                                    target: {
                                                        name: 'category',
                                                        value: 'Application Performance',
                                                    },
                                                })
                                            }
                                        >
                                            Application Performance
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                handleInputChange({
                                                    target: { name: 'category', value: 'CICD' },
                                                })
                                            }
                                        >
                                            CICD
                                        </Dropdown.Item>
                                        {/* Add more categories as needed */}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Create Post
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </section>

            {categories.map((category) => (
                <div key={category} className="mt-5">
                    <h2 className={isDarkMode ? 'h3 text-white' : 'h3 text-black'}>
                        {category}
                    </h2>
                    {posts[category].map((post, index) => (
                        <BlogPost key={index} post={post} />
                    ))}
                </div>
            ))}
        </Container>
    );
}

export default BlogPage;
