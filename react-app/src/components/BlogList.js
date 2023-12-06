import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import BlogPost from './BlogPost';

const BlogList = ({ posts }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mt-5">
            <h2 className="h3">Recent Blog Posts</h2>
            <Button
                variant="primary"
                onClick={toggleCollapse}
                aria-controls="blogList"
                aria-expanded={isOpen}
            >
                {isOpen ? 'Collapse Posts' : 'Expand Posts'}
            </Button>

            <Collapse in={isOpen}>
                <div id="blogList">
                    {posts.map((post, index) => (
                        <BlogPost key={index} post={post} />
                    ))}
                </div>
            </Collapse>
        </div>
    );
};

export default BlogList;
