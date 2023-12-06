// components/BlogPage.js
import React, { useContext, useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { DarkModeContext } from '../contexts/DarkModeContext';
import CreatePostForm from './CreatePostForm';
import CategorySection from './CategorySection';
import '../styles/createpostbutton.css'

const BlogPage = () => {
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
        setCategories((prevCategories) => [...new Set([...prevCategories, category])]);
        setPosts((prevPosts) => {
            const updatedPosts = { ...prevPosts };
            updatedPosts[category] = [...(prevPosts[category] || []), newPost];
            return updatedPosts;
        });
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
                    variant={isDarkMode ? 'create-post-dark' : 'create-post-light'}
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
                        <CreatePostForm
                            newPost={newPost}
                            handleInputChange={handleInputChange}
                            handlePostSubmit={handlePostSubmit}
                        />
                    </Modal.Body>
                </Modal>
            </section>

            {categories.map((category) => (
                <CategorySection key={category} category={category} posts={posts} />
            ))}
        </Container>
    );
};

export default BlogPage;
