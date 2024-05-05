import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPosts from './BlogPosts';

function BlogPost() {
    const { slug } = useParams();
    let PostComponent = null;

    // Search for the right post component based on the slug
    for (const category in BlogPosts) {
        const post = BlogPosts[category].find(p => p.slug === slug);
        if (post) {
            PostComponent = post.component;
            break; // Found the post, no need to continue searching
        }
    }

    return (
        <div>
            {PostComponent ? <PostComponent /> : <p>Post not found.</p>}
        </div>
    );
}

export default BlogPost;
