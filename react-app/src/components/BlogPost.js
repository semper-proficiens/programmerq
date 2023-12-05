import React from 'react';

const BlogPost = ({ post }) => {
    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {/* Add more details if needed */}
        </div>
    );
};

export default BlogPost;