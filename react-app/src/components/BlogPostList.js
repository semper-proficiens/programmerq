import React from 'react';
import { useParams } from 'react-router-dom';

// This is a static example, replace with your own data fetching logic.
const blogPosts = {
    'Hardware': ['Post 1', 'Post 2', 'Post 3'],
    'Security': ['Post 4', 'Post 5', 'Post 6'],
    'App Performance': ['Post 7', 'Post 8', 'Post 9'],
    'CI/CD': ['Post 10', 'Post 11', 'Post 12'],
    'SEO': ['Post 13', 'Post 14', 'Post 15'],
};

function BlogPostList() {
    const { id } = useParams();
    const category = id.replace(/%20/g, " "); // Replace URL encoding with space
    const posts = blogPosts[category];

    // Log the category and posts
    console.log('Category:', category);
    console.log('Posts:', posts);

    return (
        <div className="blog-post-list">
            <h2>{category} Posts</h2>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>{post}</li>
                ))}
            </ul>
        </div>
    );
}

export default BlogPostList;