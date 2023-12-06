import React, { useContext, useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { DarkModeContext } from '../contexts/DarkModeContext';
import BlogPost from './BlogPost';
import CreatePostForm from './CreatePostForm';

// New Category component
const CategorySection = ({ category, posts, isDarkMode }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div key={category} className="mt-5">
            <button
                className="btn btn-primary mb-3"
                onClick={handleToggleExpand}
                aria-controls={`category-${category}`}
                aria-expanded={isExpanded}
            >
                {category}
            </button>

            <div
                id={`category-${category}`}
                className={`category-content${isExpanded ? ' expanded' : ''}`}
            >
                {(posts[category] || []).map((post, index) => (
                    <BlogPost key={index} post={post} />
                ))}
            </div>
        </div>
    );
};

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
        setPosts((prevPosts) => ({
            ...prevPosts,
            [category]: [...(prevPosts[category] || []), newPost],
        }));
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
                <Button variant="primary" onClick={() => setShowCreateForm(true)} className="mb-3">
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
                <CategorySection
                    key={category}
                    category={category}
                    posts={posts}
                    isDarkMode={isDarkMode}
                />
            ))}
        </Container>
    );
};

export default BlogPage;
